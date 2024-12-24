import { NextRequest } from 'next/server'

import { TContext } from "@/interface/server/param";
import { ResponseJson } from "@/utils/requestHelper";
import { orderController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
	return ResponseJson(
		async () => orderController.findAll(request, context),
		"GET",
		'order')
}

export async function POST(request: NextRequest, context: TContext) {
	return ResponseJson(() => orderController.createOne(request, context),
		"POST",
		'order')
}

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
