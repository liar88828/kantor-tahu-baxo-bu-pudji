'use client';

import { signIn } from "@/server/action/auth";
import { useActionState } from "react";
import Link from "next/link";
import { useOtpStore } from "@/store/otp";

export default function SignupForm() {
    const { store, setData } = useOtpStore()

	const [ state, action, pending ] = useActionState(signIn, undefined);
    // console.log(state);
	return (
		<div className="card card-bordered bg-base-100 lg:mx-60">
			<form action={ action } className="card-body">
				<h2 className="card-title">Sign In</h2>
				{/* Email Input */ }
				<div className="form-control w-full">
					<label htmlFor="email" className="label">
						<span className="label-text">Email</span>
					</label>
					<input
                        onChange={ e => setData({ email: e.target.value }) }
                        value={ store.email }
						id="email"
						name="email"
						placeholder="Enter your email"
						className="input input-bordered w-full"
                        // defaultValue={ state?.prev?.email ??''}
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
                        // defaultValue={ state?.prev?.password ??''}
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
                { state?.message && (
                    <p className="text-red-500 text-sm mt-1">{ state.message }</p>
                ) }
				{/* Submit Button */ }
				<div className="card-actions">
					<button
						disabled={ pending }
						type="submit"
						className={ `btn btn-primary w-full ${ pending ? "btn-disabled" : "" }` }
					>
						{ pending ? "Signing In..." : "Sign In" }
					</button>
					<div className="">
						Dont Have Account Please
						<Link
							href="/register"
							className={ `btn btn-link mx-0.5 px-0.5` }
						>
							Register
						</Link>
						Now!
					</div>
				</div>
			</form>
		</div>
	);
}


