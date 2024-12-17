import { employeeCreateServer } from "@/validation/employee.valid";

export const sanitizeEmployee = (formData: FormData, imagePath: string) => {
	const form = formData.get('data')?.toString() ?? ''
	const json = JSON.parse(form);
	json.img = imagePath
	return json
}