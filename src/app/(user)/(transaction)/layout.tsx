'use client'
import type { ReactNode } from "react";
import { ChevronLeft, DollarSign } from 'lucide-react';
import { useRouter } from "next/navigation";
import { TROLLEY_KEY } from "@/store/useTrolley";
import { useQueryClient } from "@tanstack/react-query";

export default function Layout({children}: { children: ReactNode, }) {
	const queryClient = useQueryClient()
	const router = useRouter()
	const trolleyId = queryClient.getQueryData([ TROLLEY_KEY, 'SELECT' ])


	return (<>
			<div className="navbar bg-base-300 fixed z-50">
				<div className="flex-1 ">
					<button
						onClick={() => router.back()}
						className="btn btn-ghost">
						<ChevronLeft/>
					</button>

				</div>
				<div className="flex-none">
					<div
						onClick={ () => {
							console.log(trolleyId)

						} }
						className="btn btn-square">
						<DollarSign/>
					</div>
				</div>
			</div>
			<div className="container pt-20 ">
				{children}
			</div>
		</>

	)
}
