import TrolleyRepository from "@/server/repository/trolley.repo"
import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { OrderProductCreate, OrderProductUpdate, } from "@/validation/orderProduct.valid"
import { TContext } from "@/interface/server/param"
import { TTrolleyCreate } from "@/interface/entity/trolley.model";
import { UUIDSchema } from "@/validation/id.valid"
import { getId, getJson, getParams } from "@/utils/requestHelper"
import { validSession } from "@/server/lib/db";

export default class TrolleyController implements InterfaceController {
	constructor(private trolleyRepository: TrolleyRepository) {
	}

	async findAll(request: NextRequest, __: TContext): Promise<any> {
        const user = await validSession()
        return this.trolleyRepository.findAll({
            pagination: {
                page: Number(getParams(request, "page") ?? '1'),
                limit: Number(getParams(request, "limit") ?? '100'),
            },
            filter: { id_user: user.userId }
        })
	}

	async findById(_: NextRequest, context: TContext): Promise<any> {
		const id = await getId(context)
		return this.trolleyRepository.findById(UUIDSchema.parse(id))
	}

    async createOne(request: NextRequest, _context: TContext): Promise<any> {
        const json: TTrolleyCreate = await getJson(request)
        const user = await validSession()
        json.id_user = user.userId
		return this.trolleyRepository.createOne(OrderProductCreate.parse(json))
	}

	async updateOne(request: NextRequest, context: TContext): Promise<any> {
		const id = await getId(context)
		const json = await getJson(request)
		return this.trolleyRepository.updateOne(OrderProductUpdate.parse(json), id)
	}

    async deleteOne(_request: NextRequest, context: TContext) {
		const id = await getId(context)
		return this.trolleyRepository.deleteOne(UUIDSchema.parse(id))
	}

    async increment(_request: NextRequest, context: TContext) {
		const id = await getId(context)
		return this.trolleyRepository.increment(id)
	}

    async decrement(_request: NextRequest, context: TContext) {
		const id = await getId(context)
		return this.trolleyRepository.decrement(id)
	}

    async count(_request: NextRequest, _context: TContext) {
        const user = await validSession()
        return this.trolleyRepository.count(user.userId)
	}
}
