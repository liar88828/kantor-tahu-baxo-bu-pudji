import React from 'react';
import { EmployeeSearchClientAdmin, EmployeeTableClientAdmin } from "@/app/components/employee/employee.client";
import { TContext } from "@/interface/server/param";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { employeeAll } from "@/network/employee";
import { getSearchName } from "@/utils/requestHelper";
import { EMPLOYEE_KEY } from "@/interface/entity/employee.model";

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
        <EmployeeSearchClientAdmin>
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <EmployeeTableClientAdmin />
            </HydrationBoundary>
        </EmployeeSearchClientAdmin>
    );
}
