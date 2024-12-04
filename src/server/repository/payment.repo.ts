import { TPaymentCreate, TPaymentSearch, } from "@/entity/payment.model";
import {prisma} from "@/lib/prisma";

export class PaymentRepository implements InterfaceRepository<TPaymentCreate> {
	paginate(data: { row: number; skip: number; }): Promise<any> {
		throw new Error('Method not implemented.');
	}
	
	search(search: string): Promise<any> {
		throw new Error('Method not implemented.');
	}
	
	async findAll(search: TPaymentSearch, page: number = 1, pageSize: number = 100) {
		const skip = (page - 1) * pageSize;
		const take = pageSize;
		const payments = await prisma.payments.findMany(
			{
				skip,
				take,
				where: {
					AND: [
						{
							...(search.address ? { address: { contains: search.address, } } : {}),
							...(search.name ? { name: { contains: search.name, } } : {}),
							...(search.type ? { type: { contains: search.type, } } : {}),
						}
					],
				}
			}
		);
		return { payments, page, pageSize };
		
	}
	
	async findOne(id: string) {
		return prisma.payments.findFirst({ where: { id } });
	}
	
	async findById(id: string) {
		return prisma.payments.findUnique({ where: { id } });
	}
	
	async deleteOne(id: string) {
		return prisma.payments.delete({ where: { id } })
	}
	
	async createOne(data: TPaymentCreate) {
		return prisma.payments.create({ data: { ...data } })
	}
	
	async updateOne(data: TPaymentCreate, id: string) {
		return prisma.payments.update({
			where: { id: id }, data: { ...data }
		})
	}
	
	async createMany(data: TPaymentCreate[]) {
		return prisma.payments.createMany({
			data: this.setMany(data)
		});
	}
	
	async destroyMany(id: string) {
		return prisma.payments.deleteMany({ where: { id } })
	}
	
	async updateMany(data: TPaymentCreate[], id: string) {
		return prisma.payments.updateMany({
			where: { id: id },
			data: this.setMany(data)
		})
	}
	
	setOne(d: TPaymentCreate & { id?: string }) {
		return {
			// ...(d.id ? { id: d.id } : {}),
			type: d.type,
			address: d.address,
			desc: d.desc,
			name: d.name,
			accounting: d.accounting,
			phone: d.phone,
			img: d.img || "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
		}
	}
	
	setMany(data: TPaymentCreate[]) {
		return data.map((d) => (this.setOne(d)))
	}
	
}


