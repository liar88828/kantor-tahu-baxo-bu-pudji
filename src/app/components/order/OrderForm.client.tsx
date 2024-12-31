'use client'
import React, { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FormOrderProps, orderCreateClient, OrderCreateClient } from "@/validation/order.valid";
import { useDeliveryStore } from "@/store/delivery";
import { useOrder } from "@/hook/useOrder";
import { useOrderStore } from "@/store/order";
import { usePaymentStore } from "@/store/payment";
import { useProductStore } from "@/store/product";
import { useReceiverStore } from "@/store/receiver";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReceiverForm } from "@/app/components/order/order.client";
import {
    DeliveryFormActionDialog,
    DeliveryShowLoadDialog,
    PaymentFormActionDialog,
    PaymentShowLoadDialog,
    ProductActionDialogAdmin,
    ProductShowDialog
} from "@/app/components/order/order.dialog";

export function OrderFormUpdate({ data, orderRes, id_customer }: FormOrderProps) {
    const { total: totalProduct, setProductStore } = useProductStore()
    const { setDelivery } = useDeliveryStore()
    const { setPartialReceiver } = useReceiverStore()
    const { setPayment } = usePaymentStore()
    const { total } = useOrderStore()
    const { onUpsert } = useOrder()

    const methods = useForm<OrderCreateClient>({
        defaultValues: data,
        resolver: zodResolver(orderCreateClient),
    });

    const onSubmit = (formData: OrderCreateClient) => {
        data.totalProduct = totalProduct
        data.totalAll = total
        onUpsert.mutate({ data: formData, method: 'PUT', id: data.id })
    };

    useEffect(() => {
        setProductStore(orderRes.Trolleys.map(d => d))
        setPartialReceiver(orderRes.Customers)
        setPayment(orderRes.Payments)
        setDelivery(orderRes.Deliverys)
    }, [ orderRes.Customers, orderRes.Deliverys, orderRes.Payments, orderRes.Trolleys, setDelivery, setPayment, setProductStore, setPartialReceiver ])

    return (
        <>
            <FormProvider { ...methods }>
                <form
                    onSubmit={ methods.handleSubmit(onSubmit) }
                    className=" grid grid-cols-1 sm:grid-cols-2 gap-5 px-2 pb-20"
                >
                    <OrderFormContext isPending={ onUpsert.isPending } id_customer={ id_customer } />
                    <div>
                        <ReceiverForm />
                        <ProductActionDialogAdmin />
                        <div className="form-control mt-4  visible sm:invisible">
                            <button
                                disabled={ onUpsert.isPending }
                                type="submit" className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </FormProvider>
            <DeliveryShowLoadDialog />
            <PaymentShowLoadDialog />
            <ProductShowDialog />
        </>
    )
}

export function OrderFormCreate({ id_customer }: Pick<FormOrderProps, 'id_customer'>) {
    const { onUpsert } = useOrder()

    const methods = useForm<OrderCreateClient>({
        resolver: zodResolver(orderCreateClient)
    });

    const onSubmit = (data: OrderCreateClient) => {
        onUpsert.mutate({ data: data, method: 'POST' })
    };
    // console.log(methods.formState.errors)
    return (
        <>
            <FormProvider { ...methods }>
                <form
                    onSubmit={ methods.handleSubmit(onSubmit) }
                    className={ ' grid grid-cols-1 sm:grid-cols-2 gap-5 px-2 pb-20' }
                >
                    <OrderFormContext isPending={ onUpsert.isPending } id_customer={ id_customer } />
                    <div className="space-y-4 pb-2">
                        <ReceiverForm />
                        <ProductActionDialogAdmin />
                        <div className="form-control mt-4  visible sm:invisible">
                            <button
                                type="submit"
                                disabled={ onUpsert.isPending }
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </FormProvider>
            <DeliveryShowLoadDialog />
            <PaymentShowLoadDialog />
            <ProductShowDialog />
        </ >
    );
}

