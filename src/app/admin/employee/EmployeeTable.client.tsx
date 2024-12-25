'use client'
import { toRupiah } from "@/utils/toRupiah";
import Link from "next/link";
import { BookUser, Plus, Search } from "lucide-react";
import React, { Fragment } from "react";
import Form from "next/form";
import { useEmployee } from "@/hook/useEmployee";
import { LoadingSpin } from "@/app/components/LoadingData";
import { useEmployeeStore } from "@/store/employee";
import { useDebounce } from "@/hook/useDebounce";
import { EmptyData } from "@/app/components/ErrorData";
import useInfinityScroll from "@/hook/useInfinityScroll";

export function EmployeeSearch({ children }: { children: React.ReactNode }) {
    const { setFilter, filter } = useEmployeeStore();

    return (
        <>
            <div className="flex justify-between gap-2">
                <Form action={ '/admin/employee' } className="join w-full">
                    <input
                        onChange={ e => setFilter({ name: e.target.value }) }
                        type="text"
                        className={ 'input input-bordered join-item w-full' }
                        name={ 'search' }
                        value={ filter.name }
                    />
                    <select className="select select-bordered join-item w-fit"
                            defaultValue={ '' }
                            onChange={ e => setFilter({ status: e.target.value }) }
                            name={ 'status' }>
                        <option disabled>Filter</option>
                        <option value={ '' }>All</option>
                        <option>Process</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </Form>
                <Link href={ '/admin/employee/create' } className={ 'btn' }>
                    <Plus/>
                </Link>
            </div>
            { children }
        </>

    );
}

export function EmployeeTable() {
    const { filter } = useEmployeeStore();
    const { getAll } = useEmployee()
    const searchDebounced = useDebounce(filter.name, 1000); // 1000ms delay
    const statusDebounced = useDebounce(filter.status, 1000); // 1000ms delay

    const queryResult = getAll({
        search: searchDebounced,
        status: statusDebounced
    })

    const { loadMoreRef, isFetchingNextPage, hasNextPage } = useInfinityScroll({
        queryResult,
    });

    const { data: employees, isLoading, isError } = queryResult;
    if (isLoading || !employees) return <LoadingSpin/>
    if (isError) return <EmptyData page={ 'Employees' }/>

    return <div>
        <div className="overflow-x-auto w-full">

            <table

                className="table table-zebra w-full table-sm">
				{/* Table Head */ }
				<thead>
				<tr>
					{/*<th>ID</th>*/ }
					<th>Name</th>
					<th>Email</th>
					<th className={ 'text-nowrap' }>Phone</th>
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
				{ employees.pages.map(({ data }, i) => (
					<Fragment key={ i }>
                        { data.data.map((employee) => (
								<tr key={ employee.id }>
									{/*<td>{ employee.id }</td>*/ }
									<td>
										<div className="flex">
											{ employee.name }
										</div>
									</td>
									<td>{ employee.email }</td>
									<td className={ 'text-nowrap' }>{ employee.phone || "-" }</td>
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
					</Fragment>
				)) }
				</tbody>
			</table>

		</div>
		{/* Loading Indicator */}
		<div ref={ loadMoreRef } className="text-center p-4">
			{ isFetchingNextPage && <p>Loading more...</p> }
		</div>


		{/* No More Data */ }
		{ !hasNextPage && <p className="text-center mt-4">No more employees to load.</p> }
	</div>

}

