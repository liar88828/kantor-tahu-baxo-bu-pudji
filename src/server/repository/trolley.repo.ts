import {prisma} from "@/lib/prisma"
import {OrderProduct} from "@prisma/client"
import {TOrderProductCount, TOrderProductCreateTransaction, TOrderProductUpdate} from "@/entity/transaction.model";

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
	): Promise<any> {
		const skip = (page - 1) * pageSize
		const take = pageSize
		const products = await prisma.orderProduct.findMany({
			skip,
			take,
			include: {Product: true}
		})
		return {products, page, pageSize}
	}

	async findById(id: string): Promise<any> {
		return prisma.orderProduct.findUnique({
			where: {id},
			include: {Product: true}

		})
	}

	async createOne(data: TOrderProductCreateTransaction, id?: string): Promise<any> {
		if (id) {
			const idTrolley = await prisma.orderProduct.findUnique({where: {id}});
			if (idTrolley) {
				return prisma.orderProduct.update({
					where: {id: idTrolley.id},
					data: {
						qty: {
							increment: 1,
						},
					},
				})
			}
			if (!idTrolley) {
				return prisma.orderProduct.create({
					data: {
						id_product: data.id_product,
						qty: 1
					},
				})
			}

		}
		if (!id) {
			return prisma.orderProduct.create({
				data: {
					id_product: data.id_product,
					qty: 1
				},
			})
		}


	}


	async updateOne(data: TOrderProductUpdate, id?: string): Promise<any> {
		return prisma.orderProduct.update({
			where: {id: id},
			data: {
				qty: data.qty,
			},
		})
	}

	async deleteOne(id: string): Promise<any> {
		return prisma.orderProduct.delete({where: {id}})
	}

	async increment(data: TOrderProductCount, id: string): Promise<any> {

		return prisma.orderProduct.update({
			where: {id},
			data: {
				qty: {
					increment: 1,
				},
			},
		})
	}

	async decrement(data: TOrderProductCount, id: string): Promise<any> {

		return prisma.orderProduct.update({
			where: {id},
			data: {
				qty: {
					decrement: 1,
				},
			},
		})
	}


}
