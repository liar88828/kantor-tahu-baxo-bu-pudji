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

				{/* Submit Button */ }
				<div className="card-actions">
					<button
						disabled={ pending }
						type="submit"
						className={ `btn btn-primary w-full ${ pending ? "btn-disabled" : "" }` }
					>
						{ pending ? "Signing Up..." : "Sign Up" }
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


