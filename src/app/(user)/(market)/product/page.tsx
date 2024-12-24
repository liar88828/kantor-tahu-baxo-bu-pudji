'use client'
import React from 'react';
import { ProductFetch, ProductLayout } from "@/app/(user)/(market)/product/productLayout";

export default function Page() {

	return (
		<ProductLayout>
			<ProductFetch/>
		</ProductLayout>
	)
}
