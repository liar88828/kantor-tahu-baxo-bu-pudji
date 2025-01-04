import OrderRepository from "@/server/repository/order.repo"
import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { OrderProductTransaction } from "@/validation/orderProduct.valid"
import { ReceiverCreate } from "@/validation/receiver.valid"
import { TContext } from "@/interface/server/param"
import {
    IncomingStatusResponse,
    TOrderTransactionCreate,
    TOrderTransactionUpdate,
} from "@/interface/entity/transaction.model"
import { TStatusOrder } from "@/interface/Utils";
import { UUIDSchema } from "@/validation/id.valid"
import { getId, getJson, getParams, getParamsThrow } from "@/utils/requestHelper"
import { orderCreateServer } from "@/validation/order.valid"
import { prisma } from "@/config/prisma";
import { validSession } from "@/server/lib/db";
import { z } from "zod";

export default class OrderController
    implements InterfaceController {
    constructor(private orderRepository: OrderRepository) {
    }

    async findAll(request: NextRequest, context: TContext): Promise<any> {

        const year = getParams(request, 'year')
        if (year) {
            // console.log(year)
            return this.orderRepository.getMonthlyTotal(Number(year))
        } else {
            return this.orderRepository.findAll({
                filter: {
                    name: getParams(request, "name") ?? '',
                    status: getParams(request, "status") ?? '',
                },
                pagination: {
                    limit: Number(getParams(request, "limit") ?? '100'),
                    page: Number(getParams(request, "page") ?? '1'),

                }
            })
        }

    }

    async findOrderStatusUser(request: NextRequest, _: TContext): Promise<any> {
        const status = getParams(request, 'status',) ?? ''
        const { userId } = await validSession()
        return this.orderRepository.findOrderStatus({ status, userId })
    }

    async createOne(request: NextRequest, _: TContext): Promise<any> {
        const json: TOrderTransactionCreate = await getJson(request)
        const data: TOrderTransactionCreate = {
            order: orderCreateServer.parse(json.order),
            orderTrolley: OrderProductTransaction.parse(json.orderTrolley),
            orderReceiver: ReceiverCreate.parse(json.orderReceiver),
        }
        return this.orderRepository.createOne(data)
    }

    async updateOne(request: NextRequest, context: TContext): Promise<any> {
        const json = await getJson(request)
        const id = await getId(context)
        const data: TOrderTransactionUpdate = {
            order: orderCreateServer.parse(json.order),
            orderTrolley: OrderProductTransaction.parse(json.orderTrolley),
            orderReceiver: ReceiverCreate.parse(json.orderReceiver)
        }
        return this.orderRepository.updateOne(data, UUIDSchema.parse(id))

    }

    async deleteOne(request: NextRequest, context: TContext): Promise<any> {
        const id = await getId(context)
        return this.orderRepository.deleteOne(UUIDSchema.parse(id))
    }

    async updateStatus(request: NextRequest, context: TContext) {
        const id = await getId(context)
        const status = getParamsThrow(request, "status")
        return this.orderRepository.updateStatus(status, id)
    }

    async findById(_: NextRequest, context: TContext) {
        const id = await getId(context)
        return this.orderRepository.findById(id)
    }

    async findHistoryUser(request: NextRequest, _context: TContext) {
        const user = await validSession()
        const status = getParams(request, "status") ?? ''
        const limit = getParams(request, "limit") ?? ''
        return this.orderRepository.findHistoryUser(
            status,
            user.userId,
            Number(limit)
        )
    }

    async findByMonth(request: NextRequest, _: TContext) {
        const status = getParamsThrow(request, 'status') as TStatusOrder
        return this.orderRepository.findByMonth(status)

    }

    async findTopOrderTotal(request: NextRequest, _: TContext) {
        return this.orderRepository.findTopOrderTotal()

    }

    async incomingFindCon(request: NextRequest, _: TContext): Promise<IncomingStatusResponse[]> {
        const status = getParamsThrow(request, "status")
        const search = getParams(request, "search") ?? ''
        return prisma.orders.findMany({
            take: 10,
            where: {
                status: status,
                ...( search ? { id: { contains: search } } : {} ),
                // ...( search ? { Customers: { name: { contains: search } } } : {} )
            },
            include: {
                Customers: true,
                Trolleys: true
            },
            orderBy: {
                updated_at: 'desc'
            }
        })
    }

    async incomingAction(request: NextRequest, _: TContext) {

        const validData = z.object({
            id: z.string().uuid(),
            status: z.string(),
        }).parse(await request.json());

        return prisma.orders.update({
            where: { id: validData.id },
            data: {
                status: validData.status,
            }
        })
    }

    async findOrderCountAdmin(request: NextRequest, _: TContext) {
        const status = getParamsThrow(request, "status")
        return prisma.orders.count({
            where: { status }
        })
    }

}
