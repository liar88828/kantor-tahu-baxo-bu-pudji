'use client'
import { EmployeeCreateZod } from "@/validation/employee.valid";
import toast from "react-hot-toast";
import { employeeAll, onUpsertData } from "@/network/employee";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { EMPLOYEE } from "@/interface/entity/employee.model";

export function useEmployee() {
    const router = useRouter();

    const onUpsert = async (data: EmployeeCreateZod, method: "POST" | 'PUT', id?: string) => {
        const idToast = toast.loading('Loading...');
        const response = await onUpsertData(method, data, id);
        if (response) {
            toast.success("Employee created");
            router.replace('/admin/employee');
        } else {
            toast.error("Employee Fail Crate");
        }
        toast.dismiss(idToast)
    };

    const GetAll = ({ search, status }: { search: string, status: string }) => {
        return useInfiniteQuery({

            queryKey: [ EMPLOYEE.KEY, search, status ],
            queryFn: ({ pageParam }) => employeeAll({
                filter: { name: search, status },
                pagination: { page: pageParam }
            }),
            initialPageParam: 1, // Starting page number
            getNextPageParam: (lastPage, allPages) => {
                // Determine the next page number
                // console.log(lastPage)
                if (lastPage.data.data.length === 0 || !lastPage.data) {
                    return undefined
                }
                if (typeof lastPage.data.page === "number") {
                    return lastPage.data.page + 1
                }
                return undefined // `nextPage` returned by the backend
            },
        })
    }
    return {
        onUpsert,
        getAll: GetAll
    }
}
