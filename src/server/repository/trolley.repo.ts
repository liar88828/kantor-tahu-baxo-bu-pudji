import { prisma } from "@/config/prisma"
import { TTrolleyCreate, TTrolleyDB, TTrolleyProductDB, TTrolleyUpdate } from "@/interface/entity/trolley.model";
import { InterfaceRepository } from "@/interface/server/InterfaceRepository";
import { ResponseAll } from "@/interface/server/param";

export default class TrolleyRepository implements InterfaceRepository<TTrolleyDB> {

	async findAll({ pagination: { page = 1, limit = 100 } }): Promise<ResponseAll<TTrolleyProductDB>> {
		const skip = (page - 1) * limit
		const take = limit
		const products = await prisma.trolleys.findMany({
			skip,
			take,
			include: {Product: true}
		})
		return { data: products, page, limit }
	}

	async findById(id: string): Promise<any> {
		return prisma.trolleys.findUnique({
			where: {id},
			include: {Product: true}

		})
	}

	async createOne(data: TTrolleyCreate,): Promise<any> {
		if (data.id_product) {
			const TrolleyDB = await prisma.trolleys.findFirst({
				where: { id_product: data.id_product, id_user: data.id_user }
			})
			if (TrolleyDB) {
				return prisma.trolleys.update({
					where: { id: TrolleyDB.id },
					data: {
						qty_at_buy: {
							increment: data.qty_at_buy,
						},
					},
				})
			}
			if (!TrolleyDB) {
				return prisma.trolleys.create({
					data: {
						id_product: data.id_product,
						id_user: data.id_user,
						qty_at_buy: data.qty_at_buy,
						price_at_buy: data.price_at_buy
					},
				})
			}

		}
		if (!data.id_product) {
			return prisma.trolleys.create({
				data: {
					id_product: data.id_product,
					qty_at_buy: data.qty_at_buy,
					price_at_buy: data.qty_at_buy
				},
			})
		}


	}

	async updateOne(data: TTrolleyUpdate, id?: string): Promise<any> {
		return prisma.trolleys.update({
			where: { id },
			data: {
				qty_at_buy: data.qty_at_buy,
				price_at_buy: data.qty_at_buy
			},
		})
	}

	async deleteOne(id: string): Promise<any> {
		return prisma.trolleys.delete({ where: { id } })
	}

	async increment(id: string): Promise<any> {
		return prisma.trolleys.update({
			where: {id},
			data: {
				qty_at_buy: {
					increment: 1,
				},
			},
		})
	}

	async decrement(id: string): Promise<any> {
		return prisma.trolleys.update({
			where: {id},
			data: {
				qty_at_buy: {
					decrement: 1,
				},
			},
		})
	}

	async count(id_user: string): Promise<any> {
		return prisma.trolleys.count({
			where: { id_user: id_user },
		})
	}

}
