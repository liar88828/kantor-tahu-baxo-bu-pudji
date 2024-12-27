'use client'
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { toFetch } from "@/hook/toFetch";
import { useRouter } from "next/navigation";
import { OTPGenerate, OTPValid } from "@/interface/server/param";

export const useEmail = () => {
    const route = useRouter()

    const generateOTP = useMutation({
        onMutate: () => ({
            toast: toast.loading('Is loading')
        }),
        onSettled: (_, __, ___, context) => {
            if (context) {
                toast.dismiss(context.toast)
            }
        },
        onSuccess: (data) => {
            toast.success("Success Validate Otp")
            // route.push('/home')
        },
        onError: (error) => {
            toast.error("Error Validate Otp")
        },
        mutationFn: (data: OTPGenerate) => {
            return toFetch('POST', { url: 'email/otp', data })
        }
    })

    const validOTP = useMutation({
        onMutate: () => ({
            toast: toast.loading('Is loading')
        }),
        onSettled: (_, __, ___, context) => {
            if (context) {
                toast.dismiss(context.toast)
            }
        },
        onSuccess: (data) => {
            toast.success("Success Validate Otp")
            route.push('/home')
        },
        onError: (error) => {
            toast.error("Error Validate Otp")
        },
        mutationFn: (data: OTPValid) => {
            // console.log(data)
            return toFetch('PUT', { url: 'email/otp', data })
        }
    })

    return {
        generateOTP,
        validOTP
    }
}