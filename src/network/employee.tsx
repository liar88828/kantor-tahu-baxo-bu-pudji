/* eslint-disable react-hooks/rules-of-hooks */

import { useFetch } from "@/hook/useFetch";
import { TDeliveryDB } from "@/entity/delivery.model";
import { ResponseAll } from "@/interface/server/param";
import { TEmployeeDB, TEmployeeSearch } from "@/entity/employee.model";
import { EmployeeSchema } from "@/validation/employee.valid";

export function setUrl<T extends object>(endPoint: string, params: T): string {
	const url = new URL(`http://xx.com/api/${ endPoint }`);
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
	// console.log('--------')
	// console.log(url)
	// console.log('--------')
	return useFetch<ResponseAll<TEmployeeDB>>('GET', url)
};

export const employeeId = async (id: string) => {
	return useFetch<TEmployeeDB>('GET', `employee/${ id }`)
};

export const employeeCreate = async (data: EmployeeSchema) => {
	try {
		// Create FormData to handle file upload
		const formData = new FormData();

		// Append all fields to FormData
		Object.keys(data).forEach(key => {
			const value = data[key as keyof EmployeeSchema];

			// Special handling for file input
			if (key === 'img' && value instanceof FileList && value.length > 0) {
				formData.append(key, value[0]);
			} else if (value !== undefined && value !== null) {
				formData.append(key, value.toString());
			}
		});

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
};

export const employeeUpdate = async (data: EmployeeSchema, id: string) => {
	return useFetch<TDeliveryDB>('POST', `employee/${ id }`, data)
};

export const employeeDelete = async (id: string) => {
	return useFetch<TDeliveryDB>('DELETE', `employee/${ id }`)
};
