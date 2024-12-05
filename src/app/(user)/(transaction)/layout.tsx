'use client'
import type {ReactNode} from "react";
import {ChevronLeft, TicketIcon} from 'lucide-react';
import {useRouter} from "next/navigation";


export default function Layout({children}: { children: ReactNode, }) {
	const router = useRouter()
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
					<div className="btn btn-square">
						<TicketIcon/>
					</div>
				</div>
			</div>
			<div className="container pt-20 ">
				{children}
			</div>
		</>

	)
}
