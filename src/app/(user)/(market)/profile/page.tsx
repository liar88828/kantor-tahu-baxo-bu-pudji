import React from 'react'
import { getUser } from "@/server/lib/db";
import { LoadingSpin } from "@/app/components/LoadingData";
import { UserProfile } from "@/app/(user)/(market)/profile/profile.client";
import { ProfileServer } from "@/app/(user)/(market)/profile/profile.server";

export default async function page() {
    const user = await getUser()
    if (!user) return <LoadingSpin/>
    return (
        <div className="px-5 space-y-5 mb-28">
            <UserProfile user={ user }/>
            <ProfileServer user={ user }/>
        </div>
    )
}
