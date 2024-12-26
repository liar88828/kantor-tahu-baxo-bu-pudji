import ProductRepository, { UpdateStock } from "@/server/repository/product.repo"
import { InterfaceController } from "@/interface/server/InterfaceController"
import { TContext } from "@/interface/server/param"
import { NextRequest } from "next/server"
import { getId, getJson, getParams, getParamsBool, getParamsValue } from "@/utils/requestHelper"
import { UUIDSchema } from "@/validation/id.valid"
import { ProductCreate, ProductUpdateStock } from "@/validation/product.valid";
import { PRODUCT_FILTER_PRICE } from "@/store/product";

export default class ProductController
	implements InterfaceController {
	constructor(private productRepository: ProductRepository) {
	}

	async findAll(request: NextRequest, __: TContext): Promise<any> {

		return this.productRepository.findAll({
				filter: {
					location: getParams(request, "location"),
					type: getParams(request, "type"),
					name: getParams(request, "name"),
                    new: getParamsBool(request, "new"),
                    popular: getParamsBool(request, "popular"),
                    price: getParamsValue<PRODUCT_FILTER_PRICE>(request, "price", PRODUCT_FILTER_PRICE.NORMAL),
                    // related: getParamsBool(request, "related"),
				},
				pagination: {
                    page: Number(getParams(request, 'page') ?? "1"),
                    limit: Number(getParams(request, 'limit') ?? "100")
				}
			}
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
        // console.log(`test :${ json }`)
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

    async updateStock(request: NextRequest, context: TContext): Promise<any> {
        const id: string = await getId(context)
        const json: Omit<UpdateStock, 'id'> = await getJson(request)
        return this.productRepository.updateStock(
            ProductUpdateStock.parse({ ...json, id }),
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
