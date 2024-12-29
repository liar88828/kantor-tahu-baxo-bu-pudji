'use client'
import type { ReactNode } from "react";
import { ChevronLeft, DollarSign } from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";
import useTrolleyStore from "@/store/trolley";

import { TrolleyCase } from "@/app/components/TrolleyCase";

export default function Layout({children}: { children: ReactNode, }) {
	const router = useRouter()
	const path = usePathname()
	console.log("path", path)
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
					{ path.includes('/trolley') &&
											<div className="dropdown dropdown-end">
												<div tabIndex={ 0 } role="button" className="btn btn-ghost btn-square">
													<div className="indicator">
														<DollarSign/>
														<span
															className="badge badge-sm indicator-item">{ onSelected ? onSelected.length : 0 }</span>
													</div>
												</div>
												<div
													tabIndex={ 0 }
													className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
							{ onSelected.length !== 0
								? <TrolleyCase
									fun={ () => onCheckout() }
									trolleys={ onSelected }
									text={ 'View Checkout' }
								/>
								: <TrolleyCase/> }
												</div>
					</div>
					}
				</div>
			</div>
			<div className="container pt-20 ">
				{ children }
			</div>
		</>

	)
}
