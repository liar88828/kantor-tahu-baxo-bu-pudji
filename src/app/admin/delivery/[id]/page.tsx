import React from 'react'
import { productId } from "@/network/product";
import { ErrorData } from "@/app/components/ErrorData";
import { TContext } from "@/interface/server/param";
import { getId } from "@/lib/requestHelper";
import { toRupiah } from "@/utils/toRupiah";
import { toDate } from "@/utils/formatDate";
import { repeat } from "@/utils/repeat";

export default async function ProductDetail(context: TContext) {
	const id = await getId(context)
	const {data: product} = await productId(id)

	// const router = useRouter()
	//
	// const onDelete = async (id: string) => {
	// 	const idToast = toast.loading('Delete Data API')
	// 	try {
	// 		await productDelete(id)
	// 		toast.success('Success Delete Data');
	// 		router.refresh()
	// 	} catch (e) {
	// 		if (e instanceof Error) {
	// 			console.error(e.message)
	// 			toast.error(e.message);
	// 		}
	// 		toast.error('something error');
	//
	// 	} finally {
	// 		toast.dismiss(idToast)
	// 	}
	// }

	return (
		<div className='p-3 my-4 '>
			{
				!product
					? <ErrorData code={404} msg={'Data Payment is Empty'}/>
					: <div className="card card-bordered card-compact bg-base-200">
						<div className="card-body">

							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="https://picsum.photos/200/300?random=1"
								alt={product.name}
								className="w-full h-48 object-cover rounded"
							/>
							<div className="grid grid-cols-2 p-2">

								<div className="">
									<h2 className="font-bold text-xl mb-2">{product.name}</h2>
									<p className="text-gray-700 text-sm mb-2">{product.desc}</p>
									<p className="text-gray-600 text-sm">
										<strong>Type:</strong> {product.type}
									</p>
									<p className="text-gray-600 text-sm">
										<strong>Location:</strong> {product.location}
									</p>
								</div>

								<div className="  ">
									<p className="text-gray-200 font-bold text-lg mb-2">
										{ toRupiah(product.price) }
									</p>
									<p className="text-gray-600 text-sm">
										<strong>Stock:</strong> {product.qty} units
									</p>
									<p className="text-gray-500 text-sm">
										<strong>Last Updated:</strong> { toDate(product.updated_at) }
									</p>
								</div>
							</div>
						</div>
					</div>
			}

			<div className="mt-2 pb-14">
				<h1 className={'text-2xl font-bold py-4'}>History</h1>
				<div className="space-y-3 overflow-y-scroll h-[80vw]">
					{repeat(10).map(d => (<div key={d} className={'card card-compact bg-base-200'}>
							<div className="card-body">
								<h2 className="card-title">#asdasda34234234</h2>
								<p className="">Data</p>
								<p className="">Data</p>
							</div>
						</div>
					))
					}
				</div>
			</div>
		</div>


	)
}
