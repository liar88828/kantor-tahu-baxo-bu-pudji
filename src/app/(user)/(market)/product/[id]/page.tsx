import {ShoppingCart, Star} from 'lucide-react'

export default function DetailedProduct() {
	return (
		<div className="container     mb-12">
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
									<h2 className="text-3xl font-bold mb-2">Eco-Friendly Water Bottle</h2>
									<p className="text-lg text-muted-foreground mb-4">
										Stay hydrated in style with our sustainable and durable water bottle
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
								<span className="text-sm text-muted-foreground">(128 reviews)</span>
							</div>
							<div className="text-3xl font-bold">$24.99</div>
							<div className="flex space-x-2">
								{/*badge*/}
								<div>Eco-Friendly</div>
								{/*variant="outline"*/}
								<div>BPA Free</div>
							</div>
							<p className="text-muted-foreground">
								Our Eco-Friendly Water Bottle is perfect for those who want to reduce their plastic
								waste while staying
								hydrated. Made from durable, BPA-free materials, this bottle keeps your drinks cold for
								up to 24 hours
								or hot for up to 12 hours.
							</p>
							<ul className="list-disc list-inside space-y-1 text-muted-foreground">
								<li>500ml capacity</li>
								<li>Vacuum insulated</li>
								<li>Leak-proof design</li>
								<li>Available in multiple colors</li>
							</ul>
						</div>
					</div>
					<footer className="px-0 mt-6">
						<button className="w-full btn btn-outline">
							<ShoppingCart className="mr-2 h-4 w-4"/> Add to Cart
						</button>
					</footer>
				</div>
			</div>
		</div>
	)
}

