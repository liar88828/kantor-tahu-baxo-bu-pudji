import { prisma } from "@/config/prisma";
import { ResponseAll } from "@/interface/server/param";
import { ReceiverSearch, TReceiverCreate, TReceiverDB } from "@/interface/entity/receiver.model";

export default class ReceiverRepository implements InterfaceRepository<TReceiverCreate> {
	paginate(data: { row: number; skip: number; }): Promise<any> {
		throw new Error('Method not implemented.');
	}

	search(search: string): Promise<any> {
		throw new Error('Method not implemented.');
	}

	async findAll(searchQuery: ReceiverSearch, page: number = 1, pageSize: number = 10): Promise<ResponseAll<TReceiverDB>> {

		const skip = (page - 1) * pageSize;
		const take = pageSize;
		const data = await prisma.receivers.findMany({
			where: {
				AND: [
					{
						...(searchQuery.name ? { name: { contains: searchQuery.name, } } : {}),
						...(searchQuery.address ? { address: { contains: searchQuery.address, } } : {}),
						...(searchQuery.phone ? { phone: { contains: searchQuery.phone, } } : {}),
					}
				],
			},
			skip,
			take,
		});
		return { data: data, page, pageSize };

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

