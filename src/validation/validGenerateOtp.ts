import { z } from "zod";
import { OTPGenerate, OTPValid } from "@/interface/server/param";

export const validGenerateOtp: z.ZodType<OTPGenerate> = z.object({
    email: z.string().email(),
    time: z.coerce.date(),
    reason: z.enum([ 'RESET', 'VALID' ]),


})

export const validOtp: z.ZodType<OTPValid> = z.object({
    email: z.string().email(),
    otp: z.string().min(6,).max(6),
    reason: z.enum([ 'RESET', 'VALID' ]),
})