import { EmployeeCreateZod } from "@/validation/employee.valid";
import toast from "react-hot-toast";
import { employeeAll, employeeCreate } from "@/network/employee";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { EMPLOYEE_KEY } from "@/app/admin/employee/page";

export function useEmployee() {
	const router = useRouter();
	const searchParams = useSearchParams()

	const search = searchParams.get('search') ?? ''
	const status = searchParams.get('status') ?? ''

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
	const GetAll = () => {
		return useQuery({
			queryKey: [ EMPLOYEE_KEY.employees, search, status ],
			queryFn: () => employeeAll({ name: search, status }),
		})
	}
	return {
		onCreate,
		getAll: GetAll
	}
}
