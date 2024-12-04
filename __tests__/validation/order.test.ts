import { describe, expect, test } from "vitest";
import {OrderCreate} from "../../src/validation/order.valid";
import {OrderProductTransaction} from "../../src/validation/orderProduct.valid";
import {ReceiverCreate} from "../../src/validation/receiver.valid";

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
		const test = OrderCreate.parse(order)
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
		const orderReceiver = {
			"name": "Alice Johnson",
			"address": "456 Elm Street, Springfield, USA",
			"phone": "+19876543210"
		}
		const test = ReceiverCreate.parse(orderReceiver)
		expect(test).toEqual(orderReceiver)
	})
	
})
