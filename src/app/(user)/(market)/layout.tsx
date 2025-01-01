import React, { ReactNode } from "react";
import { NavbarMarketLayoutClientUser, NavButtonMarketLayoutClientUser } from "@/app/components/Layout/user.client";
import { TrolleyCase } from "@/app/components/trolley/trolley.client";

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <NavbarMarketLayoutClientUser>
                <TrolleyCase />
            </NavbarMarketLayoutClientUser>
            <div className="container pt-20 ">
                { children }
            </div>
            <NavButtonMarketLayoutClientUser />
        </>
    )
}
