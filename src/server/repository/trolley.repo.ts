import { prisma } from "@/lib/prisma"
import { OrderProduct } from "@prisma/client"
import { TOrderProductCreate, TOrderProductList, TOrderProductUpdate } from "@/entity/transaction.model";

export default class TrolleyRepository
	implements InterfaceRepository<OrderProduct> {
	setOne(d: {
		id: string;
		id_order: string | null;
		id_product: string;
		qty: number;
		id_user: string | null;
	}, id?: string | undefined) {
		throw new Error("Method not implemented.");
	}

	setMany(data: any, method?: string | undefined): any[] {
		throw new Error("Method not implemented.");
	}


	async findAll(
		page: number = 1,
		pageSize: number = 100
	): Promise<{
		data: TOrderProductList[]
		page: number;
		pageSize: number;
	}> {
		const skip = (page - 1) * pageSize
		const take = pageSize
		const products = await prisma.orderProduct.findMany({
			skip,
			take,
			include: {Product: true}
		})
		return { data: products, page, pageSize }
	}

	async findById(id: string): Promise<any> {
		return prisma.orderProduct.findUnique({
			where: {id},
			include: {Product: true}

		})
	}

	async createOne(data: TOrderProductCreate,): Promise<any> {
		if (data.id_product) {
			const TrolleyDB = await prisma.orderProduct.findFirst({
				where: { id_product: data.id_product, id_user: data.id_user }
			})
			if (TrolleyDB) {
				return prisma.orderProduct.update({
					where: { id: TrolleyDB.id },
					data: {
						qty: {
							increment: data.qty,
						},
					},
				})
			}
			if (!TrolleyDB) {
				return prisma.orderProduct.create({
					data: {
						id_product: data.id_product,
						id_user: data.id_user,
						qty: data.qty
					},
				})
			}

		}
		if (!data.id_product) {
			return prisma.orderProduct.create({
				data: {
					id_product: data.id_product,
					qty: data.qty
				},
			})
		}


	}


	async updateOne(data: TOrderProductUpdate, id?: string): Promise<any> {
		return prisma.orderProduct.update({
			where: { id },
			data: {
				qty: data.qty,
			},
		})
	}

	async deleteOne(id: string): Promise<any> {
		return prisma.orderProduct.delete({where: {id}})
	}

	async increment(id: string): Promise<any> {
		return prisma.orderProduct.update({
			where: {id},
			data: {
				qty: {
					increment: 1,
				},
			},
		})
	}

	async decrement(id: string): Promise<any> {
		return prisma.orderProduct.update({
			where: {id},
			data: {
				qty: {
					decrement: 1,
				},
			},
		})
	}

	async count(id_user: string): Promise<any> {
		return prisma.orderProduct.count({
			where: { id_user: id_user },
		})
	}

}
