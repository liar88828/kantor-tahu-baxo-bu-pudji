import React from 'react';
import { employeeId } from "@/network/employee";
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/requestHelper";
import { EmployeeCV } from "@/app/admin/employee/cv";

export default async function Page(context: TContext) {
	const id = await getId(context);
	const employee = await employeeId(id)
	return (
		<EmployeeCV employee={ employee.data }/>
	);
}
