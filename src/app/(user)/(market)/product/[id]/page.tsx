import { Star } from 'lucide-react'
import { TContext } from "@/interface/server/param";
import { getId } from "@/lib/requestHelper";
import { productId } from "@/network/product";
import { ErrorData } from "@/app/components/ErrorData";
import { toRupiah } from "@/utils/toRupiah";
import { toDate } from "@/utils/formatDate";
import AddTrolleyClient from "@/app/(user)/(market)/product/[id]/AddTrolley.client";

export default async function DetailedProduct(context: TContext) {
	const id = await getId(context);
	const response = await productId(id)
	const product = response.data
	return (
		<div className="container mb-12">
			{ !response.data ? (
				<div className="">
					<ErrorData code={ 404 } msg={ 'Data is not found' }/>
				</div>
			) : (
				<div className="flex flex-col md:flex-row card">
				<div className="md:w-1/2 p-6">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="https://picsum.photos/200/300?random=1"
						alt="Product Image"
						width={400}
						height={400}
						className="w-full h-auto object-cover rounded-lg"
					/>
				</div>
				<div className="md:w-1/2 p-6 flex flex-col justify-between card-body">
					<div>
						<header className="px-0">
							<div className="flex justify-between items-start">
								<div>
									<h2 className="text-3xl font-bold mb-2">
										{ product.name }
									</h2>
									<p className="text-lg text-muted-foreground mb-4">
										type { product.type }
									</p>
								</div>
							</div>
						</header>
						<div className="space-y-4">
							<div className="flex items-center">
								<div className="flex items-center mr-2">
									{[...Array(5)].map((_, i) => (
										<Star key={i} className="w-5 h-5 fill-primary"/>
									))}
								</div>
								<span className="text-sm text-muted-foreground">
									(128 reviews)
								</span>
							</div>
							<div className="text-3xl font-bold">
								{ toRupiah(product.price) }
							</div>
							<div className="flex space-x-2">
								<div>
									Stock { product.qty }
								</div>
							</div>
							<p className="text-muted-foreground">
								{ product.desc }
								{/*{ product.desc }*/ }
							</p>
							<ul className="list-disc list-inside space-y-1 text-muted-foreground">
								<li>
									Location { product.location }
								</li>
								<li>
									Update { toDate(product.created_at) }
								</li>
								<li>
									Create { toDate(product.created_at) }

								</li>
								{/*<li>Vacuum insulated</li>*/ }
								{/*<li>Leak-proof design</li>*/ }
								{/*<li>Available in multiple colors</li>*/ }
							</ul>
						</div>
					</div>
					<footer className="px-0 mt-6">
						<AddTrolleyClient product={ product }/>
					</footer>
				</div>
				</div>)
			}
		</div>
	)
}

