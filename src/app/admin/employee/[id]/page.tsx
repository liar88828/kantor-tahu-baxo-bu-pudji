import React from 'react';
import { employeeId } from "@/network/employee";
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/requestHelper";
import { EmployeeCV, PhotoEmployee } from "@/app/admin/employee/cv";

export default async function Page(context: TContext) {
	const id = await getId(context);
	const employee = await employeeId(id)
	return (
		<div className="pb-20 space-y-5">
			<EmployeeCV employee={ employee.data }/>
			<PhotoEmployee employee={ employee.data }/>
		</div>
	);
}
