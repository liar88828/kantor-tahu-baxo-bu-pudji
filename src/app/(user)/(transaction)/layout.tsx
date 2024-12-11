'use client'
import type { ReactNode } from "react";
import { ChevronLeft, DollarSign } from 'lucide-react';
import { useRouter } from "next/navigation";
import useTrolleyStore from "@/store/trolley";

export default function Layout({children}: { children: ReactNode, }) {
	const router = useRouter()
	const { onSelected } = useTrolleyStore()
	const onCheckout = () => {
		if (onSelected) {
			router.push('/checkout')
		}
	}

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
					<div className="indicator">
						<span
							className="indicator-item badge badge-primary indicator-bottom indicator-start ">{ onSelected ? onSelected.length : 0 }</span>
						<button
							onClick={ onCheckout }
							className="btn btn-square">
							<DollarSign/>
						</button>
					</div>
				</div>
			</div>
			<div className="container pt-20 ">
				{ children }
			</div>
		</>

	)
}
