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

export function LoadingSpin() {
	return (
		<span className="loading loading-spinner loading-lg"></span>
	);
}

