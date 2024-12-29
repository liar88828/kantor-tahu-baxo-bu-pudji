import { ProductSearch, TProductCreate, TProductDB } from "@/interface/entity/product.model";
import { prisma } from "@/config/prisma";
import { ResponseAll } from "@/interface/server/param";
import { InterfaceRepository, ParamsApi } from "@/interface/server/InterfaceRepository";

export type ProductParams = ParamsApi<ProductSearch>

export default class ProductRepository implements InterfaceRepository<TProductCreate> {

	async findAll({ filter, pagination: { page = 1, limit = 100 } }: Required<ProductParams>,): Promise<ResponseAll<TProductDB>> {
		const skip = (page - 1) * limit;
		const take = limit;
		const products = await prisma.products.findMany({
			where: {
				AND: [
					{
						...(filter.location ? { location: { contains: filter.location, } } : {}),
						...(filter.name ? { name: { contains: filter.name, } } : {}),
						...(filter.type ? { type: { contains: filter.type, } } : {}),
					}
				],
			},
			skip,
			take,
		});
		return { data: products, page, limit };

	}

	async findById(id: string): Promise<any> {
		return prisma.products.findUnique({where: {id}});
	}

	async createOne(data: TProductCreate): Promise<any> {
		return prisma.products.create({data: {...data}});
	}

	async updateOne(data: TProductCreate, id: string): Promise<any> {
		return prisma.products.update({data: {...data}, where: {id}});
	}

	async deleteOne(id: string): Promise<any> {
		return prisma.products.delete({where: {id}});
	}

	setOne(d: (TProductCreate) & { id?: string }) {
		return {
			// ...(d.id ? { id: d.id, } : {}),
			name: d.name,
			type: d.type.replaceAll(" ", ""),
			location: d.location.replaceAll(" ", ""),
			price: d.price || 0,
			desc: d.desc,
			qty: d.qty || 0,
			img: d.img || "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
		}
	}

	setMany(data: TProductCreate[]): any[] {
		return data.map((d) => (this.setOne(d)))
	}

	async updateMany(data: TProductCreate[], id: string) {
		return prisma.products.updateMany({
			where: {id: id},
			data: this.setMany(data)
		})
	}
}

