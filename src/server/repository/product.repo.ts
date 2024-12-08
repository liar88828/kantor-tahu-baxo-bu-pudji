import {ProductSearch, TProductCreate, TProductDB} from "@/entity/product.model";
import {prisma} from "@/lib/prisma";
import {ResponseAll} from "@/interface/server/param";


export default class ProductRepository implements InterfaceRepository<TProductCreate> {
	paginate(data: { row: number; skip: number; }): Promise<any> {
		throw new Error('Method not implemented.');
	}

	search(search: string): Promise<any> {
		throw new Error('Method not implemented.');
	}

	async findAll(searchQuery: ProductSearch, page: number = 1, pageSize: number = 10): Promise<ResponseAll<TProductDB>> {

		const skip = (page - 1) * pageSize;
		const take = pageSize;
		const products = await prisma.products.findMany({
			where: {
				AND: [
					{
						...(searchQuery.location ? {location: {contains: searchQuery.location,}} : {}),
						...(searchQuery.name ? {name: {contains: searchQuery.name,}} : {}),
						...(searchQuery.type ? {type: {contains: searchQuery.type,}} : {}),
					}
				],
			},
			skip,
			take,
		});
		return {data: products, page, pageSize};

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

