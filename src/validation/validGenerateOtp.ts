import { z } from "zod";
import { OTPGenerate, OTPValid } from "@/interface/server/param";

export const validGenerateOtp: z.ZodType<OTPGenerate> = z.object({
    email: z.string().email(),
    time: z.coerce.date(),

})

export const validOtp: z.ZodType<OTPValid> = z.object({
    email: z.string().email(),
    otp: z.string().min(6,).max(6),
})