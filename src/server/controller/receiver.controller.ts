import { InterfaceController } from "@/interface/server/InterfaceController"
import { TContext } from "@/interface/server/param"
import { NextRequest } from "next/server"
import { getId, getJson, getParams } from "@/utils/requestHelper"
import { UUIDSchema } from "@/validation/id.valid"
import CustomerRepository from "@/server/repository/receiver.repo";
import { ReceiverCreate } from "@/validation/receiver.valid";

export default class ReceiverController
	implements InterfaceController {
	constructor(private receiverRepository: CustomerRepository) {
	}

	async findAll(request: NextRequest, __: TContext): Promise<any> {
		return this.receiverRepository.findAll({
				filter: {
					name: getParams(request, "name") ?? '',
					address: getParams(request, "address") ?? '',
					phone: getParams(request, "phone") ?? ''
				},
				pagination: {
					page: Number(getParams(request, 'page') ?? "1"),
					limit: Number(getParams(request, 'limit') ?? "1"),
				}
			}
		)
	}

	async findById(_: NextRequest, context: TContext): Promise<any> {
		const id = await getId(context)
		return this.receiverRepository.findById(
			// id
			UUIDSchema.parse(id)
		)
	}

	async createOne(request: NextRequest, context: TContext): Promise<any> {
		const json = await getJson(request)
		console.log(`test :${ json }`)
		return this.receiverRepository.createOne(ReceiverCreate.parse(json))
	}

	async updateOne(request: NextRequest, context: TContext): Promise<any> {
		const id = await getId(context)
		const json = await getJson(request)
		return this.receiverRepository.updateOne(
			ReceiverCreate.parse(json),
			UUIDSchema.parse(id)
		)
	}

	async deleteOne(request: NextRequest, context: TContext) {
		const id = await getId(context)
		const res = await this.receiverRepository.deleteOne(
			// UUIDSchema.parse(id)
			UUIDSchema.parse(id)
		)
		// if (res) {
		// await fileSystem( res.img )
		// }
		return res
	}
}
