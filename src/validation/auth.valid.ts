import { z } from "zod";

export const SignupFormSchema = z.object({
    address: z
	.string()
	.min(2, { message: 'Name must be at least 2 characters long.' })
	.trim(),
	email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
	password: z
	.string()
	.min(8, { message: 'Be at least 8 characters long' })
	.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
	.regex(/[0-9]/, { message: 'Contain at least one number.' })
	// .regex(/[^a-zA-Z0-9]/, {
	// 	message: 'Contain at least one special character.',
	// })
	.trim(),
    phone: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
})

export type FormState =
	| {
	errors?: {
		name?: string[]
		email?: string[]
		password?: string[]
	}
	message?: string
}
	| undefined

export const SignInFormSchema = z.object({

	email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
	password: z
	.string()
	.min(8, { message: 'Be at least 8 characters long' })
	.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
	.regex(/[0-9]/, { message: 'Contain at least one number.' })
	// .regex(/[^a-zA-Z0-9]/, {
	// 	message: 'Contain at least one special character.',
	// })
	.trim(),
})