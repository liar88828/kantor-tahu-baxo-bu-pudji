'use client'
import { EmployeeCreateZod } from "@/validation/employee.valid";
import toast from "react-hot-toast";
import { employeeAll, employeeCreate } from "@/network/employee";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

export enum EMPLOYEE_KEY {
	employees = "employees",
}

export function useEmployee() {
	const router = useRouter();


// console.log("params", params)
	const onCreate = async (data: EmployeeCreateZod) => {
		const idToast = toast.loading('Loading...');
		const response = await employeeCreate(data)
		if (response) {
			toast.success("Employee created");
			router.push('/admin/employee');
		} else {
			toast.error("Employee Fail Crate");
		}
		toast.dismiss(idToast)
	};
	// const { data } = await employeeAll({ name: search })
	const GetAll = ({ search, status }: { search: string, status: string }) => {

		return useInfiniteQuery({
			queryKey: [ EMPLOYEE_KEY.employees, search, status ],
			queryFn: ({ pageParam }) => employeeAll({ name: search, status, page: pageParam }),
			initialPageParam: 1, // Starting page number
			getNextPageParam: (lastPage, allPages) => {
				// Determine the next page number
				console.log(lastPage)
				if (lastPage.data.data.length === 0 || !lastPage.data) {
					return undefined
				}
				return lastPage.data.page + 1 ?? undefined; // `nextPage` returned by the backend
			},
		})
	}
	return {
		onCreate,
		getAll: GetAll
	}
}
