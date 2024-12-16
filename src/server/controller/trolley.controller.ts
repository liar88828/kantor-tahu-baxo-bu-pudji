import { InterfaceController } from "@/interface/server/InterfaceController"
import { TContext } from "@/interface/server/param"
import { NextRequest } from "next/server"
import { getId, getJson } from "@/utils/requestHelper"
import { UUIDSchema } from "@/validation/id.valid"
import TrolleyRepository from "@/server/repository/trolley.repo"
import { OrderProductCreate, OrderProductUpdate, } from "@/validation/orderProduct.valid"
import { userId } from "@/network/trolley"

export default class TrolleyController implements InterfaceController {
	constructor(private trolleyRepository: TrolleyRepository) {
	}

	async findAll(request: NextRequest, __: TContext): Promise<any> {
		return this.trolleyRepository.findAll()

	}

	async findById(_: NextRequest, context: TContext): Promise<any> {
		const id = await getId(context)
		return this.trolleyRepository.findById(UUIDSchema.parse(id))
	}

	async createOne(request: NextRequest, context: TContext): Promise<any> {
		const json = await getJson(request)
		return this.trolleyRepository.createOne(OrderProductCreate.parse(json))
	}

	async updateOne(request: NextRequest, context: TContext): Promise<any> {
		const id = await getId(context)
		const json = await getJson(request)
		return this.trolleyRepository.updateOne(OrderProductUpdate.parse(json), id)
	}

	async deleteOne(request: NextRequest, context: TContext) {
		const id = await getId(context)
		return this.trolleyRepository.deleteOne(UUIDSchema.parse(id))
	}

	async increment(request: NextRequest, context: TContext) {
		const id = await getId(context)
		return this.trolleyRepository.increment(id)
	}

	async decrement(request: NextRequest, context: TContext) {
		const id = await getId(context)
		return this.trolleyRepository.decrement(id)
	}

	async count(request: NextRequest, context: TContext) {
		return this.trolleyRepository.count(userId)
	}
}
