import type { ReactNode } from "react";
import { NavbarUser, NavButtonUser } from "@/app/components/Layout/user.client";

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <NavbarUser />
            <div className="container pt-20 ">
                { children }
            </div>
            <NavButtonUser />
        </>

    )
}
