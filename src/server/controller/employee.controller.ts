import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { getId, getJson, getParams } from "@/lib/requestHelper"
import { UUIDSchema } from "@/validation/id.valid"
import EmployeeRepository from "@/server/repository/employee.repo";
import { employeeCreate, employeeSchema } from "@/validation/employee.valid";
import { pathImage, saveImage } from "@/server/repository/image.repo";

export default class EmployeeController
	implements InterfaceController {
	constructor(private employeeRepository: EmployeeRepository) {

	}

	async findAll(request: NextRequest, __: TContext): Promise<any> {
		return this.employeeRepository.findAll({
			name: getParams(request, "name") ?? '',
		})
	}

	async findById(_: NextRequest, context: TContext) {
		const id = await getId(context)
		return this.employeeRepository.findById(UUIDSchema.parse(id))
	}

	async createOne(request: NextRequest, __: TContext) {

		try {
			// Parse the incoming form data
			const formData = await request.formData();

			// Extract form fields
			const sanitizeEmployee = (formData: FormData, imagePath: string) => {
				return {
					name: formData.get('name')?.toString(),
					email: formData.get('email')?.toString(),
					phone: formData.get('phone')?.toString(),
					gender: formData.get('gender')?.toString(),
					dateOfBirth: formData.get('dateOfBirth')?.toString(),
					hireDate: formData.get('hireDate')?.toString(),
					jobTitle: formData.get('jobTitle')?.toString(),
					department: formData.get('department')?.toString(),
					salary: Number(formData.get('salary')),
					status: formData.get('status')?.toString(),
					address: formData.get('address')?.toString(),
					city: formData.get('city')?.toString(),
					postalCode: formData.get('postalCode')?.toString(),
					employmentType: formData.get('employmentType')?.toString(),
					notes: formData.get('notes')?.toString(),
					img: imagePath
				}
			}

			const filePath = await pathImage(formData)
			const data = sanitizeEmployee(
				formData,
				filePath// Save the image path to the database
			)

			// Save the form data and the image path to the database using Prisma
			const response = await this.employeeRepository.createOne(
				employeeCreate.parse(data),
			)
			if (response) {
				await saveImage(formData, filePath)
			}
			return response

		} catch (error) {
			console.error('Error saving employee:', error);
			return new Response('Error saving employee data', { status: 500 });
		}
	}

	async updateOne(request: NextRequest, context: TContext) {
		const json = await getJson(request)
		const id = await getId(context)
		return this.employeeRepository.updateOne(
			employeeSchema.parse(json),
			UUIDSchema.parse(id)
		)
	}

	async deleteOne(_: NextRequest, context: TContext) {
		const id = await getId(context)
		const res = await this.employeeRepository.deleteOne(UUIDSchema.parse(id))
		// if (res) {
		// 	await fileSystem(res.img)
		// }
		return res
	}
}
export const employeeController = new EmployeeController(
	new EmployeeRepository()
)
