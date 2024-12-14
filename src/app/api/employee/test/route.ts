import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { getJson, ResponseJson } from "@/lib/requestHelper";
import { employeeCreate } from "@/validation/employee.valid";
import EmployeeRepository from "@/server/repository/employee.repo";

export async function POST(request: NextRequest, context: TContext) {
	const json = await getJson(request);
	console.log(json);
	const { createOne } = new EmployeeRepository()

	return await ResponseJson(
		async () => createOne(employeeCreate.parse(json)),
		"POST",
		"employee"
	)
}
