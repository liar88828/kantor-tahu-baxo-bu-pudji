'use client'
import React from 'react'
import {useTrolley} from "@/store/trolley";
import {Minus, Plus} from "lucide-react";

export default function Page() {
	const trolley = useTrolley(state => state)
	return (
		<div>
			<button
				className={'btn btn-square'}

				onClick={() => trolley.increment('')}>
				<Plus/>
			</button>
			{trolley.trolleys}
			<button
				className={'btn btn-square'}
				onClick={() => trolley.increment('')}>
				<Minus/>
			</button>
		</div>
	)
}
