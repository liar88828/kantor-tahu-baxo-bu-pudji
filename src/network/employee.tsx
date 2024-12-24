/* eslint-disable react-hooks/rules-of-hooks */

import { toFetch } from "@/hook/toFetch";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { ResponseAll } from "@/interface/server/param";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { EmployeeCreateZod } from "@/validation/employee.valid";
import { toUrl } from "@/utils/toUrl";
import { ProductParams } from "@/server/repository/product.repo";
import { EmployeeParams } from "@/server/repository/employee.repo";

export const employeeAll = async ({ filter, pagination }: EmployeeParams) => {
	const url = toUrl('employee', { ...filter, ...pagination })
	return toFetch<ResponseAll<TEmployeeDB>>('GET', url)
};

export const employeeId = async (id: string) => {
	return toFetch<TEmployeeDB>('GET', `employee/${ id }`)
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
};

export const employeeUpdate = async (data: EmployeeCreateZod, id: string) => {
	return toFetch<TDeliveryDB>('POST', `employee/${ id }`, data)
};

export const employeeDelete = async (id: string) => {
	return toFetch<TDeliveryDB>('DELETE', `employee/${ id }`)
};
