'use client';

import { signIn } from "@/server/action/auth";
import { useActionState } from "react";
import Link from "next/link";

export default function SignupForm() {
	const [ state, action, pending ] = useActionState(signIn, undefined);

	return (
		<div className="card card-bordered bg-base-100 lg:mx-60">
			<form action={ action } className="card-body">
				<h2 className="card-title">Sign In</h2>
				{/* Name Input */ }


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


