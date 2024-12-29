import { describe, expect, test } from "vitest";
import { orderCreateServer } from "../../src/validation/order.valid";
import { OrderProductTransaction } from "../../src/validation/orderProduct.valid";
import { ReceiverCreate } from "../../src/validation/receiver.valid";
import { TOrderTransactionCreate } from "../../src/interface/entity/transaction.model";

export const orderReceiver = {
	"name": "Alice Johnson",
	"address": "456 Elm Street, Springfield, USA",
	"phone": "+19876543210"
}

describe('test Order all', () => {
	
	test("Order test ", () => {
		const order = {
			"nameCs": "John Doe",
			"sendTime": new Date(),
			"orderTime": new Date(),
			"desc": "Order of electronics including headphones and chargers.",
			"address": "123 Main St, Springfield, USA",
			"id_delivery": "a6ba1f1c-118b-433d-a7e6-5b4f2fccb70e",
			"nameDelivery": "Express Logistics",
			"phoneDelivery": "+1234567890",
			"priceDelivery": 4999,
			"id_payment": "bf4bd8ac-2676-40f2-a726-87ad5a92df9d",
			"totalPayment": 10499,
			"totalAll": 15498,
			"status": "Pending"
		}
		const test = orderCreateServer.parse(order)
		expect(test).toEqual(order)
	})
	
	test("OrderProduct test ", () => {
		const orderProduct = [
			{ "id_product": "039d03a1-87b7-465f-b569-d0c01edb1f44" ,"qty":0},
			{ "id_product": "a817ba4c-0743-4f27-a1e1-a1d1b69b9863",
			"qty":0}
		]
		const test = OrderProductTransaction.parse(orderProduct)
		expect(test).toEqual(orderProduct)
	})
	
	test("Receiver test ", () => {

		const test = ReceiverCreate.parse(orderReceiver)
		expect(test).toEqual(orderReceiver)
	})

	test('order complete', () => {
		const json = {
			"orderReceiver": {
				"address": "Aut aut minima eveni",
				"name": "Ipsa aliquid nesciu",
				"phone": "+1 (144) 186-2208",
			},
			"orderTrolley": [
				{
					"qty_at_buy": 1,
					"price_at_buy": 20000,
					"id_user": "1da116c8-2d8a-4f9b-ae93-37cbad1bd832",
					"id_product": "229b54ec-54ac-40bc-9571-90b9494bd672"
				},
				{
					"qty_at_buy": 1,
					"price_at_buy": 20000,
					"id_user": "1da116c8-2d8a-4f9b-ae93-37cbad1bd832",
					"id_product": "cb34c9fc-1c93-4e0b-a213-75d96489b54b"
				}
			],
			"order": {
				"address": "Duis similique aliqu",
				"desc": "Perspiciatis sapien",
				"nameCs": "Venus Livingston",
				"orderTime": "2019-02-01T06:16:00.000Z",
				"sendTime": "1994-05-07T10:36:00.000Z",
				"id_delivery": "d278edcd-6ec4-445f-9a3e-98edc950f597",
				"nameDelivery": "Alisa Benjamin",
				"phoneDelivery": "+1 (985) 359-3311",
				"priceDelivery": 220,
				"id_payment": "dde29f69-1fcd-49f8-8f1a-3d40a544e0c5",
				"totalPayment": 52,
				"totalAll": 80,
				"status": "Pending"
			}
		}
		const data: TOrderTransactionCreate = {
			order: orderCreateServer.parse(json.order),
			orderTrolley: OrderProductTransaction.parse(json.orderTrolley),
			orderReceiver: ReceiverCreate.parse(json.orderReceiver),
		}
		console.log(data)
		expect(data).toEqual(json)
	})
})
