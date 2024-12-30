'use client'
import type { ReactNode } from "react";
import useTrolleyStore from "@/store/trolley";
import { HeaderTransaction } from "@/app/components/Layout/user.client";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode, }) {
    const path = usePathname()
    const { onSelected } = useTrolleyStore()

    return (<>
            <HeaderTransaction
                path={ path }
                onSelected={ onSelected }
            />
            <div className="container pt-20 px-2 space-y-4 pb-5">
                { children }
            </div>
        </>

    )
}
