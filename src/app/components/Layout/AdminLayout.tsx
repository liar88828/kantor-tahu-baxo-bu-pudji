'use client'
import { ReactNode, useState } from "react";
import { BookA, Car, ChevronLeft, CreditCard, HomeIcon, LogOut, LucidePackageSearch, Menu, User, } from 'lucide-react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/lib/state";

export default function AdminLayout({ children, isLogin }: { children: ReactNode, isLogin: boolean }) {
	// console.log(isLogin)
	const path = usePathname()
	const router = useRouter()
	const [ sideMenuIsExpand, setSideMenuIsExpand ] = useState(true);

	const linkPrimary = [
		{
			href: '/admin/home',
			icon: <HomeIcon className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
			label: 'Home',
			add: 'pro'
		},
		{
			href: '/admin/employee',
			icon: <User className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
			label: 'Employee'
		},
	]
	const linkSecondary = [
		{
			href: '/admin/order',
			icon: <BookA className={ 'flex-shrink-0 w-5 h-5  transition duration-75  ' }/>,
			label: 'Order',
			add: 2
		},
		{
			href: '/admin/product',
			icon: <LucidePackageSearch className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
			label: 'Product'
		},
		{
			href: '/admin/delivery',
			icon: <Car className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
			label: 'Delivery'
		},
		{
			href: '/admin/payment',
			icon: <CreditCard className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
			label: 'Payment'
		},
	]
	return (<>
			<div className="navbar bg-base-200/50 fixed ">
				<div className="flex-1">
					<button
						onClick={ () => router.back() }
						className="btn btn-ghost text-xl btn-square sm:hidden">
						<ChevronLeft/>
					</button>

					<button
						className="btn btn-ghost text-xl invisible  sm:visible  btn-square"
						onClick={ () => setSideMenuIsExpand(prevState => !prevState) }>
						<Menu/>
					</button>
				</div>
				<div className="flex-none">
					{ isLogin ? (
						<button
							className="btn btn-square btn-ghost"
							onClick={ async () => {
								await logout()
							} }>
							<LogOut/>
						</button>) : null
					}
				</div>
			</div>
			<div className=" container max-w-full px-2 ">
				<aside
					className={ `fixed top-0 left-0 z-40 ${ sideMenuIsExpand ? ' w-52 -translate-x-full sm:translate-x-0 ' : ' -translate-x-full' } h-screen transition-transform  bg-base-200` }
					aria-label="Sidebar">


					<div className="h-full px-3 py-4 overflow-y-auto ">
						<div className="flex items-center justify-between">
							<div className="avatar">
								<div className="w-24 rounded-full">
									{/* eslint-disable-next-line @next/next/no-img-element */ }
									<img
										alt={ 'avatar' }
										src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
								</div>
							</div>
							<button
								className="btn btn-ghost text-xl btn-square"
								onClick={ () => setSideMenuIsExpand(prevState => !prevState) }>
								<Menu/>
							</button>

						</div>
						<div className="divider"></div>

						<ul className="space-y-2 font-medium">
							{ linkPrimary.map(item => (
								<li key={ item.label }>
									<Link href={ item.href }
										  className={ `flex items-center p-2 rounded  ${ path.includes(item.href) ? "btn-active" : "" }` }>
										{ item.icon }
										<span className="flex-1 ms-3 whitespace-nowrap">{ item.label }</span>
										{ item.add && <span className=" badge-neutral badge">{ item.add }</span> }
									</Link>
								</li>
							)) }
						</ul>
						<div className="divider"></div>
						<ul className="pt-4 mt-4 space-y-2 font-medium ">
							{ linkSecondary.map(item => (
								<li key={ item.label }>
									<Link
										href={ item.href }
										className={ `flex items-center p-2 rounded  ${ path.includes(item.href) ? "btn-active" : "" }` }
									>
										{ item.icon }
										<span className="flex-1 ms-3 whitespace-nowrap">{ item.label }</span>
										{
											item.add && <span className=" badge-neutral badge">{ item.add }</span>
										}
									</Link>
								</li>
							)) }
						</ul>
					</div>
				</aside>

				<div className={ `${ sideMenuIsExpand ? 'sm:ml-52' : 'ml-0' }  transition-transform  sm:px-0   pt-20` }>
					{ children }
				</div>

			</div>
			{
				!path.includes("create")
				&& (
					<div className="btm-nav z-50 sm:hidden bg-base-200/50">
						{ [ ...linkPrimary, ...linkSecondary ].map((item) => (
							<Link
								key={ item.href }
								href={ item.href }
								className={ path.includes(item.href) ? "active" : "" }
							>
								{ item.icon }
								<span className="btm-nav-label text-xs">{ item.label }</span>
							</Link>
						)) }
					</div>)
			}


		</>

	)
}
