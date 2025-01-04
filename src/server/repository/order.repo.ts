import {
    HistoryUser,
    OrderMonthTotal,
    TOrderTopTotal,
    TOrderTransactionCreate,
    TOrderTransactionUpdate
} from "@/interface/entity/transaction.model";
import { prisma } from "@/config/prisma";
import { Orders } from "@prisma/client";
import { InterfaceRepository, TPagination } from "@/interface/server/InterfaceRepository";
import { MonthlyTotal, OrderParams, ResponseCreateOrderTransaction } from "@/interface/entity/order.model";
import { TStatusOrder } from "@/interface/Utils";

export default class OrderRepository implements InterfaceRepository<TOrderTransactionCreate> {

    async getMonthlyTotal(year: number) {
        const monthlyTotals = await prisma.orders.groupBy({
            by: [ 'orderTime' ],
            _sum: {
                totalAll: true,
            },
            where: {
                status: 'Complete',
                orderTime: {
                    gte: new Date(`${ year }-01-01`),
                    lt: new Date(`${ year + 1 }-01-01`),
                },
            },
        });

// Sanitize the data to group by month
        const dataMonth: MonthlyTotal[] = monthlyTotals.reduce<MonthlyTotal[]>((acc, { _sum, orderTime }) => {
            // Extract the month name from the orderTime
            const monthName = new Date(orderTime).toLocaleString('default', { month: 'long' });

            // Find the existing entry for this month or create a new one
            const existingMonth = acc.find(item => item.month === monthName);
            if (existingMonth) {
                // @ts-ignore
                existingMonth.total += _sum.totalAll;
            } else {
                // @ts-ignore
                acc.push({ month: monthName, total: _sum.totalAll });
            }

            return acc;
        }, []);

        // console.log(dataMonth);
        return { year, dataMonth };
    }

    async findAll({ filter, pagination: { limit = 20, page = 1 } }: Required<OrderParams>)
        : Promise<{ data: Orders[] } & TPagination> {
        const skip = ( page - 1 ) * limit;
        const take = limit;
        const order = await prisma.orders.findMany({
            where: {
                AND: [
                    {
                        ...( filter.name ? { Customers: { name: { contains: filter.name, } } } : {} ),
                        ...( filter.status ? { status: { contains: filter.status, } } : {} ),
                    }
                ]
            },
            include: {
                Trolleys: {
                    include: {
                        Product: true
                    }
                },
                Customers: true,
                Deliverys: true,
                Payments: true
            },
            skip,
            take,
            orderBy: {
                updated_at: "desc"
            },
        })
        return { data: order, page, limit, }
    }

    async findById(id: string) {
        return prisma.orders.findUnique({
            where: { id },
            include: {
                Trolleys: {
                    include: {
                        Product: true
                    }
                },
                Customers: true,
                Deliverys: true,
                Payments: true
            },
        })
    }

    async findHistoryUser(status: string, id_user: string, limit: number): Promise<HistoryUser[]> {
        return prisma.orders.findMany(
            {
                take: limit,
                where: {
                    id_customer: id_user,
                    status: {
                        contains: status
                    }
                },
                include: {
                    Customers: true,
                    Trolleys: true
                },
            }
        );
    }

