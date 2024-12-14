import { prisma } from "@/lib/prisma";
import { EmployeeCreate, EmployeeSchema } from "@/validation/employee.valid";
import { TEmployeeSearch } from "@/entity/employee.model";

// getAll data from database
export default class EmployeeRepository implements InterfaceRepository<EmployeeSchema> {
	paginate(data: { row: number; skip: number; }): Promise<any> {
		throw new Error('Method not implemented.');
	}

	search(search: string): Promise<any> {
		throw new Error('Method not implemented.');
	}

	async findAll(search: TEmployeeSearch, page: number = 1, pageSize: number = 100) {
		const skip = (page - 1) * pageSize;
		const take = pageSize;
		const delivery = await prisma.employees.findMany(
			{
				skip,
				take,
				where: {
					AND: [
						{
							...(search.name ? { name: { contains: search.name, } } : {}),
						}
					],
				}
			}
		);
		return { data: delivery, page, pageSize };
	}

	async findById(id: string) {
		return prisma.employees.findUnique({ where: { id } });
	}

	async createOne(data: EmployeeCreate) {
		return prisma.employees.create({
			data: {
				...data,
			}
		});
	}

	async updateOne(data: any, id: string) {
		return prisma.employees.update({ data, where: { id } });

	}

	async deleteOne(id: string) {
		return prisma.employees.delete({ where: { id } });
	}

	setOne(d: (EmployeeSchema) & { id?: string }) {
		return {}
	}

	setMany(data: EmployeeSchema []) {
		return data.map((d) => (this.setOne(d)))
	}

	async createMany(data: EmployeeSchema[]) {
	}

	async updateMany(data: EmployeeSchema[], id: string) {
	}

	async deleteMany(id: string) {
		return prisma.employees.deleteMany({ where: { id } })

	}

}
