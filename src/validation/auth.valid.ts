import { z } from "zod";
import { zodAddress, zodEmail, zodPassword, zodPhone } from "@/validation/zod.valid";

export type FormState = {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
    message?: string
} | undefined

export const SignupFormSchema = z.object({
    id: z.string().uuid().optional(),
    address: zodAddress,
    confirm: z.string(),
    email: zodEmail,
    name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
    password: zodPassword,
    phone: zodPhone,

})
.refine((data) => data.password === data.confirm,
    {
        message: "Passwords don't match",
        path: [ "confirm" ],
    });

export const SignInFormSchema = z.object({
    email: zodEmail,
    password: zodPassword,
})

export const ForgetFormSchema = z.object({
    email: zodEmail,
})

export const ResetFormSchema = z.object({
    confirm: z.string(),
    email: zodEmail,
    password: zodPassword,
})
.refine((data) => data.password === data.confirm,
    {
        message: "Passwords don't match",
        path: [ "confirm" ],
    });