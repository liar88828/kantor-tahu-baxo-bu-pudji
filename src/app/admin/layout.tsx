import { ReactNode } from "react";
import AdminLayout from "@/app/components/Layout/AdminLayout";
import { getSession } from "@/server/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Admin Dashboard',
}

export default async function Layout({ children, }: { children: ReactNode }) {
	const session = await getSession()
	// console.log(session)
	const isLogin = !!session
	return (
		<AdminLayout isLogin={ isLogin }>
			{ children }
		</AdminLayout>
	)

}
