import nodemailer from 'nodemailer'
import { OTPValid, ResponseValidOTP } from "@/interface/server/param";
import { validGenerateOtp, validOtp } from "@/validation/validGenerateOtp";
import { NextResponse } from "next/server";
import { createSession } from "@/server/lib/state";
import { prisma } from "@/config/prisma";
import { generateOtp } from "@/utils/otp";
import Zod from "zod";

// generate
export async function POST(request: Request) {
    try {
        const json: OTPValid = await request.json()

        const { time, email, reason } = validGenerateOtp.parse(json)
        const user = await prisma.users.findFirst({ where: { email } })
        if (!user) {
            throw new Error("User doesn't exist")
        }

        // console.log(new Date())
        // console.log(user.otpDate)
        // console.log(user.otpDate < new Date())

        if (user.otpRegenerate > new Date()) {
            throw new Error("Please Wait until OTP date is end ")
        }

        const otp = generateOtp({ length: 6 })
        const otpValid = new Date(Date.now() + 60 * 60 * 1000)// Invalid Date
        // console.log(otpValid)

        if (reason === 'VALID') {
            console.log("VALID")

        await prisma.users.update({
            where: { id: user.id },
            data: {
                otp,
                otpRegenerate: time,
                otpCount: { increment: 1 },
                otpValid,
                isValidate: true,
            }
        })

        } else if (reason === 'RESET') {
            console.log("RESET")
            await prisma.users.update({
                where: { id: user.id },
                data: {
                    otp,
                    otpRegenerate: time,
                    otpCount: { increment: 1 },
                    otpValid,
                    isReset: true
                }
            })
        }

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS,
            },
        });
        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: "🚀 Hello from Nodemailer!",
            text: `Your OTP is: ${ otp }`,
            html: `
        <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
            <h2 style="color: #007BFF;">Hello from Nodemailer! 🎉</h2>
            <p>Here is your OTP:</p>
            <p style="font-size: 1.5rem; font-weight: bold; color: #28a745;">${ otp }</p>
            <p style="font-size: 0.9rem; color: #6c757d;">If you didn't request this email, please ignore it.</p>
        </div>
    `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email: ", error);
            } else {
                console.log("Email sent: ", info.response);
            }
        });

        // const cookieStore = await cookies()
        // cookieStore.set('otpSession',
        //     JSON.stringify({
        //         email: user.email,
        //         otpValid
        //     })
        //     , {
        //         httpOnly: true,
        //         secure: true,
        //         expires: otpValid,
        //         sameSite: 'lax',
        //         path: '/',
        //     })

        return NextResponse.json({ msg: "Success" }, { status: 200 });

    } catch (error) {
        // console.error("Error sending email: ", error)

        if (error instanceof Zod.ZodError) {
            return NextResponse.json(
                {
                    error: error.issues,
                    code: 400,
                },
                { status: 400 }
            )
        }

        if (error instanceof Error) {
            return NextResponse.json({ msg: error.message }, { status: 400 });
        }
        return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
    }

}

//valid
export async function PUT(request: Request): Promise<NextResponse<ResponseValidOTP>> {
    try {
        const json: OTPValid = await request.json()
        console.log(json)
        const { email, otp, reason } = validOtp.parse(json)
        const user = await prisma.users.findFirst({ where: { email } })

        if (!user) {
            throw new Error("User not found")
        }

        if (user.otpValid < new Date()) {
            throw new Error("The Otp Is Expired")
        }


        if (user.otp !== otp) {
            throw new Error("Otp Is Not Match")
        }

        if (reason === 'VALID') {

            await prisma.users.update({
                where: {
                    id: user.id
                },
                data: {
                    otp: null,
                    isValidate: false
                }
            })

            await createSession({
                usersId: user.id,
                role: user.role
            })

        } else if (reason === 'RESET') {

            await prisma.users.update({
                where: {
                    id: user.id
                },
                data: {
                    otp: null,
                    // isReset: false
                }
            })

        }

        return NextResponse.json({
            msg: "Success",
            data: reason
        }, { status: 200 });

    } catch (error) {

        if (error instanceof Zod.ZodError) {
            return NextResponse.json(
                { msg: error.issues },
                { status: 400 }
            )
        }

        if (error instanceof Error) {
            return NextResponse.json({ msg: error.message }, { status: 400 });
        }
        return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
    }

}
