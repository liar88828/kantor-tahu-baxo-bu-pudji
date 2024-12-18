import { prisma } from "@/config/prisma";
import { ReceiverSearch, TReceiverCreate } from "@/interface/entity/receiver.model";
import { InterfaceRepository, ParamsApi } from "@/interface/server/InterfaceRepository";

export type ReceiverParams = ParamsApi<ReceiverSearch>
export default class ReceiverRepository implements InterfaceRepository<TReceiverCreate> {

	async findAll({ filter, pagination: { page = 1, limit = 100 } }: Required<ReceiverParams>) {

		const skip = (page - 1) * limit;
		const take = limit;
		const data = await prisma.receivers.findMany({
			where: {
				AND: [
					{
						...(filter.name ? { name: { contains: filter.name, } } : {}),
						...(filter.address ? { address: { contains: filter.address, } } : {}),
						...(filter.phone ? { phone: { contains: filter.phone, } } : {}),
					}
				],
			},
			skip,
			take,
		});
		return { data: data, page, limit: limit };

	}

	async findById(id: string): Promise<any> {
		return prisma.receivers.findUnique({ where: { id } });
	}

	async createOne(data: TReceiverCreate): Promise<any> {
		return prisma.receivers.create({ data: { ...data } });
	}

	async updateOne(data: TReceiverCreate, id: string): Promise<any> {
		return prisma.receivers.update({ data: { ...data }, where: { id } });
	}

	async deleteOne(id: string): Promise<any> {
		return prisma.receivers.delete({ where: { id } });
	}

	setOne(d: (TReceiverCreate) & { id?: string }) {
		return {
			// ...(d.id ? { id: d.id, } : {}),
			name: d.name,
			address: d.address,
			phone: d.phone,
		}
	}

	setMany(data: TReceiverCreate[]): any[] {
		return data.map((d) => (this.setOne(d)))
	}

	async updateMany(data: TReceiverCreate[], id: string) {
		return prisma.receivers.updateMany({
			where: { id: id },
			data: this.setMany(data)
		})
	}
}

