import { ReactNode } from "react";
import AdminLayout from "@/app/components/Layout/AdminLayout";
import { getSession } from "@/app/lib/db";

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
