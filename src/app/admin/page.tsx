import React from 'react'
import { redirect } from "next/navigation";

export default async function page() {
	redirect('/admin/home')
	return <h1>hello</h1>

}
