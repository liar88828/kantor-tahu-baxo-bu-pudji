import Link from "next/link";
import React from "react";
import { Ban, BookMarked, LogOut, LucideClock, Settings } from "lucide-react";
import { Users } from "@prisma/client";
import { logout } from "@/server/lib/state";
import { ProfileStatusClient } from "@/app/components/profile/profile.client";

export function ProfileUserPage(props: {

    user: Users
}) {
    return (
        <div className="card card-compact bg-base-300">
            <div className="card-body">
                <div className="justify-between flex">
                    <h2 className="card-title">{ props.user.name }</h2>
                    <div className=" flex gap-5 items-center">
                        <Link href={ "/profile/setting" } className="btn  btn-square btn-sm ">
                            <Settings />
                        </Link>

                        <form action={ logout }>
                            <button className="btn  btn-square btn-sm btn-error">
                                <LogOut />
                            </button>
                        </form>

                    </div>
                </div>

                <div className="flex gap-2">
                    <p>{ props.user.email }</p>
                    <p>{ props.user.phone }</p>
                </div>
                <div className="pb-2">
                    <p className={ "text-base-content/50 ~text-xs/base" }>
                        { props.user.address }
                    </p>
                </div>
                <div className="flex gap-10 justify-end">
                    {/*is crash at fetching data ???*/ }
                    {/*<ProfileTrolleyCountClientUser />*/ }
                    <ProfileStatusClient statusOrder={ 'Pending' }>
                        <LucideClock />
                    </ProfileStatusClient>
                    <ProfileStatusClient statusOrder={ 'Complete' }>
                        <BookMarked />
                    </ProfileStatusClient>
                    <ProfileStatusClient statusOrder={ 'Fail' }>
                        <Ban />
                    </ProfileStatusClient>
                </div>
            </div>
        </div>
    );
}

export function ProfileStatusCountPage(props: {
    countStatus: number,
    onClick: () => void,
    isStatus: boolean,
    children: React.ReactNode
}) {

    return <div className="indicator">
        <span className="indicator-item badge badge-neutral  indicator-start">
            { props.countStatus }
        </span>
        <button
            onClick={ props.onClick }
            className={ `btn btn-square ${ props.isStatus && "btn-active" }` }
        >
            { props.children }
        </button>
    </div>;
}
