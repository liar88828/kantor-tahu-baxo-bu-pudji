import React from "react";

export function LoadingData() {
    return (
        <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    );
}

export function LoadingDataList() {
    return (
        <div className="grid grid-cols-8 gap-4">
            {/*<div className="flex w-52 flex-col gap-4">*/ }
            <div className="col-span-3">
                <div className="skeleton h-32 w-full"></div>
            </div>
            <div className="col-span-5 space-y-8">
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </div>
    );
}

export function PageLoadingSpin() {
    return (
        <div className={ 'w-full h-1/2 flex justify-center items-center p-5' }>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
}
