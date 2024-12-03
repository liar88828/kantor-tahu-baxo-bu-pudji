import { InterfaceController } from "@/interface/server/InterfaceController";
import { TOrderDB } from "@/entity/order.model";
import { TContext } from '@/interface/server/param';
import { NextRequest } from 'next/server';
import OrderRepository from "@/server/repository/orderan.repo";
import { getId, getJson, getParams } from "@/lib/requestHelper";
import { ProductUpdate } from "@/lib/validation/product.valid";

export default class OrderController implements InterfaceController<TOrderDB> {
	constructor(
		private orderRepository: OrderRepository,
	) {
	}
	
	async findAll(request: NextRequest, { params }: TContext): Promise<any> {
		return this.orderRepository.findAll()
	}
	
	async createOne(request: NextRequest, { params }: TContext): Promise<any> {
		const json = await getJson(request)
		return this.orderRepository.createOne(json)
		
	}
	
	async updateOne(request: NextRequest, context: TContext): Promise<any> {
		const json = await getJson(request)
		const id = await getId(context)
		return this.orderRepository.updateOne(ProductUpdate.parse(json), id)
	}
	
	async deleteOne(request: NextRequest, context: TContext): Promise<any> {
		const id = await getId(context)
		return this.orderRepository.deleteOne(id)
	}
	
	async findDashboard(a: string) {
		return this.orderRepository.findDashboard(a)
	}
	
	async updateStatus(request: NextRequest, context: TContext) {
		const id = await getId(context)
		const status = getParams(request, 'status')
		return this.orderRepository.updateStatus(status, id)
	}
	
	async findById(request: NextRequest, context: TContext) {
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
		// const respon = await this.Repo(
		//   () => this.orderRepository.destroyMany( id ),
		//   this.v.zodIdMany( id ) )
		// console.log( respon )
		// return respon
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

export const orderController = new OrderController(new OrderRepository())