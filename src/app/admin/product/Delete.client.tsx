'use client'
import React from 'react';
import { Trash } from "lucide-react";
import { TProductDB } from "@/entity/product.model";
import toast from "react-hot-toast";
import { productDelete } from "@/network/product";
import { useRouter } from "next/navigation";

export function DeleteProduct({ id }: { id: TProductDB["id"] }) {
	const router = useRouter()

	const onDelete = async (id: string) => {
		const idToast = toast.loading('Delete Data API')
		try {
			await productDelete(id)
			toast.success('Success Delete Data');
			router.refresh()
		} catch (e) {
			if (e instanceof Error) {
				console.error(e.message)
				toast.error(e.message);
			}
			toast.error('something error');

		} finally {
			toast.dismiss(idToast)
		}
	}

	return (
		<button
			onClick={ () => onDelete(id) }
			className=' btn btn-square btn-error btn-sm '>
			<Trash/>
		</button>
	);
}

