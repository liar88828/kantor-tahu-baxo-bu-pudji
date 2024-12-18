import { InterfaceController } from "@/interface/server/InterfaceController"
import { TContext } from "@/interface/server/param"
import { NextRequest } from "next/server"
import { getId, getJson, getParams } from "@/utils/requestHelper"
import { UUIDSchema } from "@/validation/id.valid"
import UserRepository from "@/server/repository/user.repo";
import { UserCreate } from "@/validation/user.valid";

export default class UserController
	implements InterfaceController {
	constructor(private userRepository: UserRepository) {
	}

	async findAll(request: NextRequest, __: TContext): Promise<any> {
		return this.userRepository.findAll({
			filter: {
				name: getParams(request, "name") ?? '',
				address: getParams(request, "address") ?? '',
			},
			pagination: {
				page: Number(Number(getParams(request, 'page') ?? '1')),
			}
		},)
	}
	async findById(_: NextRequest, context: TContext): Promise<any> {
		const id = await getId(context)
		return this.userRepository.findById(
			// id
			UUIDSchema.parse(id)
		)
	}

	async createOne(request: NextRequest, context: TContext): Promise<any> {
		const json = await getJson(request)
		console.log(`test :${ json }`)
		return this.userRepository.createOne(UserCreate.parse(json))
	}

	async updateOne(request: NextRequest, context: TContext): Promise<any> {
		const id = await getId(context)
		const json = await getJson(request)
		return this.userRepository.updateOne(
			UserCreate.parse(json),
			UUIDSchema.parse(id)
		)
	}

	async deleteOne(request: NextRequest, context: TContext) {
		const id = await getId(context)
		const res = await this.userRepository.deleteOne(
			// UUIDSchema.parse(id)
			UUIDSchema.parse(id)
		)
		// if (res) {
		// await fileSystem( res.img )
		// }
		return res
	}
}
