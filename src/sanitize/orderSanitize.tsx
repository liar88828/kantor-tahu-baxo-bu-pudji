import { TOrderTransactionCreate, TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { OrderCreateClient } from "@/validation/order.valid";
import { userId } from "@/network/trolley";
import { DataOrder } from "@/store/order";

export const orderSanitize = (data: TOrderTransactionDB | undefined): OrderCreateClient => {

	if (data) {
		return {
			id: data.id,
			addressCs: data.address,
			desc: data.desc,
			nameDelivery: data.nameDelivery,
			phoneDelivery: data.phoneDelivery,
			priceDelivery: data.priceDelivery,
			namePayment: data.Payments.name,
			// @ts-ignore
			orderTime: new Date(data.orderTime).toISOString().slice(0, 16),
			// @ts-ignore
			sendTime: new Date(data.sendTime).toISOString().slice(0, 16),
			status: data.status,
			totalProduct: data.Trolleys.reduce((total, item) => {
				total = total + (item.Product.price * item.qty_at_buy)
				return total
			}, 0),
			totalPayment: data.totalPayment,
			totalAll: data.totalAll,
		}
	}
	return {
		id:'',
        id_customer: "",
		addressCs: '',
		desc: '',
		nameDelivery: '',
		phoneDelivery: '',
		priceDelivery: 0,
		namePayment: '',
		orderTime: new Date(),
		sendTime: new Date(),
		status: '',
		totalPayment: 0,
		totalAll: 0,
		totalProduct: 0,
	}
}

export const orderTransactionSanitize = ({
                                             delivery,
                                             order,
                                             receiver,
                                             payment,
                                             product
                                         }: DataOrder): TOrderTransactionCreate => {
	return {
		orderReceiver: receiver,
		orderTrolley: product.map(d => (
			{
				qty_at_buy: d.qty_at_buy,
				price_at_buy: d.price_at_buy,
				id_user: userId,
				id_product: d.id_product
			})),
		order: {
            id_customer: order.id_customer,
			address: order.addressCs,
			desc: order.desc,
			orderTime: order.orderTime,
			sendTime: order.sendTime,
			id_delivery: delivery.id,
			nameDelivery: order.nameDelivery,
			phoneDelivery: order.phoneDelivery,
			priceDelivery: order.priceDelivery,
			id_payment: payment.id,
			totalPayment: order.totalPayment,
			totalAll: order.totalAll,
			status: order.status,
		}
	}
}