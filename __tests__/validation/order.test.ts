import { describe, expect, test } from "vitest"
import { orderCreateServer } from "../../src/validation/order.valid"
import { OrderProductTransaction } from "../../src/validation/orderProduct.valid"
import { ReceiverCreate } from "../../src/validation/receiver.valid"
import { TOrderTransactionCreate } from "../../src/interface/entity/transaction.model"
import { exampleOrderCreate, exampleOrderProductCreate, exampleReceiver } from "../../src/assets/ExampleOrder";

describe("test Order all", () => {
	test("Order test ", () => {
        const test = orderCreateServer.parse(exampleOrderCreate)
        expect(test).toEqual(exampleOrderCreate)
	})

	test("OrderProduct test ", () => {

        const test = OrderProductTransaction.parse(exampleOrderProductCreate)
        expect(test).toEqual(exampleOrderProductCreate)
	})

	test("Receiver test ", () => {
        const test = ReceiverCreate.parse(exampleReceiver)
        expect(test).toEqual(exampleReceiver)
	})

    test("order complete", () => {
        const json: TOrderTransactionCreate = {
            orderReceiver: exampleReceiver,
            orderTrolley: exampleOrderProductCreate,
            order: exampleOrderCreate
		}
		const data: TOrderTransactionCreate = {
			order: orderCreateServer.parse(json.order),
			orderTrolley: OrderProductTransaction.parse(json.orderTrolley),
			orderReceiver: ReceiverCreate.parse(json.orderReceiver),
		}
		expect(data).toEqual(json)
	})
})
