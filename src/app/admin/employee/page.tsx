import React from 'react';
import { TContext } from "@/interface/server/param";
import { getSearchName } from "@/utils/requestHelper";
import { employeeAll } from "@/network/employee";
import { EmployeeTable } from "@/app/admin/employee/EmployeeTable.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export const dynamic = 'force-dynamic';

export enum EMPLOYEE_KEY {
	employees = "employees",
}
export default async function page(context: TContext) {
	const search = await getSearchName(context, 'search') ?? ''
	const status = await getSearchName(context, 'status') ?? ''

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [ EMPLOYEE_KEY.employees, search ],
		queryFn: () => employeeAll({ name: search,status }),
	})

	return (
		<HydrationBoundary state={ dehydrate(queryClient) }>
			<EmployeeTable />
		</HydrationBoundary>
	);
}

