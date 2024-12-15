/* eslint-disable react-hooks/rules-of-hooks */

import { useFetch } from "@/hook/useFetch";
import { TDeliveryDB } from "@/entity/delivery.model";
import { ResponseAll } from "@/interface/server/param";
import { TEmployeeDB, TEmployeeSearch } from "@/entity/employee.model";
import { EmployeeCreateZod } from "@/validation/employee.valid";

export function setUrl<T extends object>(endPoint: string, params: T): string {
	const url = new URL(`https://xx.com/api/${ endPoint }`);
	const searchParams = new URLSearchParams();

	// Loop through the keys of the params object
	Object.keys(params).forEach((key) => {
		const value = params[key as keyof typeof params];//why error
		// Otherwise, append the key-value pair
		searchParams.append(key, value);
	});

	// Set the query parameters to the URL
	url.search = searchParams.toString();

	return url.toString().split('/').pop() || ''; // Return the full URL with query parameters
}

export const employeeAll = async (params: TEmployeeSearch) => {

	const url = setUrl('employee', params)

	return useFetch<ResponseAll<TEmployeeDB>>('GET', url)
};

export const employeeId = async (id: string) => {
	return useFetch<TEmployeeDB>('GET', `employee/${ id }`)
};

export const employeeCreate = async ({ img, ...data }: EmployeeCreateZod) => {
	try {
		const formData = new FormData();

		formData.append('file', img[0]);
		formData.append('data', JSON.stringify(data));

		const response = await fetch('/api/employee', {
			method: 'POST',
			body: formData, // Send as FormData
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.log(errorData)
			throw new Error(errorData || 'Failed to create employee');
		}

		// Optionally redirect or show success message
		// router.push('/employees'); // Redirect to employees list
		return response.json();
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
		return false
	}
	return true
};

export const employeeUpdate = async (data: EmployeeCreateZod, id: string) => {
	return useFetch<TDeliveryDB>('POST', `employee/${ id }`, data)
};

export const employeeDelete = async (id: string) => {
	return useFetch<TDeliveryDB>('DELETE', `employee/${ id }`)
};
