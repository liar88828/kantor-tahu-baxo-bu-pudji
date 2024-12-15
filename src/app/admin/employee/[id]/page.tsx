import React from 'react';
import { Employees } from "@prisma/client";
import { toDate } from "@/utils/formatDate";
import { employeeId } from "@/network/employee";
import { TContext } from "@/interface/server/param";
import { getId } from "@/lib/requestHelper";
import { EmployeeCV } from "@/app/admin/employee/cv";

export default async function Page(context: TContext) {
	const id = await getId(context);
	const employee = await employeeId(id)
	console.log(employee)
	return (
		<EmployeeCV employee={ employee.data }/>
	);
}

export function EmployeeDetail({ employee }: { employee?: Employees }) {

	if (!employee) {
		return <p>Employee not found.</p>;
	}

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-4">{ employee.name }</h1>
			{ employee.img && (
				<img
					src={ employee.img }
					alt={ `${ employee.name }'s photo` }
					className="w-48 h-48 object-cover rounded mb-4"
				/>
			) }
			<div className="grid grid-cols-2 gap-4">
				<div>
					<p><strong>Email:</strong> { employee.email }</p>
					<p><strong>Phone:</strong> { employee.phone || "N/A" }</p>
					<p><strong>Gender:</strong> { employee.gender || "N/A" }</p>
					<p><strong>Date of Birth:</strong> { toDate(employee.dateOfBirth ?? 0) || "N/A" }</p>
					<p><strong>Hire Date:</strong> { toDate(employee.hireDate) }</p>
					<p><strong>Job Title:</strong> { employee.jobTitle }</p>
					<p><strong>Department:</strong> { employee.department || "N/A" }</p>
				</div>
				<div>
					<p><strong>Salary:</strong> ${ employee.salary.toFixed(2) }</p>
					<p><strong>Employment Type:</strong> { employee.employmentType }</p>
					<p><strong>Status:</strong> { employee.status }</p>
					<p><strong>Address:</strong> { employee.address || "N/A" }</p>
					<p><strong>City:</strong> { employee.city || "N/A" }</p>
					<p><strong>Postal Code:</strong> { employee.postalCode || "N/A" }</p>
					<p><strong>Notes:</strong> { employee.notes || "N/A" }</p>
				</div>
			</div>
		</div>
	);
}

