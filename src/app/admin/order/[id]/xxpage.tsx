'use client'

import { useState } from 'react'
import { useOrder } from "@/hook/useOrder";

// Mock data for the invoice
const invoiceData = {
	invoiceNumber: 'INV-001',
	date: '2023-06-15',
	dueDate: '2023-07-15',
	customerName: 'John Doe',
	customerEmail: 'john.doe@example.com',
	items: [
		{ description: 'Web Development Services', quantity: 1, unitPrice: 1000, total: 1000 },
		{ description: 'Hosting (1 year)', quantity: 1, unitPrice: 200, total: 200 },
	],
	subtotal: 1200,
	tax: 120,
	total: 1320,
}

export default function InvoicePrint() {
	const [ isPrinting, setIsPrinting ] = useState(false)

	const handlePrint = () => {
		setIsPrinting(true)
		window.print()
		setIsPrinting(false)
	}

	return (
		<div className="container mx-auto p-4 max-w-3xl ">
			<div className="mb-4 card bg-white">
				<div className="card-body">

					<div className="card-title text-2xl font-bold">Invoice #{ invoiceData.invoiceNumber }</div>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<p className="font-semibold">Date:</p>
							<p>{ invoiceData.date }</p>
						</div>
						<div>
							<p className="font-semibold">Due Date:</p>
							<p>{ invoiceData.dueDate }</p>
						</div>
					</div>
					<div className="mb-4">
						<p className="font-semibold">Customer:</p>
						<p>{ invoiceData.customerName }</p>
						<p>{ invoiceData.customerEmail }</p>
					</div>
					<table className="w-full mb-4">
						<thead>
						<tr className="border-b">
							<th className="text-left">Description</th>
							<th className="text-right">Quantity</th>
							<th className="text-right">Unit Price</th>
							<th className="text-right">Total</th>
						</tr>
						</thead>
						<tbody>
						{ invoiceData.items.map((item, index) => (
							<tr key={ index } className="border-b">
								<td>{ item.description }</td>
								<td className="text-right">{ item.quantity }</td>
								<td className="text-right">${ item.unitPrice.toFixed(2) }</td>
								<td className="text-right">${ item.total.toFixed(2) }</td>
							</tr>
						)) }
						</tbody>
					</table>
					<div className="flex justify-end">
						<div className="w-1/2">
							<div className="flex justify-between">
								<span className="font-semibold">Subtotal:</span>
								<span>${ invoiceData.subtotal.toFixed(2) }</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold">Tax:</span>
								<span>${ invoiceData.tax.toFixed(2) }</span>
							</div>
							<div className="flex justify-between font-bold">
								<span>Total:</span>
								<span>${ invoiceData.total.toFixed(2) }</span>
							</div>
						</div>
					</div>

					<div className=" card-actions flex justify-center print:hidden">
						<button onClick={ handlePrint } disabled={ isPrinting } className={ 'btn btn-sm btn-primary ' }>
							{ isPrinting ? 'Printing...' : 'Print Invoice' }
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

