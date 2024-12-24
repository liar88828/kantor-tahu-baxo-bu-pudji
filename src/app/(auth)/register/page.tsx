'use client';

import { signUp } from "@/server/action/auth";
import { useActionState } from "react";
import Link from "next/link";

export default function SignupForm() {
	const [ state, action, pending ] = useActionState(signUp, undefined);

	return (
		<div className="card card-bordered bg-base-100 lg:mx-60">
			<form action={ action } className="card-body">
				<h2 className="card-title">Sign Up</h2>

				{/* Name Input */ }
				<div className="form-control w-full">
					<label htmlFor="name" className="label">
						<span className="label-text">Name</span>
					</label>
					<input
						id="name"
						name="name"
						placeholder="Enter your name"
						className="input input-bordered w-full"
					/>
					{ state?.errors?.name && (
						<p className="text-red-500 text-sm mt-1">{ state.errors.name }</p>
					) }
				</div>

				{/* Email Input */ }
				<div className="form-control w-full">
					<label htmlFor="email" className="label">
						<span className="label-text">Email</span>
					</label>
					<input
						id="email"
						name="email"
						placeholder="Enter your email"
						className="input input-bordered w-full"
					/>
					{ state?.errors?.email && (
						<p className="text-red-500 text-sm mt-1">{ state.errors.email }</p>
					) }
				</div>

				{/* Password Input */ }
				<div className="form-control w-full">
					<label htmlFor="password" className="label">
						<span className="label-text">Password</span>
					</label>
					<input
						id="password"
						name="password"
						type="password"
						placeholder="Enter your password"
						className="input input-bordered w-full"
					/>
					{ state?.errors?.password && (
						<div className="mt-2 text-red-500 text-sm">
							<p>Password must:</p>
							<ul className="list-disc list-inside">
								{ state.errors.password.map((error) => (
									<li key={ error }>{ error }</li>
								)) }
							</ul>
						</div>
					) }
				</div>

                {/* Phone Input */ }
                <div className="form-control w-full">
                    <label htmlFor="phone" className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="input input-bordered w-full"
                    />
                    { state?.errors?.phone && (
                        <p className="text-red-500 text-sm mt-1">{ state.errors.phone }</p>
                    ) }
                </div>

                {/* Address Input */ }
                <div className="form-control w-full">
                    <label htmlFor="address" className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        placeholder="Enter your address"
                        className="textarea textarea-bordered w-full"
                    />
                    { state?.errors?.address && (
                        <p className="text-red-500 text-sm mt-1">{ state.errors.address }</p>
                    ) }
                </div>

				{/* Submit Button */ }
				<div className="card-actions">
					<button
						disabled={ pending }
						type="submit"
						className={ `btn btn-primary w-full ${ pending ? "btn-disabled" : "" }` }
					>
						{ pending ? "Signing Up..." : "Sign Up" }
					</button>
                    <div>
                        Already have an account?
                        <Link href="/login" className="btn btn-link mx-0.5 px-0.5">
                            Log In
						</Link>
						Now!
					</div>
				</div>
			</form>
		</div>
	);
}
