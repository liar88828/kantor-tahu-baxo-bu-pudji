import { BankCreate, BankUpdate, } from "@/lib/validation/bank.valid";
import { UUIDSchema } from "@/lib/validation/id.valid";
import { InterfaceController } from "@/interface/server/InterfaceController";
import { TPaymentDB } from "@/entity/Bank.model";
import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";
import { PaymentRepository } from "@/server/repository/bank.repo";
import { getId, getJson } from "@/lib/requestHelper";

export default class PaymentController implements InterfaceController<TPaymentDB> {
	constructor(private bankRepo: PaymentRepository) {
	}
	
	async findAll(_: NextRequest, __: TContext): Promise<any> {
		return this.bankRepo.findAll()
	}
	
	async findById(_: NextRequest, context: TContext) {
		const id = await getId(context);
		return this.bankRepo.findById(UUIDSchema.parse(id))
		
	}
	
	async createOne(request: NextRequest, _: TContext) {
		const json = await getJson(request)
		return this.bankRepo.createOne(
			BankCreate.parse(json))
	}
	
	async updateOne(request: NextRequest, context: TContext) {
		const json = await getJson(request)
		const id = await getId(context);
		return this.bankRepo.updateOne(
			BankUpdate.parse(json),
			UUIDSchema.parse(id))
	}
	
	async deleteOne(_: NextRequest, context: TContext) {
		const id = await getId(context);
		return this.bankRepo.deleteOne(UUIDSchema.parse(id))
	}
}
export const paymentController = new PaymentController(new PaymentRepository()
)