export function OrderFormContext({ isPending, id_customer }: { id_customer: string, isPending: boolean }) {
    const { total: totalProductStore } = useProductStore()
    const { delivery: dataDelivery } = useDeliveryStore()
    const { payment: dataPayment } = usePaymentStore()

    const { register, formState: { errors }, setValue, getValues } = useFormContext<OrderCreateClient>()

    useEffect(() => {
        const [ priceDelivery, totalPayment ] = getValues([ 'priceDelivery', "totalPayment" ])
        const totalAllCalculate = +priceDelivery + totalPayment + totalProductStore
        if (!isNaN(totalAllCalculate)) {
            setValue('totalProduct', totalProductStore)
            setValue('totalAll', totalAllCalculate)
        }
        if (dataDelivery) {
            setValue('nameDelivery', dataDelivery.name)
            setValue('phoneDelivery', dataDelivery.phone)
            setValue('priceDelivery', dataDelivery.price)
        }
        if (dataPayment) {
            setValue('namePayment', dataPayment.name)
        }
    }, [ dataPayment, dataDelivery, getValues, setValue, totalProductStore ])
// console.log(id_customer)
    return (
        <div>
            <h2 className="text-xl font-bold">Order Form</h2>
            <input
                type="hidden"
                value={ id_customer }
                { ...register("id_customer") }
            />

            {/* Order Time */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Order Time</span>
                </label>
                <input
                    type="datetime-local"
                    { ...register("orderTime", {
                        valueAsDate: true,
                    }) }
                    className="input input-bordered"
                />
            </div>
            { errors.orderTime && <span className="text-error">{ errors.orderTime.message }</span> }

            {/* Send Time */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Send Time</span>
                </label>
                <input
                    type="datetime-local"
                    { ...register("sendTime", {
                        valueAsDate: true,
                    }) }
                    className="input input-bordered"
                />
            </div>
            { errors.sendTime && <span className="text-error">{ errors.sendTime.message }</span> }

            {/* Address */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Address</span>
                </label>
                <textarea
                    { ...register("addressCs", {
                        required: "Address is required"
                    }) }
                    className="textarea textarea-bordered"
                ></textarea>
            </div>
            { errors.addressCs && <span className="text-error">{ errors.addressCs.message }</span> }

            {/* Description */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <textarea
                    { ...register("desc") }
                    className="textarea textarea-bordered"
                ></textarea>
            </div>
            { errors.desc && <span className="text-error">{ errors.desc.message }</span> }

            {/* Delivery */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Delivery Name</span>
                </label>
                <div className="join w-full">
                    <input
                        type="text"
                        { ...register("nameDelivery") }
                        className="input input-bordered join-item w-full"
                    />
                    <DeliveryFormActionDialog />
                </div>
            </div>
            { errors.nameDelivery && <span className="text-error">{ errors.nameDelivery.message }</span> }

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Delivery Phone</span>
                </label>
                <input
                    type="text"
                    { ...register("phoneDelivery",) }
                    className="input input-bordered"
                />
            </div>
            { errors.phoneDelivery && <span className="text-error">{ errors.phoneDelivery.message }</span> }

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Delivery Price</span>
                </label>
                <input
                    type="number"
                    { ...register("priceDelivery",
                        {
                            valueAsNumber: true,
                            onChange: (e) => {

                                const [ totalPayment, totalProduct ] = getValues([ 'totalPayment', "totalProduct" ])
                                const totalAllCalculate = Number(e.target.value) + totalPayment + totalProduct
                                if (!isNaN(totalAllCalculate)) {
                                    setValue('totalAll', totalAllCalculate)
                                    // setValue('totalProduct', totalProductStore)
                                }
                                //
                                // setTotal({
                                //     totalProduct : totalProduct,
                                //     priceDelivery : Number(e.target.value),
                                // })
                            }
                        }) }
                    className="input input-bordered"
                />
            </div>
            { errors.priceDelivery && <span className="text-error">{ errors.priceDelivery.message }</span> }

            {/* Payment */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Payment Name</span>
                </label>
                <div className="join w-full">
                    <input
                        type="text"
                        { ...register("namePayment") }
                        className="input input-bordered join-item w-full"
                    />
                    <PaymentFormActionDialog />
                </div>
            </div>
            { errors.namePayment && <span className="text-error">{ errors.namePayment.message }</span> }

            {/* Payment */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Total Payment</span>
                </label>
                <input
                    type="number"
                    { ...register("totalPayment",
                        {
                            valueAsNumber: true,
                            onChange: (e) => {
                                const [ priceDelivery, totalProduct ] = getValues([ 'priceDelivery', "totalProduct" ])
                                const totalAllCalculate = Number(e.target.value) + priceDelivery + totalProduct
                                if (!isNaN(totalAllCalculate)) {
                                    setValue('totalAll', totalAllCalculate)
                                }

                                // setTotal({
                                //     totalProduct : totalProduct,
                                //     pricePayment : Number(e.target.value)
                                // })
                            }
                        }) }
                    className="input input-bordered"
                />
            </div>
            { errors.totalPayment && <span className="text-error">{ errors.totalPayment.message }</span> }

            {/* Product */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Total Product</span>
                </label>
                <input
                    type="number"
                    disabled={ true }
                    value={ totalProductStore }
                    { ...register("totalProduct",
                        { valueAsNumber: true }) }
                    className="input input-bordered"
                />
            </div>
            { errors.totalProduct && <span className="text-error">{ errors.totalProduct.message }</span> }

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Total All</span>
                </label>
                <input
                    type="number"
                    { ...register("totalAll",
                        {
                            valueAsNumber: true,
                        }) }
                    className="input input-bordered"
                />
            </div>
            { errors.totalAll && <span className="text-error">{ errors.totalAll.message }</span> }

            {/* Status */ }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Status</span>
                </label>
                <select { ...register("status") } className="select select-bordered">
                    <option value="Pending">Pending</option>
                    <option value="Fail">Fail</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            { errors.status && <span className="text-error">{ errors.status.message }</span> }

            {/* Submit Button */ }
            <div className="form-control mt-4 invisible sm:visible">
                <button
                    disabled={ isPending }
                    type="submit" className="btn btn-primary"
                >
                    Submit
                </button>
            </div>
        </div>

    );
}
