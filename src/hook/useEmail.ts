'use client'
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { toFetch } from "@/hook/toFetch";
import { useRouter } from "next/navigation";
import { OTPGenerate, OTPValid, ResponseValidOTP } from "@/interface/server/param";

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
            console.log(data)
        },
        onError: (error) => {
            toast.error("Error Validate Otp")
        },
        mutationFn: (data: OTPGenerate) => {
            return toFetch<OTPValid>('POST', { url: 'email/otp', data })
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
        onSuccess: ({ data }, variables) => {
            toast.success("Success Validate Otp")
            console.log(data === 'RESET')
            if (data === 'VALID') {
                // console.log('valid')
                route.push('/home')
            }
            if (data === 'RESET') {
                console.log('reset')
                route.push('/reset')
            }
        },
        onError: (error) => {
            toast.error("Error Validate Otp")
        },
        mutationFn: (data: OTPValid) => {
            // console.log(data)
            return toFetch<ResponseValidOTP['data']>('PUT', { url: 'email/otp', data })
        }
    })

    return {
        generateOTP,
        validOTP
    }
}