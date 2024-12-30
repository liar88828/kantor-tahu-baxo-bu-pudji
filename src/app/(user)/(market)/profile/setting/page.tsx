import React from "react";
import { getUser } from "@/server/lib/db";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProfileChangeUser } from "@/app/components/profile/profile.client";

async function Page() {
    const user = await getUser()
    if (!user) return <PageLoadingSpin/>

    return ( <ProfileChangeUser user={ user } /> );
}

export default Page;
