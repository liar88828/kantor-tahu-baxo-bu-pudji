import Link from "next/link";
import Image from "next/image";

export default async function Page() {
	return < >
		<header className="navbar bg-base-300 ">
			<div className="flex justify-between  w-full">
				<Link className="" href="/">
					<Image src='/my-logo.png' alt="Tahu Bakso Logo" width={100} height={100}/>
					{/* <span className="hidden font-bold sm:inline-block">Tahu Bakso Delights</span> */}
				</Link>
				<div className="flex gap-2 sm:gap-5">

					<nav className="flex items-center  space-x-2 text-sm font-medium">
						<a
							className="transition-colors hover:text-foreground/80 text-foreground/60" href="#about">
							About
						</a>

						<a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#products">
							Products
						</a>

						<a className="transition-colors hover:text-foreground/80 text-foreground/60"
						   href="#testimonials">
							Testimonials
						</a>

						<a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#contact">
							Contact
						</a>
					</nav>

					<Link href={'/admin/'} className='btn btn-outline btn-sm'>Login</Link>
				</div>
			</div>
		</header>
		<main className='container px-5'>

			<section className="py-5 text-center">
				<div className="flex flex-col gap-5">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
						Discover the Delicious World of Tahu Bakso
					</h1>
					<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
						Savor the perfect blend of tofu and meatballs in every bite. Authentic Indonesian street food,
						now at your fingertips.
					</p>
				</div>
				<div className="space-x-4 my-4">
					<button className='btn '>
						Order Now
					</button>
					<button className="btn btn-outline">
						Learn More
					</button>
				</div>
			</section>
			<div className="divider divider-neutral px-5"></div>

			<section id="about" className="mt-20">
				<h2
					className="text-title">
					About Tahu Bakso
				</h2>
				<p className="mt-4 max-w-[700px] md:text-xl ">
					Tahu Bakso is a beloved Indonesian street food that combines the goodness of tofu with the savory
					taste of meatballs.
					Our recipe has been perfected over generations, bringing you an authentic taste of Indonesia&#39;s
					culinary heritage.
				</p>
			</section>

			<section id="products" className='mt-20'>
				<h2 className="text-title">Our Products</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
					{[
						'Classic Tahu Bakso',
						'Spicy Tahu Bakso',
						'Vegetarian Tahu Bakso'
					].map((product, index) => (
						<div key={index} className='card card-compact'>
							<div className=" card-body">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={`https://picsum.photos/300/200?random=${index}`}
									alt={product}
									className="rounded-md object-cover w-full"
								/>
								<h3 className="card-title">{product}</h3>
								<p className="">
									Delicious and satisfying, perfect for any time of day.
								</p>
								<div className="card-actions">
									<button
										className="w-full btn btn-outline ">
										Order Now
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			<section id="testimonials" className="card card-compact mt-20 ">
				<div className="card-body   ">
					<h2 className="text-title"> Customers Say </h2>
					<div className="grid grid-cols-1 space-y-2">
						{[
							{name: 'Sarah L.', text: 'The best Tahu Bakso I\'ve ever tasted! Authentic and delicious.'},
							{
								name: 'Michael R.',
								text: 'I love the variety of flavors. The spicy version is my favorite!'
							},
							{
								name: 'Andi S.',
								text: 'Reminds me of home. Thank you for bringing this taste to our city.'
							}
						]
							.map((testimonial, index) => (
								<div key={index}
									 className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
									<p className="text-gray-500 dark:text-gray-400 mb-4">
										&#34;{testimonial.text}&#34;
									</p>
									<p className="font-bold">{testimonial.name}</p>
								</div>
							))}
					</div>
				</div>
			</section>

			<section id="contact" className="card card-compact">
				<div className="card-body ">
					<h2 className="text-title ">
						Contact Us
					</h2>
					<form className="grid grid-cols-1 space-y-2">
						<div className="">
							<input
								className="input input-bordered w-full"
								placeholder="Your Name"/>
						</div>
						<div className="">

							<input
								className='input input-bordered w-full'
								placeholder="Your Email"/>
						</div>
						<div className="">
								<textarea
									className='textarea textarea-bordered w-full'
									placeholder="Your Message"/>
						</div>

						<button type="submit"
								className="w-full btn btn-outline">Send Message
						</button>
					</form>
				</div>
			</section>
		</main>
		<footer className="bg-base-200 p-5">
			<div className=" text-center">
				<h3 className="text-2xl font-bold ">Bakso Istimewa</h3>
				<p className="mb-4">Jalan Raya Bandung No. 123, Indonesia</p>
				<p className="mb-6">📞 +62 812 3456 7890 | ✉️ info@baksoistimewa.com</p>
				<div className="flex justify-center space-x-4">
					<a href="#" className="hover:text-orange-200">Instagram</a>
					<a href="#" className="hover:text-orange-200">Facebook</a>
					<a href="#" className="hover:text-orange-200">WhatsApp</a>
				</div>
			</div>
			<div className="container px-4 md:px-6">


				<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
					<p className="text-center text-sm text-gray-500 dark:text-gray-400">

						© 2023 Tahu Bakso Delights. All rights reserved.
					</p>
					<nav className="flex gap-4">
						<a className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
						   href="#">
							Privacy Policy
						</a>
						<a className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
						   href="#">
							Terms of Service
						</a>
					</nav>
				</div>
			</div>
		</footer>
	</>
}


