import React from 'react'
import { getUser } from "@/server/lib/db";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProfileOrderHistoryUser, ProfileUser } from "@/app/components/profile/profile.client";

export default async function page() {
    const user = await getUser()
    if (!user) return <PageLoadingSpin/>
    return (
        <div className="px-5 space-y-5 mb-28">
            <ProfileUser user={ user } />
            <ProfileOrderHistoryUser />
        </div>
    )
}
