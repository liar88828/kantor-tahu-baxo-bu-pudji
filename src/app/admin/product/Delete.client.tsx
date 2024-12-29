'use client'
import React from 'react';
import { Trash } from "lucide-react";
import { TProductDB } from "@/interface/entity/product.model";
import { useProduct } from "@/hook/useProduct";

export function DeleteProduct({ id }: { id: TProductDB["id"] }) {
	const { onDelete } = useProduct()

	return (
		<button
			onClick={ () => onDelete(id) }
			className=' btn btn-square btn-error btn-sm '>
			<Trash/>
		</button>
	);
}

