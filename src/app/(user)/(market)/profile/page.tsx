import React, { Suspense } from 'react'
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProfilePageServerUser } from "@/app/components/profile/profile.server";
import { ProfileOrderHistoryUser } from "@/app/components/profile/profile.client";

export default async function page() {
    return (
        <div className="px-5 space-y-5 mb-28">
            <Suspense fallback={ <PageLoadingSpin /> }>
                <ProfilePageServerUser />
                <Suspense fallback={ <PageLoadingSpin /> }>
                    <ProfileOrderHistoryUser />
                </Suspense>
            </Suspense>
        </div>
    )
}
