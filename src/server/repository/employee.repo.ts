import { prisma } from "@/config/prisma";
import { EmployeeCreateZod } from "@/validation/employee.valid";
import { EmployeeCreate, TEmployeeDB, TEmployeeSearch } from "@/interface/entity/employee.model";
import { ResponseAll } from "@/interface/server/param";

// getAll data from database
export default class EmployeeRepository implements InterfaceRepository<EmployeeCreateZod> {
	paginate(data: { row: number; skip: number; }): Promise<any> {
		throw new Error('Method not implemented.');
	}

	search(search: string): Promise<any> {
		throw new Error('Method not implemented.');
	}

	async findAll(search: TEmployeeSearch, page: number = 1, pageSize: number = 100): Promise<ResponseAll<TEmployeeDB>> {
		const skip = (page - 1) * pageSize;
		const take = pageSize;
		const employee = await prisma.employees.findMany(
			{
				include: {
					languages: true,
					projects: true,
					skills: true,
					certifications: true,
				},
				skip,
				take,
				where: {
					AND: [
						{
							...(search.name ? { name: { contains: search.name, } } : {}),
							...(search.status ? { status: { contains: search.status, } } : {}),
						}
					],
				}
			}
		);
		return { data: employee, page, pageSize };
	}

	async findById(id: string) {
		return prisma.employees.findUnique({
			where: { id },
			include: {
				languages: true,
				projects: true,
				skills: true,
				certifications: true,
			},
		});
	}

	async createOne({ skills, languages, certifications, projects, ...employees }: EmployeeCreate) {

		return prisma.$transaction(async (tx) => {

			const employeeDB = await tx.employees.create({
				data: { ...employees }
		});

			const skillDB = await tx.skills.createMany({
				data: skills.map(({ text }) => ({
					employeesId: employeeDB.id,
					text,
				})),
			})

			const languageDB = await tx.languages.createMany({
				data: languages.map(({ text }) => ({
					employeesId: employeeDB.id,
					text,
				}))
			})

			const certificationsDB = await tx.certifications.createMany({
				data: certifications.map(({ text }) => ({
					employeesId: employeeDB.id,
					text,
				}))
			})

			const projectDB = await tx.projects.createMany({
				data: projects.map(({ text }) => ({
					employeesId: employeeDB.id,
					text
				}))
			})

			return { employeeDB, skillDB, languageDB, certificationsDB, projectDB };
		})
	}

	async updateOne({ skills, languages, certifications, projects, ...employees }: EmployeeCreate, id: string) {

		return prisma.$transaction(async (tx) => {

			await tx.skills.deleteMany({ where: { employeesId: id } })
			await tx.languages.deleteMany({ where: { employeesId: id } })
			await tx.certifications.deleteMany({ where: { employeesId: id } })
			await tx.projects.deleteMany({ where: { employeesId: id } })

			const employeeDB = await tx.employees.update({
				where: { id },
				data: { ...employees }
			});

			const skillDB = await tx.skills.createMany({
				data: skills.map(({ text }) => ({
					employeesId: employeeDB.id,
					text,
				})),
			})

			const languageDB = await tx.languages.createMany({
				data: languages.map(({ text }) => ({
					employeesId: employeeDB.id,
					text,
				}))
			})

			const certificationsDB = await tx.certifications.createMany({
				data: certifications.map(({ text }) => ({
					employeesId: employeeDB.id,
					text,
				}))
			})

			const projectDB = await tx.projects.createMany({
				data: projects.map(({ text }) => ({
					employeesId: employeeDB.id,
					text
				}))
			})

			return { employeeDB, skillDB, languageDB, certificationsDB, projectDB };
		})

	}

	async deleteOne(id: string) {
		return prisma.$transaction(async (tx) => {

			const employeeExist = await tx.employees.findUnique({ where: { id }, select: { id: true } });
			if (!employeeExist) {
				throw new Error(`Employee by id ${ id } is not exist `)

			}
			const employeeDB = await tx.employees.delete({ where: { id } });
			const skillDB = await tx.skills.deleteMany({ where: { employeesId: employeeDB.id } })
			const languageDB = await tx.languages.deleteMany({ where: { employeesId: employeeDB.id } })
			const certificationsDB = await tx.certifications.deleteMany({ where: { employeesId: employeeDB.id } })
			const projectDB = await tx.projects.deleteMany({ where: { employeesId: employeeDB.id } })

			return { employeeDB, skillDB, languageDB, certificationsDB, projectDB };
		})
	}

	setOne(d: (EmployeeCreateZod) & { id?: string }) {
		return {}
	}

	setMany(data: EmployeeCreateZod []) {
		return data.map((d) => (this.setOne(d)))
	}

	async createMany(data: EmployeeCreateZod[]) {
	}

	async updateMany(data: EmployeeCreateZod[], id: string) {
	}

	async deleteMany(id: string) {
		return prisma.employees.deleteMany({ where: { id } })

	}

}
