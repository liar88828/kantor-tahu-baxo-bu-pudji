'use client'
import type { ReactNode } from "react";
import { ChevronLeft, DollarSign } from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";
import useTrolleyStore from "@/store/trolley";
import { CheckoutCase } from "@/app/(user)/trolley.client";

export default function Layout({children}: { children: ReactNode, }) {
	const router = useRouter()
	const path = usePathname()
	const { onSelected } = useTrolleyStore()

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
                    { path.includes('/trolley') && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={ 0 } role="button" className="btn btn-ghost btn-square">
                                <div className="indicator">
                                    <DollarSign/>
                                    <span className="badge badge-sm indicator-item">
                                        { onSelected.length }
                                    </span>
                                </div>
                            </div>
                            <div
                                tabIndex={ 0 }
                                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                                { <CheckoutCase/> }
                            </div>
                        </div>
                    ) }
				</div>
			</div>
            <div className="container pt-20 px-2 space-y-4 pb-5">
				{ children }
			</div>
		</>

	)
}
