// Zod schema for validation
import { z } from "zod";
import { zImage } from "@/validation/image";
import { Employees } from "@prisma/client";

export type EmployeeCreate = Omit<Employees, 'updatedAt' | 'createdAt' | 'id' | 'managerId'>;

export const employeeSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	phone: z.string(),
	gender: z.enum([ "Male", "Female" ]),
	dateOfBirth: z.coerce.date(),
	hireDate: z.coerce.date(),
	jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
	department: z.string(),
	salary: z.number().min(0, "Salary must be a positive number"),
	managerId: z.number().optional(),
	status: z.enum([ "Active", "Inactive" ]).default("Active"),
	address: z.string(),
	city: z.string(),
	postalCode: z.string(),
	employmentType: z.enum([ "Full-Time", "Part-Time" ]),
	notes: z.string(),
	img: zImage,
});

export const employeeCreate: z.ZodType<EmployeeCreate> = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	phone: z.string(),
	gender: z.enum([ "Male", "Female" ]),
	dateOfBirth: z.coerce.date(),
	hireDate: z.coerce.date(),
	jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
	department: z.string(),
	salary: z.number().min(0, "Salary must be a positive number"),
	// status: z.enum(["Active", "Inactive"]).default("Active"),
	status: z.string(),
	address: z.string(),
	city: z.string(),
	postalCode: z.string(),
	employmentType: z.enum([ "Full-Time", "Part-Time" ]),
	notes: z.string(),
	img: z.string(),
});

export type EmployeeSchema = z.infer<typeof employeeCreate>;

