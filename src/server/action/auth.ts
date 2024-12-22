'use server'
import { prisma } from "@/config/prisma";
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation";
import { createSession } from "@/app/lib/state";
import { FormState, SignInFormSchema, SignupFormSchema } from "@/validation/auth.valid";

export async function signUp(state: FormState, formData: FormData) {
	// Validate form fields
	const validatedFields = SignupFormSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
	})

	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	// Call the provider or db to create a user...
	// 2. Prepare data for insertion into database
	const { name, email, password } = validatedFields.data
	// e.g. Hash the user's password before storing it
	const hashedPassword = await bcrypt.hash(password, 10)

	// 3. Insert the user into the database or call an Auth Library's API
	const user = await prisma.users.create({
			data: {
				name,
				email,
				viewer: 'ADMIN',
				password: hashedPassword,
			}
		}
	)

	if (!user) {
		return {
			message: 'An error occurred while creating your account.',

		}
	}

	// 4. Create user session
	await createSession(user.id)
	// 5. Redirect user
	redirect('/profile')
}

export async function signIn(state: FormState, formData: FormData) {
	try {

		// Validate form fields
		const validatedFields = SignInFormSchema.safeParse({
			email: formData.get('email'),
			password: formData.get('password'),
		})

		// If any form fields are invalid, return early
		if (!validatedFields.success) {
			return {
				errors: validatedFields.error.flatten().fieldErrors,
			}
		}

		const { email, password } = validatedFields.data
		// e.g. Hash the user's password before storing it

		// 3. Insert the user into the database or call an Auth Library's API
		const user = await prisma.users.findFirst({
				where: { email },
			}
		)
		if (!user) {
			return {
				message: 'User already exists!',
			}
		}
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) {
			return {
				message: 'Password is incorrect',
			}
		}
		// 4. Create user session
		await createSession(user.id)
		// 5. Redirect user
		redirect('/profile')

	} catch (e) {
		if (e instanceof Error) {
			return {
				message: e.message,

			}
		}
		return {
			message: 'An error occurred while creating your account.',

		}
	}

}