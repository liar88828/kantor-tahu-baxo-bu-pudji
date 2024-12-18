import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { getId, getParams } from "@/utils/requestHelper"
import { UUIDSchema } from "@/validation/id.valid"
import EmployeeRepository from "@/server/repository/employee.repo";
import { pathImage, saveImage } from "@/server/repository/image.repo";
import { sanitizeEmployee } from "@/sanitize/employe.sanitize";
import { employeeCreateServer } from "@/validation/employee.valid";

export default class EmployeeController
	implements InterfaceController {
	constructor(private employeeRepository: EmployeeRepository) {

	}

	async findAll(request: NextRequest, __: TContext): Promise<any> {
		return this.employeeRepository.findAll({
				filter: {
					name: getParams(request, "name") ?? '',
					status: getParams(request, "status") ?? '',
				}, pagination: {
					page: Number(getParams(request, "page") ?? '1'),
				}
			}
		)
	}

	async findById(_: NextRequest, context: TContext) {
		const id = await getId(context)
		return this.employeeRepository.findById(UUIDSchema.parse(id))
	}

	async findPhotoById(_: NextRequest, context: TContext) {
		const id = await getId(context)
		return this.employeeRepository.findById(UUIDSchema.parse(id))
	}


	async createOne(request: NextRequest, __: TContext) {

			// Parse the incoming form data
			const formData = await request.formData();

		// Save the image path to the database
			const filePath = await pathImage(formData)
		// console.log(filePath)
		const data = sanitizeEmployee(formData, filePath)
		const response = await this.employeeRepository.createOne(
			employeeCreateServer.parse(data)
		)

			if (response) {
				await saveImage(formData, filePath)
			}
			return response
	}

	async updateOne(request: NextRequest, context: TContext) {
		// const json = await getJson(request)
		// const id = await getId(context)
		// return this.employeeRepository.updateOne(
		// 	employeeCreateZod.parse(json),
		// 	UUIDSchema.parse(id)
		// )
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
