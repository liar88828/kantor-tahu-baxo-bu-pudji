'use client'
import React from "react";
import { useOtpStore } from "@/store/otp";
import { Countdown } from "@/app/(auth)/otp/countdown";
import useOtpInput from "@/hook/useOtpInput";
import { useRouter } from "next/navigation";
import { useEmail } from "@/hook/useEmail";

export default function Page() {
    const { store, setData } = useOtpStore()
    const { otp, error, success, handleChange, handleKeyDown, handleSubmit } = useOtpInput();
    const route = useRouter()
    const { generateOTP } = useEmail()

    const addOneMinute = () => {
        let myTime = store.time ?? 0
        let moreTime = Date.now() + 62 * 1000
        setData({ time: moreTime })
        generateOTP.mutate({ email: store.email, time: new Date(moreTime) })
    };

    return (
        <div className="flex items-center justify-center pt-20 ">
            <div className=" p-8 rounded shadow-md w-full max-w-sm">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold">OTP Validation</h2>
                    { store.email && (
                        <p className={ '~text-sm/base text-base-content/50' }>
                            Was send this email { store.email }. please check the mail box
                        </p>
                    ) }
                </div>
                <div className="flex items-center flex-col mb-2">
                    <div className="">
                        <Countdown/>
                    </div>
                    <button
                        disabled={ store.remainingTime > 0 }
                        className="btn btn-sm"
                        onClick={ addOneMinute }
                    >
                        Send email : { store.email }
                    </button>
                </div>
                <form onSubmit={ handleSubmit }>
                    <div className="flex justify-between mb-4">
                        { otp.map((digit, index) => (
                            <input
                                key={ index }
                                id={ `otp-${ index }` }
                                type="text"
                                value={ digit }
                                onChange={ (e) => handleChange(e.target.value, index) }
                                onKeyDown={ (e) => handleKeyDown(e, index) }
                                maxLength={ 1 }
                                className="w-12 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )) }
                    </div>
                    { error && <p className="text-red-500 text-sm mb-4">{ error }</p> }
                    { success && <p className="text-green-500 text-sm mb-4">{ success }</p> }
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Validate OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

