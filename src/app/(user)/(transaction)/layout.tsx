import type { ReactNode } from "react";
import { HeaderTransactionLayoutUser } from "@/app/components/Layout/user.client";

export default function Layout({ children }: { children: ReactNode, }) {

    return ( <>
            <HeaderTransactionLayoutUser />
            <div className="container pt-20 px-2 space-y-4 pb-5">
                { children }
            </div>
        </>

    )
}
