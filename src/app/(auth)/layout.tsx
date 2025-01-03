import { ReactNode } from "react";
import { getSession } from "@/server/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Auth',
    description: 'Authenticated create next ',
}

export default async function Layout({ children, }: { children: ReactNode }) {
	const session = await getSession()

	if (session) {
		redirect('/admin')
	}

	return <>
		<div className="navbar bg-base-200/50 fixed ">
			<div className="flex-1">
				<Link
					href={ '/' }
					className="btn btn-ghost text-xl btn-square ">
					<ChevronLeftIcon/>
				</Link>

			</div>
			<div className="flex-none">

			</div>
		</div>
        <div className={ `container pt-20  justify-center w-full flex` }>
			{ children }
        </div>
	</>
}
