'use client'

import { usePrint } from "@/hook/usePrint";

const data = {
	"id": "712ec142-b620-4315-8571-877c84634642",
	"nameCs": "John Doe",
	"orderTime": "1970-01-21T01:41:16.063Z",
	"sendTime": "1970-01-21T01:41:16.063Z",
	"desc": "Order of electronics including headphones and chargers.",
	"address": "123 Main St, Springfield, USA",
	"id_delivery": "d278edcd-6ec4-445f-9a3e-98edc950f597",
	"nameDelivery": "Express Logistics",
	"phoneDelivery": "+1234567890",
	"priceDelivery": 4999,
	"id_payment": "dde29f69-1fcd-49f8-8f1a-3d40a544e0c5",
	"totalPayment": 10499,
	"totalAll": 15498,
	"status": "Completed",
	"id_receiver": "a9f16705-a957-4edb-bb09-0bc4787d95e2",
	"created_at": "2024-12-13T07:47:43.628Z",
	"updated_at": "2024-12-13T07:47:43.628Z",
	"Trolleys": [
		{
			"id": "575fe63d-6ffb-4560-8082-6dafc3bf792c",
			"id_order": "712ec142-b620-4315-8571-877c84634642",
			"id_product": "cb34c9fc-1c93-4e0b-a213-75d96489b54b",
			"qty_at_buy": 1,
			"price_at_buy": 20000,
			"id_user": null,
			"Product": {
				"id": "cb34c9fc-1c93-4e0b-a213-75d96489b54b",
				"name": "tahu ayam",
				"location": "Semarang",
				"type": "orderan",
				"img": "tidak ada ",
				"price": 20000,
				"qty": 86,
				"desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
				"created_at": "2024-12-08T07:51:45.003Z",
				"updated_at": "2024-12-08T12:25:28.304Z"
			}
		},
		{
			"id": "48db427b-401f-4d6a-a2bb-2a379f944813",
			"id_order": "712ec142-b620-4315-8571-877c84634642",
			"id_product": "229b54ec-54ac-40bc-9571-90b9494bd672",
			"qty_at_buy": 1,
			"price_at_buy": 20000,
			"id_user": null,
			"Product": {
				"id": "229b54ec-54ac-40bc-9571-90b9494bd672",
				"name": "tahu baxo",
				"location": "Semarang",
				"type": "orderan",
				"img": "tidak ada ",
				"price": 20000,
				"qty": 86,
				"desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
				"created_at": "2024-12-08T07:51:45.003Z",
				"updated_at": "2024-12-07T11:24:03.644Z"
			}
		}
	],
	"Receivers": {
		"id": "a9f16705-a957-4edb-bb09-0bc4787d95e2",
		"name": "Alice Johnson",
		"address": "456 Elm Street, Springfield, USA",
		"phone": "+19876543210"
	},
	"Deliverys": {
		"id": "d278edcd-6ec4-445f-9a3e-98edc950f597",
		"name": "Astra Holt",
		"phone": "+1 (334) 471-9017",
		"address": "Nam nihil ducimus r",
		"type": "Ad mollit voluptatem",
		"price": 882,
		"img": "https://www.dowawyracekebaj.jpg",
		"desc": "Error dolor eaque qu",
		"created_at": "2024-12-08T07:49:31.621Z",
		"updated_at": "2024-12-08T07:49:31.621Z"
	},
	"Payments": {
		"id": "dde29f69-1fcd-49f8-8f1a-3d40a544e0c5",
		"name": "mandiri",
		"phone": "test1",
		"accounting": "asdasdas",
		"address": "Semrang",
		"type": "Kredit",
		"img": "https://logowik.com/content/uploads/images/cash2548.jpg",
		"desc": "orak jelas",
		"created_at": "2024-12-07T11:23:05.671Z",
		"updated_at": "2024-12-07T11:23:05.671Z"
	}
}

export default function DetailedInvoicePrint() {
	const { isPrinting, handlePrint, contentRef } = usePrint()
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString()
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
	}

	return (
		<div className=" mx-auto p-4 w-[50rem] ">
			<div
				ref={ contentRef }
				className="mb-4 card bg-white   ">
				<div className={ 'card-body' }>
					<div className=" card-title text-2xl font-bold">Invoice #{ data.id }</div>

					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<p className="font-semibold">Order Date:</p>
							<p>{ formatDate(data.orderTime) }</p>
						</div>
						<div>
							<p className="font-semibold">Send Date:</p>
							<p>{ formatDate(data.sendTime) }</p>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<p className="font-semibold">Customer:</p>
							<p>{ data.nameCs }</p>
							<p>{ data.address }</p>
						</div>
						<div>
							<p className="font-semibold">Receiver:</p>
							<p>{ data.Receivers.name }</p>
							<p>{ data.Receivers.address }</p>
							<p>{ data.Receivers.phone }</p>
						</div>
					</div>
					<div className="mb-4">
						<p className="font-semibold">Description:</p>
						<p>{ data.desc }</p>
					</div>
					<table className="w-full mb-4">
						<thead>
						<tr className="border-b">
							<th className="text-left">Product</th>
							<th className="text-right">Quantity</th>
							<th className="text-right">Unit Price</th>
							<th className="text-right">Total</th>
						</tr>
						</thead>
						<tbody>
						{ data.Trolleys.map((item) => (
							<tr key={ item.id } className="border-b">
								<td>{ item.Product.name }</td>
								<td className="text-right">{ item.qty_at_buy }</td>
								<td className="text-right">{ formatCurrency(item.price_at_buy) }</td>
								<td className="text-right">{ formatCurrency(item.qty_at_buy * item.price_at_buy) }</td>
							</tr>
						)) }
						</tbody>
					</table>
					<div className="flex justify-end">
						<div className="w-1/2">
							<div className="flex justify-between">
								<span className="font-semibold">Subtotal:</span>
								<span>{ formatCurrency(data.totalPayment) }</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold">Delivery Fee:</span>
								<span>{ formatCurrency(data.priceDelivery) }</span>
							</div>
							<div className="flex justify-between font-bold">
								<span>Total:</span>
								<span>{ formatCurrency(data.totalAll) }</span>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-2 ">
						<div className="mt-4">
							<p className="font-semibold">Delivery Information:</p>
							<p>Name: { data.Deliverys.name }</p>
							<p>Phone: { data.Deliverys.phone }</p>
							<p>Address: { data.Deliverys.address }</p>
							<p>Type: { data.Deliverys.type }</p>
						</div>
						<div className="mt-4">
							<p className="font-semibold">Payment Information:</p>
							<p>Method: { data.Payments.name }</p>
							<p>Type: { data.Payments.type }</p>
						</div>
					</div>

					<div className="mt-4">
						<p className="font-semibold">Status: { data.status }</p>
					</div>

					<div className=" card-actions flex justify-center print:hidden">
						<button onClick={ handlePrint } disabled={ isPrinting } className={ 'btn btn-info' }>
							{ isPrinting ? 'Printing...' : 'Print Invoice' }
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

