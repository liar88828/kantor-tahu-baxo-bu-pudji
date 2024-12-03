import { fileSystem } from '@/lib/utils/fileSystem';
import { InterfaceController } from "@/interface/server/InterfaceController";
import { TDeliveryDB } from "@/entity/travel.model";
import { TravelCreate, TravelUpdate } from "@/lib/validation/travel.valid";
import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";
import DeliveryRepository from "@/server/repository/delivery.repo";

export default class DeliveryController implements InterfaceController<TDeliveryDB> {
	constructor(
		private deliveryRepository: DeliveryRepository
	) {
	}
	
	async findAll(_: NextRequest, __: TContext): Promise<any> {
		return this.deliveryRepository.findAll();
	}
	
	async findById(_: NextRequest, { params }: TContext) {
		const id = (await params).id;
		return this.deliveryRepository.findById(id);
	}
	
	async createOne(request: NextRequest, __: TContext) {
		const json = await request.json()
		return this.deliveryRepository.createOne(TravelCreate.parse(json))
	}
	
	async updateOne(request: NextRequest, { params }: TContext) {
		const json = await request.json()
		const id = (await params).id
		return this.deliveryRepository.updateOne(TravelUpdate.parse(json), id)
	}
	
	async deleteOne(_: NextRequest, { params }: TContext) {
		const id = (await params).id
		const res = await this.deliveryRepository.deleteOne(id)
		if (res) {
			await fileSystem(res.img)
			return res
		}
	}
}
export const deliveryController = new DeliveryController(
	new DeliveryRepository()
)
