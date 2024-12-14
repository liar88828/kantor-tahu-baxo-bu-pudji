import React from 'react';
import { TEmployeeDB } from "@/entity/employee.model";
import { BookUser, Plus, Search } from "lucide-react";
import Form from "next/form";
import { TContext } from "@/interface/server/param";
import { getSearchName } from "@/lib/requestHelper";
import { employeeAll } from "@/network/employee";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function page(context: TContext) {
	const search = await getSearchName(context, 'search')
	// console.log(search);
	const { data } = await employeeAll({ name: search })
	return (<div>
			<div className="flex justify-between gap-2">
				<Form action={ '/admin/employee' } className="join w-full">
					<input type="text" className={ 'input input-bordered join-item w-full' } name={ 'search' }/>
					<button className={ 'btn btn-neutral join-item' }>
						<Search/>
					</button>
				</Form>
				<Link href={ '/admin/employee/create' } className={ 'btn' }>
					<Plus/>
				</Link>
			</div>
			<EmployeeTable employees={ data.data }/>
		</div>
	);
}

export function EmployeeTable(props: { employees: TEmployeeDB[] }) {
	let { employees } = props;
	return (
		<div className="overflow-x-auto w-full">
			<table className="table table-zebra w-full">
				{/* Table Head */ }
				<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Gender</th>
					<th>Hire Date</th>
					<th>Job Title</th>
					<th>Department</th>
					<th>Salary</th>
					<th>Employment Type</th>
					<th>Status</th>
					<th>Action</th>
				</tr>
				</thead>

				{/* Table Body */ }
				<tbody>
				{ employees.map((employee) => (
					<tr key={ employee.id }>
						<td>{ employee.id }</td>
						<td>
							<div className="flex">
								{ employee.name }
							</div>
						</td>
						<td>{ employee.email }</td>
						<td>{ employee.phone || "-" }</td>
						<td>{ employee.gender || "-" }</td>
						<td>{ new Date(employee.hireDate).toLocaleDateString() }</td>
						<td>{ employee.jobTitle }</td>
						<td>{ employee.department || "-" }</td>
						<td>${ employee.salary.toFixed(2) }</td>
						<td>{ employee.employmentType }</td>
						<td>
                <span
					className={ `badge ${
						employee.status === "Active" ? "badge-success" : "badge-error"
					}` }
				>
                  { employee.status }
                </span>
						</td>
						<td>
							<Link
								href={ `/admin/employee/${ employee.id }` }
								className={ 'btn btn-sm btn-info btn-square' }>
								<BookUser/>
							</Link>
						</td>

					</tr>
				)) }
				</tbody>
			</table>
		</div>
	);
}

