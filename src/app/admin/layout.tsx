import { BaseLayoutAdmin } from "@/app/components/Layout/admin.client";
import { Metadata } from "next";
import { ReactNode } from "react";
import { getSession } from "@/server/lib/db";

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Admin Dashboard',
}

export default async function Layout({ children }: { children: ReactNode }) {
	const session = await getSession()
	const isLogin = !!session
	return (
        <BaseLayoutAdmin isLogin={ isLogin }>
			{ children }
        </BaseLayoutAdmin>
	)

}
