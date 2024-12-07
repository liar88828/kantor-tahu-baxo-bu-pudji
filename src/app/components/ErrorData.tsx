'use client'
import {useRouter} from "next/navigation";
import React from "react";

export function ErrorData({msg = 'Error Load', code = 404,}: { msg?: string, code?: number }) {
	const router = useRouter()
	return (
		<div className="card bg-neutral text-neutral-content w-96">
			<div className="card-body items-center text-center">
				<h2 className="card-title">Error {code}</h2>
				<p>{msg}</p>
				<div className="card-actions justify-end">
					<button onClick={() => router.refresh()} className="btn btn-primary">Reload</button>
					<button onClick={() => router.back()} className="btn btn-ghost">Back</button>
				</div>
			</div>
		</div>
	);
}