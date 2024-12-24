'use client'
import type { ReactNode } from "react";
import { ChevronLeft, HomeIcon, LucidePackageSearch, ShoppingCart, UserIcon } from 'lucide-react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TrolleyCase, TrolleyCount } from "@/app/(user)/(market)/trolley.client";

export default function Layout({ children }: { children: ReactNode }) {
	const router = useRouter()
	const path = usePathname()

	return (<>
			<div className="navbar bg-base-300 fixed z-50">
				<div className="flex-1">
					<button
						onClick={ () => router.back() }
						className="btn btn-ghost text-xl">
						<ChevronLeft/>
					</button>
				</div>
				<div className="flex-none">
					<div className="dropdown dropdown-end">
						<div tabIndex={ 0 } role="button" className="btn btn-ghost btn-circle">
							<div className="indicator">
								<ShoppingCart/>
                                <TrolleyCount/>
							</div>
						</div>
						<div
							tabIndex={ 0 }
							className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                            <TrolleyCase/>
						</div>
					</div>
				</div>
			</div>
			<div className="container pt-20 ">
				{ children }
			</div>
			<div className="btm-nav z-50">
				<Link href={ '/home' }
					  className={ path === '/home' ? "active" : "" }>
					<HomeIcon/>
					<span className="btm-nav-label">Home</span>
				</Link>

				<Link href={ '/product' }
					  className={ path === '/product' ? "active" : "" }>
					<LucidePackageSearch/>
					<span className="btm-nav-label">Product</span>
				</Link>

				<Link href={ '/profile' }
					  className={ path === '/profile' ? "active" : "" }>
					<UserIcon/>
					<span className="btm-nav-label">Profile</span>
				</Link>

			</div>
		</>

	)
}