    async findByMonth(status: TStatusOrder): Promise<OrderMonthTotal> {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the current month
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59); // End of the current month
        // console.log(now.getMonth());
        // 	January = 0
        // 	February = 1
        // 	November = 10
        // 	December = 11
        return prisma.orders.aggregate({
            _count: true,
            _sum: { totalAll: true },
            where: {
                orderTime: {
                    gte: monthStart,
                    lte: monthEnd,
                },
                status: status
            },
        }).then((data) => ( {
            count: data._count,
            totalAll: data._sum.totalAll ?? 0,
        } ))
    }

    async findTopOrderTotal(): Promise<TOrderTopTotal[]> {
        return prisma.orders.findMany({
            take: 5,
            include: {
                Customers: true,
                Trolleys: true
            },
            orderBy: { totalAll: 'desc' },
        })
    }

    async findOrderStatus({ status, userId }: { userId: string, status: string }): Promise<number> {
        return prisma.orders.count({
            where: {
                id_customer: userId,
                status: status
            }
        })
    }

    // ---------CREATE
    async createOne(data: TOrderTransactionCreate): Promise<ResponseCreateOrderTransaction> {
        // console.log(data)
        return prisma.$transaction(async (tx) => {

            let orderCustomerRes
            // find
            const customerDB = await tx.customers.findUnique(
                {
                    where: {
                        id: data.order.id_customer
                    }
                })

            // orderCustomers
            if (!customerDB) {
                const orderCustomers = await tx.customers.create(
                    { data: data.orderReceiver }
                )
                data.order.id_customer = orderCustomers.id
                orderCustomerRes = orderCustomers
            } else {
                orderCustomerRes = customerDB
            }

            const order = await tx.orders.create(
                {
                    data: {
                        ...data.order
                    },
                })

            const trolleyId = await tx.trolleys.findMany({
                select: { id: true },
                where: {
                    id: {
                        in: data.orderTrolley.map(d => d.id)
                    }
                }
            })
            console.log(trolleyId)
            if (trolleyId.length > 0) {
                console.log('is execute delete')
                await tx.trolleys.deleteMany({
                    where: {
                        id: {
                            in: trolleyId.map(d => d.id)
                        }
                    }
                })
            }

            const productsOrder = data.orderTrolley.map((product) => ( {
                id_order: order.id,
                id_product: product.id_product,
                qty_at_buy: product.qty_at_buy,
                price_at_buy: product.price_at_buy,
                id_user: product.id_user
            } ))

            for await (const product of data.orderTrolley) {
                await tx.products.update({
                    where: { id: product.id_product },
                    data: {
                        sold: { increment: product.qty_at_buy },
                        qty: { decrement: product.qty_at_buy }
                    }
                });
            }
            // console.log('update many finish')

            // data.orderTrolley.map(async (product) => (
            //     await tx.products.update({
            //         where: { id: product.id_product },
            //         data: {
            //             sold: { increment: product.qty_at_buy }
            //         }
            //     })
            // ))

            // Update product stock
            // await Promise.all(
            //     data.orderTrolley.map(product =>
            //         tx.products.update({
            //             where: { id: product.id_product },
            //             data: {
            //                 sold: { increment: product.qty_at_buy }
            //             }
            //         })
            //     )
            // );

            // console.log(productsOrder)
            const orderProduct = await tx.trolleys.createMany(
                {
                    data: productsOrder,
                })
            // console.log('create many finish')

            return {
                order,
                orderCustomers: orderCustomerRes,
                orderProduct
            }
        })
    }

    async updateOne(data: TOrderTransactionUpdate, orderId: string) {
        return prisma.$transaction(async (tx) => {
            const updatedOrder = data.order
                ? await tx.orders.update({
                    where: { id: orderId },
                    data: data.order,
                })
                : null;

            let updatedReceiver = null;
            if (data.orderReceiver) {
                const order = await tx.orders.findUniqueOrThrow({
                    where: { id: orderId },
                });
                updatedReceiver = await tx.customers.update({
                    where: { id: order.id_customer },
                    data: data.orderReceiver,
                });
            }

            let updatedProducts = null;

            if (data.orderTrolley) {
                // Delete existing products for the order
                await tx.trolleys.deleteMany({
                    where: { id_order: orderId },
                });

                // Insert updated product list
                const products = data.orderTrolley.map((product) => ( {
                    id_order: orderId,
                    id_product: product.id_product,
                    qty_at_buy: product.qty_at_buy,
                    price_at_buy: product.price_at_buy,
                    id_user: product.id_user

                } ));

                updatedProducts = await tx.trolleys.createMany({
                    data: products,

                });
            }

            return {
                updatedOrder,
                updatedReceiver,
                updatedProducts,
            };
        });
    }

    async deleteOne(id_order: string) {
        return prisma.$transaction(async (tx) => {
            // Find the order to retrieve the associated receiver ID
            const order = await tx.orders.findUniqueOrThrow({
                where: { id: id_order },
            });

            // Delete related order products
            const orderProduct = await tx.trolleys.deleteMany({
                where: { id_order: id_order },
            });

            // Delete the order itself
            await tx.orders.delete({
                where: { id: id_order },
            });

            // // Delete the associated receiver
            // const orderReceiver = await tx.receivers.delete({
            // 	where: {id: order.id_receiver},
            // });

            return {
                order, orderProduct

            };
        });
    }

    async updateStatus(data: string, id: string,) {
        return prisma.orders.update({
            where: { id: id },
            data: { status: data }
        })
    }
}
