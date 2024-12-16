'use client'
import { toRupiah } from "@/utils/toRupiah";
import Link from "next/link";
import { BookUser, Plus, Search } from "lucide-react";
import React from "react";
import Form from "next/form";
import { useEmployee } from "@/hook/useEmployee";
import { EmptyData } from "@/app/components/ErrorData";
import { LoadingSpin } from "@/app/components/LoadingData";

export function EmployeeTable(
	// {search}: {search:string}
) {

	const { getAll } = useEmployee()
	const { data: employees, isLoading } = getAll()
	return (<div>

			<div className="flex justify-between gap-2">

				<Form action={ '/admin/employee' } className="join w-full">
					<input type="text"
						   className={ 'input input-bordered join-item w-full' }
						   name={ 'search' }
					/>
					<select className="select select-bordered join-item"
							defaultValue={ '' }
							name={ 'status' }>
						<option disabled>Filter</option>
						<option value={''}>All</option>
						<option>Process</option>
						<option>Active</option>
						<option>Inactive</option>
					</select>
					<button className={ 'btn btn-neutral join-item' }>
						<Search/>
					</button>

				</Form>
				<Link href={ '/admin/employee/create' } className={ 'btn' }>
					<Plus/>
				</Link>
			</div>

			{ !employees
				? <EmptyData page={ 'Employees' }/>
				: isLoading
					? <LoadingSpin/>
					: <div className="overflow-x-auto w-full">
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
							{ employees.data.data.map((employee) => (
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
									<td>{ toRupiah(employee.salary) }</td>
									<td>{ employee.employmentType }</td>
									<td><p className={ `badge ${
										employee.status === "Active" ? "badge-success" : "badge-error"
									}` }>
										{ employee.status }
									</p></td>
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
			}

		</div>
	);
}