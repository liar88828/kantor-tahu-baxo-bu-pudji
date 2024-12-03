import { prisma } from '@/server/models/prisma/config';
import { TPaymentCreate, TPaymentUpdate } from "@/entity/Bank.model";

export class PaymentRepository implements InterfaceRepository {
	paginate(data: { row: number; skip: number; }): Promise<any> {
		throw new Error('Method not implemented.');
	}
	
	search(search: string): Promise<any> {
		throw new Error('Method not implemented.');
	}
	
	async findAll() {
		return prisma.payments.findMany();
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
	
	async updateOne(data: TPaymentUpdate, id: string) {
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
	
	async updateMany(data: TPaymentUpdate[], id: string) {
		return prisma.payments.updateMany({
			where: { id: id },
			data: this.setMany(data)
		})
	}
	
	setOne(d: TPaymentUpdate | TPaymentCreate & { id?: string }) {
		return {
			...(d.id ? { id: d.id } : {}),
			jenis: d.jenis,
			lokasi: d.lokasi,
			keterangan: d.keterangan,
			nama: d.nama,
			no: d.no,
			hp: d.hp,
			img: d.img || "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
		}
	}
	
	setMany(data: (TPaymentUpdate | TPaymentCreate)[]) {
		return data.map((d) => (this.setOne(d)))
	}
	
}


