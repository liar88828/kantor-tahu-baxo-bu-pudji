import React from 'react';
import { TContext } from "@/interface/server/param";
import { getSearchName } from "@/utils/requestHelper";
import { employeeAll } from "@/network/employee";
import { EmployeeSearch, EmployeeTable } from "@/app/admin/employee/EmployeeTable.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { EMPLOYEE_KEY } from "@/hook/useEmployee";

export const dynamic = 'force-dynamic';

export default async function page(context: TContext) {
    const search = await getSearchName(context, 'search') ?? ''
    const status = await getSearchName(context, 'status') ?? ''

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [ EMPLOYEE_KEY.employees, search ],
        queryFn: () => employeeAll({
            filter: { name: search, status },
            pagination: {}
        }),
    })

    return (
        <EmployeeSearch>
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <EmployeeTable/>
            </HydrationBoundary>
        </EmployeeSearch>
    );
}

