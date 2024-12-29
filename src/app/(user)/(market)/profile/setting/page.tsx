import React from "react";
import { getUser } from "@/server/lib/db";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ChangeProfile } from "@/app/(user)/(market)/profile/profile.client";

async function Page() {
    const user = await getUser()
    if (!user) return <PageLoadingSpin/>

    return (<ChangeProfile user={ user }/>);
}

export default Page;
