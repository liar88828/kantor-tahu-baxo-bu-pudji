import ProductRepository from "@/server/repository/product.repo"
import { InterfaceController } from "@/interface/server/InterfaceController"
import { TContext } from "@/interface/server/param"
import { NextRequest } from "next/server"
import { getId, getJson, getParams } from "@/utils/requestHelper"
import { UUIDSchema } from "@/validation/id.valid"
import { ProductCreate } from "@/validation/product.valid";

export default class ProductController
	implements InterfaceController {
	constructor(private productRepository: ProductRepository) {
	}

	async findAll(request: NextRequest, __: TContext): Promise<any> {
		const page = getParams(request, 'page') ?? 1
		return this.productRepository.findAll({
				location: getParams(request, "location"),
				type: getParams(request, "type"),
				name: getParams(request, "name"),
			},
			Number(page),
		)
	}

	async findById(_: NextRequest, context: TContext): Promise<any> {
		const id = await getId(context)
		return this.productRepository.findById(
			// id
			UUIDSchema.parse(id)
		)
	}

	async createOne(request: NextRequest, context: TContext): Promise<any> {
		const json = await getJson(request)
		console.log(`test :${ json }`)
		return this.productRepository.createOne(ProductCreate.parse(json))
	}

	async updateOne(request: NextRequest, context: TContext): Promise<any> {
		const id = await getId(context)
		const json = await getJson(request)
		return this.productRepository.updateOne(
			ProductCreate.parse(json),
			UUIDSchema.parse(id)
		)
	}

	async deleteOne(request: NextRequest, context: TContext) {
		const id = await getId(context)
		const res = await this.productRepository.deleteOne(
			// UUIDSchema.parse(id)
			UUIDSchema.parse(id)
		)
		// if (res) {
		// await fileSystem( res.img )
		// }
		return res
	}
}
