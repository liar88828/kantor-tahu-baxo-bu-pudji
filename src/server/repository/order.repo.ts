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
import { MonthlyTotal, OrderParams, ResponseCreateOrderTransaction, SearchOrder } from "@/interface/entity/order.model";
import { StatusOrder } from "@/interface/Utils";

export default class OrderRepository implements InterfaceRepository<TOrderTransactionCreate> {

	async search(criteria: SearchOrder) {
		return prisma.$transaction(async (tx) => {

			return tx.orders.findMany({
				where: {
					AND: [
						{
							...(criteria.receiverName ?
								{Receiver: {name: {contains: criteria.receiverName},}} : {}),

							...(criteria.status ?
								{status: {equals: criteria.status}} : {}),

							...(criteria.dateRange ?
								{
									orderTime: {
										gte: criteria.dateRange.start,
										lte: criteria.dateRange.end
									}
								} : {}),

							...(criteria.productId ? {
								OrderProduct: {
									some: {
										id_product: criteria.productId,
									}
								}
							} : {}),

						}
					]
				},
				include: {
					Customers: true,
					Trolleys: {
						include: {
							Product: true
						}
					}
				},
			});
		});
	}

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

    async findAll({
                      filter,
                      pagination: { limit = 100, page = 1 }
                  }: Required<OrderParams>): Promise<{ data: Orders[] } & TPagination> {
		const skip = (page - 1) * limit;
		const take = limit;
		const order = await prisma.orders.findMany({
            where: {
                AND: [
                    {
                        ...(filter.name ? { Customers: { name: { contains: filter.name, } } } : {}),
                        ...(filter.status ? { status: { contains: filter.status, } } : {}),
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
			where: {id},
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

    async findHistoryUser(id_user: string): Promise<HistoryUser[]> {
        return prisma.orders.findMany(
            {
                where: { id_customer: id_user, },
                include: {
                    Customers: true,
                    Trolleys: true
                },
            }
        );
    }

    async findByMonth(status: StatusOrder): Promise<OrderMonthTotal> {
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
        }).then((data) => ({
            count: data._count,
            totalAll: data._sum.totalAll ?? 0,
        }))
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

    // ---------CREATE
    async createOne(data: TOrderTransactionCreate): Promise<ResponseCreateOrderTransaction> {
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

            await tx.trolleys.deleteMany({
                where: {
                    id: {
                        in: data.orderTrolley.map(d => d.id)
                    }
                }
            })

            const products = data.orderTrolley.map((product) => ({
                id_order: order.id,
                id_product: product.id_product,
                qty_at_buy: product.qty_at_buy,
                price_at_buy: product.price_at_buy
            }))

            for await (const product of data.orderTrolley) {
                await tx.products.update({
                    where: { id: product.id_product },
                    data: {
                        sold: { increment: product.qty_at_buy },
                        qty: { decrement: product.qty_at_buy }
                    }
                });
            }

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

            const orderProduct = await tx.trolleys.createMany(
                { data: products })

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
					where: {id: orderId},
					data: data.order,
				})
				: null;

			let updatedReceiver = null;
			if (data.orderReceiver) {
				const order = await tx.orders.findUniqueOrThrow({
					where: {id: orderId},
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
					where: {id_order: orderId},
				});

				// Insert updated product list
				const products = data.orderTrolley.map((product) => ({
					id_order: orderId,
					id_product: product.id_product,
					qty_at_buy: product.qty_at_buy,
					price_at_buy: product.price_at_buy,

				}));

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

//   async findDashboard( a: string ) {
//     if( a === "false" ) {
//       const falseFeature = (): void => {
//
//         const monthlyUserCounts = prisma.orders.groupBy({
//             by    : [ "pesan" ],
//             _count: { pesan: true, },
//             where : {
//               pesan: {
//                 gte: new Date( `${ currentYear }-01-01` ),
//                 lte: new Date( `${ currentYear }-12-30` ),
//               }
//             },
//           }
//         )
//         console.debug( monthlyUserCounts )
//
//         // const aggregatedData = prisma.semuaProduct.groupBy( {
//         //   by     : [ 'nama' ],
//         //   where  : {
//         //     AND: [
//         //       {
//         //         created_at: {
//         //           gte: new Date( new Date().getFullYear(), new Date().getMonth() - 1, 1 ),
//         //           lt : new Date( new Date().getFullYear(), new Date().getMonth(), 1 ),
//         //         },
//         //       },
//         //     ],
//         //   },
//         //   _sum   : {
//         //     jumlah: true,
//         //     harga : true,
//         //   },
//         //   orderBy: {
//         //     _sum: {
//         //       harga: 'desc',
//         //     },
//         //   },
//         // } );
//         // console.debug( aggregatedData )
//
//         //--------------get jumlah lokasi
//         const monthlyUserCounts1 = prisma.orders.groupBy({
//             by    : [ "lokasi" ],
//             _count: {
//               lokasi: true,
//             },
//           }
//         )
//         console.debug( monthlyUserCounts1 )
//
//         const tanggalSekarang = prisma.orders.findMany({
//             where: {
//               kirim: {
//                 gte: new Date( `${ currentYear }-${ currentMonth }-01` ),
//                 lte: new Date( `${ currentYear }-${ currentMonth }-30` ),
//               }
//             }
//           }
//         )
//         console.debug( tanggalSekarang )
//
//         //--------------get jumlah lokasi
//         const monthlyUserCounts2 = prisma.orders.count({
//           where: {
//             created_at: {
//               gte: new Date( `${ currentYear }-01-01` ),
//               lte: new Date( `${ currentYear }-12-30` ),
//             }
//           },
//         } )
//         console.debug( monthlyUserCounts2 )
//       }
//       console.debug( falseFeature )
//
//     }
//
//     // untuk list card
//     const semuaNotifyMonth = prisma.orders.findMany({
//       where : {
//         status: {
//           contains: "irim"
//         },
//         // status:"Di Kirim",  ,
//
//         sendTime: {
//           gte: addDays( -30 ),
//           // lte: new Date( `${ currentYear }-${ currentMonth }-30` ),
//         },
//       },
//       select: {
//         id: true,
//         //penerima
//         penerima      : true,
//         hpPenerima    : true,
//         alamatPenerima: true,
//         //
//         pengirim      : true,
//         namaPengiriman: true,
//
//         //
//         kirim         : true,
//         pesan         : true,
//         status        : true,
//         typePembayaran: true,
//         totalBayar    : true,
//
//       },
//       take  : 100,
//     } );
//
//     // untuk donat Now Month
//     // const semuaProductCountNow = prisma.semuaProduct.groupBy( {
//     //   by    : [ "nama" ],
//     //   _count: { nama: true, },
//     //   where : {
//     //     created_at: {
//     //       gte: addDays( -30 ),
//     //       // lte: new Date( `${ currentYear }-${ currentMonth }-30` ),
//     //       }
//     //     },
//     //   }
//     // )
//
//     // untuk donat Now Month Last
//     // const semuaProductCountLast = prisma.semuaProduct.groupBy( {
//     //     by    : [ "nama" ],
//     //     _count: { nama: true, },
//     //   where: {
//     //     created_at: {
//     //       gte: new Date( `${ currentYear }-${ currentMonth === 0 ? 12 : currentMonth - 1 }-01` ),
//     //       lte: new Date( `${ currentYear }-${ currentMonth === 0 ? 12 : currentMonth - 1 }-30` ),
//     //     }
//     //   },
//     //   }
//     // )
//
//     //untuk notify block status
//     const semuaStatusOrder = prisma.orders.groupBy({
//         by    : [ "status" ],
//         _count: { status: true, },
//         where : {
//           created_at: {
//             gte: addDays( -30 ),
//             // lte: new Date( `${ currentYear }-${ currentMonth }-30` ),
//           }
//         },
//       }
//     )
//
//     // return { data: monthlyUserCounts}.
//     const transaction = await prisma.$transaction([
//       // semuaProductCountNow,
//       semuaStatusOrder, semuaNotifyMonth,
//       // semuaProductCountLast,
//       //aggregatedData
//     ] )
//
//     const monthlyUserCounts: TLine[] = await prisma.$queryRaw`
//         SELECT YEAR(pesan)                AS year,
//                MONTHNAME(pesan)           AS month,
//                CAST(COUNT(*) AS UNSIGNED) AS jumlah_pesanan
//         FROM tahu_baxo_bupudji.orderans
//         WHERE YEAR(pesan) BETWEEN YEAR(CURRENT_DATE) - 3 AND YEAR(CURRENT_DATE)
//         GROUP BY YEAR(pesan), MONTH(pesan)
//         ORDER BY YEAR(pesan), MONTH(pesan);
//     `
//
//     const aggregate: TAggregate[] = await prisma.$queryRaw`
//         SELECT nama,
//                SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) THEN jumlah ELSE 0 END)     AS total_jumlah_current,
//                SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) - 1 THEN jumlah ELSE 0 END) AS total_jumlah_last,
//                SUM(IF(MONTH(created_at) = MONTH(CURRENT_DATE) - 2, jumlah,
//                       0))                                                                        AS total_jumlah_last_two,
//                SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) THEN harga ELSE 0 END)      AS total_harga_current,
//                SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) - 1 THEN harga ELSE 0 END)  AS total_harga_last,
//                SUM(IF(MONTH(created_at) = MONTH(CURRENT_DATE) - 2, harga, 0))                    AS total_harga_last_two
//         FROM tahu_baxo_bupudji.semuaproducts
//         WHERE MONTH(created_at) BETWEEN MONTH(CURRENT_DATE) - 2 AND MONTH(CURRENT_DATE)
//         GROUP BY nama;
//
//     `
//
// //untuk line
//     const semuaOrderTahun: TLines[] = monthlyUserCounts.map( ( item ) => ( {
//       ...item,
//       jumlah_pesanan: Number( item.jumlah_pesanan )
//     } ) );
//
//     // const semuaProductNow        = transaction[ 0 ]
//     // const semuaStatus: TStatus[] = transaction[ 1 ]
//     // const notifyMonth            = transaction[ 2 ]
//     // const semuaProductLast       = transaction[ 3 ]
//
//     // const send = {
//     //   semuaOrderTahun,//untuk line
//     //   semuaProductNow,// untuk donat Now
//     //   semuaProductLast,// untuk donat Last
//     //   semuaStatus,// untuk notify block status
//     //   notifyMonth,// untuk list card
//     //   aggregate
//     // }
//     // return send
//
//   }

	async updateStatus(data: string, id: string,) {
		return prisma.orders.update({
			where: {id: id},
			data: {status: data}
		})
	}

}
