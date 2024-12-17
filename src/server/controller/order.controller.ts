import { InterfaceController } from "@/interface/server/InterfaceController"
import { TContext } from "@/interface/server/param"
import { NextRequest } from "next/server"
import OrderRepository from "@/server/repository/order.repo"
import { getId, getJson, getParamsThrow } from "@/utils/requestHelper"
import { TOrderTransactionCreate, TOrderTransactionUpdate, } from "@/interface/entity/transaction.model"
import { OrderProductTransaction } from "@/validation/orderProduct.valid"
import { ReceiverCreate } from "@/validation/receiver.valid"
import { UUIDSchema } from "@/validation/id.valid"
import { orderCreateServer } from "@/validation/order.valid"

export default class OrderController
	implements InterfaceController {
	constructor(private orderRepository: OrderRepository) {
	}

	async findAll(__: NextRequest, _: TContext): Promise<any> {
		return this.orderRepository.findAll()
	}

	async findSearch(__: NextRequest, _: TContext): Promise<any> {
		return this.orderRepository.search({
			receiverName: "Alice",
			status: "Pending",
			dateRange: {
				start: new Date("2024-12-01"),
				end: new Date("2024-12-31"),
			},
		})
	}

	async createOne(request: NextRequest, _: TContext): Promise<any> {
		const json: TOrderTransactionCreate = await getJson(request)
		// console.log('test --')
		const data: TOrderTransactionCreate = {
			order: orderCreateServer.parse(json.order),
			orderTrolley: OrderProductTransaction.parse(json.orderTrolley),
			orderReceiver: ReceiverCreate.parse(json.orderReceiver),
		}
		console.log(data)
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

	async findDashboard(a: string) {
		// return this.orderRepository.findDashboard(a)
		// return this.orderRepository.findDashboard(a)
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

	async findByStatus(request: NextRequest, context: TContext) {
		// return this.orderRepository.findByStatus( this.v.zodIdNew( status ) )
		// return this.Repo(
		//   () => this.orderRepository.findByStatus( status ),
		//   this.v.zodId( status ) )
	}

	async deleteMany(id: string[]) {
		// return this.orderRepository.destroyMany(this.v.zodIdManyNew(id))
		// console.log( id )
		// const response = await this.Repo(
		// const response = await this.Repo(
		//   () => this.orderRepository.destroyMany( id ),
		//   this.v.zodIdMany( id ) )
		// console.log( response )
		// return response
		// console.log( response )
		// return response
	}

	async destroyOne(id: string) {
		// return this.orderRepository.destroyOne(this.v.zodIdNew(id))
		// return this.Repo(
		//   () => this.orderRepository.destroyOne( id ),
		//   this.v.zodId( id ) )
	}

	async edit(data: any, id: string) {
		// return this.orderRepository.updateMany(
		//   this.v.zodModelNew( data ),
		//   this.v.zodIdNew( id )
		// )
		// const Id    = this.v.zodId( id )
		// const Model = this.v.zodModel( body )
		// const valid = await this.Repo( () => Model, Id )
		// const repo  = await this.Repo( () => this.orderRepository.updateMany( body, id ), valid )
		// return repo
	}
}

