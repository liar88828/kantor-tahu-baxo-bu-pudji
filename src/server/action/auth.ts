'use server'
import { prisma } from "@/config/prisma";
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation";
import { createSession } from "@/server/lib/state";
import { FormState, SignInFormSchema, SignupFormSchema } from "@/validation/auth.valid";
import { userRepository } from "@/server/controller";
import { ROLE } from "@/interface/Utils";
import { OTPGenerate } from "@/interface/server/param";
import { generateOtp } from "@/utils/otp";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signUp(state: FormState, formData: FormData) {
	// Validate form fields
	const validatedFields = SignupFormSchema.safeParse({
        address: formData.get('address'),
        email: formData.get('email'),
        name: formData.get('name'),
		password: formData.get('password'),
        phone: formData.get('phone'),
	})

	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	// Call the provider or db to create a user...
	// 2. Prepare data for insertion into database
    const { name, email, password, phone, address } = validatedFields.data
	// e.g. Hash the user's password before storing it
	const hashedPassword = await bcrypt.hash(password, 10)

    const otp = generateOtp({ length: 6 })
	// 3. Insert the user into the database or call an Auth Library's API
    const user = await userRepository.createOne({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        role: ROLE.USER,
    })

	if (!user) {
		return {
			message: 'An error occurred while creating your account.',
		}
	}

	// 4. Create user session
    // await createSession(user.id)
    const sendEmail: OTPGenerate = {
        email: user.email,
        time: new Date(Date.now() + 2 * 60 * 1000)
    };
    await fetch('http://localhost:3000/api/email/otp', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendEmail)
    })

	// 5. Redirect user
    redirect('/otp')
}

export async function signIn(state: FormState, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {

		// Validate form fields
		const validatedFields = SignInFormSchema.safeParse({
            email,
            password,
		})

		// If any form fields are invalid, return early
		if (!validatedFields.success) {
			return {
				errors: validatedFields.error.flatten().fieldErrors,
			}
		}

        const valid = validatedFields.data
		// e.g. Hash the user's password before storing it

		// 3. Insert the user into the database or call an Auth Library's API
        const user = await prisma.users.findFirst(
            { where: { email: valid.email } }
        )

		if (!user) {
            throw new Error('User not exists!')
        }
        console.log(user.isValidate)
        if (user.isValidate === false) {
            // console.log('will redirect to otp')
            // throw new Error('User is not Registered!. please go Otp')
            redirect('/otp')
        }

        const validPassword = await bcrypt.compare(valid.password, user.password)

		if (!validPassword) {
            throw new Error('Password is incorrect')

		}
		// 4. Create user session
        await createSession({
            role: user.role,
            usersId: user.id
        })
		// 5. Redirect user
		redirect('/profile')

	} catch (e) {

        if (isRedirectError(e)) {
            redirect('/otp')
        }

        if (e instanceof Error) {
            return {
                message: e.message,
                // prev: { email, password }
            }
        }
		return {
			message: 'An error occurred while creating your account.',
            // prev: { email, password }

		}
	}

}