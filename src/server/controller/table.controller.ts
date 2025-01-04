import { InterfaceController } from "@/interface/server/InterfaceController";
import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";
import { getId, getJson } from "@/utils/requestHelper";
import OrderRepository from "@/server/repository/order.repo";

export default class TableController
    implements InterfaceController {
    constructor(private orderRepository: OrderRepository) {
    }

    updateOne(request: NextRequest, context: TContext): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async findAll(request: NextRequest, _: TContext): Promise<any> {
        return this.orderRepository.findAll({ filter: { status: "", name: "" }, pagination: {} })
    }

    async createOne(request: NextRequest, _: TContext): Promise<any> {
        const json = await getJson(request)
        return this.orderRepository.createOne(json)

    }

    async deleteOne(request: NextRequest, context: TContext): Promise<any> {
        const id = await getId(context)
        return this.orderRepository.deleteOne(id)
    }

    async findById(request: NextRequest, context: TContext) {
        const id = await getId(context)
        return this.orderRepository.findById(id)
    }

}
