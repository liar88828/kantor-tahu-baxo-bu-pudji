'use client'
import Link from "next/link";
import React, { useState } from "react";
import { Check, Minus, Plus, Search, Trash, XIcon } from "lucide-react";
import { OrderCreateClient } from "@/validation/order.valid";
import { OrderDetailAdmin } from "@/app/components/order/order.page";
import { OrderFormUpdate } from "@/app/components/order/OrderForm.client";
import { EmptyData, PageErrorData } from "@/app/components/PageErrorData";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProductShowDialog } from "@/app/components/order/order.dialog";
import { TCustomersDB } from "@/interface/entity/receiver.model";
import { orderSanitize } from "@/sanitize/orderSanitize";
import { receiverAll } from "@/network/receiver";
import { toDate } from "@/utils/formatDate";
import { toRupiah } from "@/utils/toRupiah";
import { useFormContext } from "react-hook-form";
import { useOrder } from "@/hook/useOrder";
import { useParams } from "next/navigation";
import { usePrint } from "@/hook/usePrint";
import { useProductStore } from "@/store/product";
import { useReceiverStore } from "@/store/receiver";
import { useTable } from "@/hook/useTable";
import { useTableStore } from "@/store/table";

export function Receiver() {
    const { onReceiver, setPartialReceiver } = useReceiverStore()
    const [ receiverData, setReceiverData ] = useState<TCustomersDB[]>([])
    const [ search, setSearch ] = useState<string>('')

    const loadReceiver = async () => {
        if (receiverData.length === 0) {
            const { data } = await receiverAll({ pagination: {} })
            if (data.data.length > 0) {
                setReceiverData(data.data)
            }
        }
    }

    return (
        <div className="">
            <div className="px-2 mb-2">
                <div className="flex justify-between">
                    <h1 className="card-title">User Receiver</h1>

                    <button
                        className='btn btn-square btn-neutral'
                        onClick={ async () => {
                            await loadReceiver()
                            // @ts-ignore
                            document.getElementById('my_modal_search').showModal()
                        } }
                    >
                        <Search />
                    </button>

                    <dialog id="my_modal_search" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <div className="flex justify-between py-4">
                                <input
                                    className={ 'input input-bordered w-full' }
                                    type="text"
                                    onChange={ (e) => {
                                        setSearch(e.target.value)
                                    } }
                                    value={ search }
                                    placeholder="Search..."
                                />

                            </div>
                            <div className="space-y-2">
                                {
                                    receiverData &&
                                    receiverData
                                    .filter(receiver => receiver.name.toLowerCase().includes(search.toLowerCase()))
                                    .map((receiver) => ( <>
                                            <div key={ receiver.id }
                                                 className="flex justify-between items-center"
                                            >
                                                <div className="">
                                                    <h2 className={ 'text-xl font-bold' }>{ receiver.name }</h2>
                                                    <p className={ 'text-gray-400' }>{ receiver.phone }</p>
                                                    <p className={ 'text-gray-400' }>{ receiver.address }</p>
                                                </div>
                                                <button className={ 'btn btn-square' }
                                                        onClick={ () => setPartialReceiver(receiver) }
                                                >
                                                    <Check />
                                                </button>
                                            </div>
                                            <div className="divider"></div>
                                        </>

                                    )) }
                            </div>
                            <div className="modal-action">
                                <Link
                                    className={ 'btn btn-neutral' }
                                    href={ '/admin/receiver/create' }
                                >
                                    Create <Plus />

                                </Link>
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */ }
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
            <div className="card card-compact bg-base-200">
                <div className="card-body">
                    { !onReceiver
                        ? <div className="text-lg font-bold flex justify-between">
                            <h1>Please Add Receiver</h1>
                        </div>
                        : (
                            <div className="flex justify-between  items-center">
                                <div className="">
                                    <h2 className={ 'text-xl font-bold' }>{ onReceiver.name }</h2>
                                    <p className={ 'text-gray-400' }>{ onReceiver.phone }</p>
                                    <p className={ 'text-gray-400' }>{ onReceiver.address }</p>
                                </div>
                                <button className={ 'btn btn-square btn-neutral' }
                                        onClick={ () => setPartialReceiver(null) }
                                >
                                    <XIcon />
                                </button>
                            </div>
                        ) }
                </div>
            </div>
        </div>
    );
}

export function ReceiverForm() {
    const { receiver, setPartialReceiver } = useReceiverStore()
    const { register, formState: { errors }, setValue, getValues } = useFormContext<OrderCreateClient>()

    return (
        <div className={ 'card card-compact bg-base-200' }>
            <div className="card-body">
                <h2 className={ 'card-title' }>Receiver</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Receiver Name</span>
                    </label>
                    <input
                        value={ receiver.name }
                        onChange={ (e) => {
                            setPartialReceiver({ name: e.target.value })
                        } }
                        type="text"
                        className="input input-bordered"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Receiver Phone</span>
                    </label>
                    <input
                        value={ receiver.phone }
                        onChange={ (e) => {
                            setPartialReceiver({ phone: e.target.value })
                        } }
                        type="tel"
                        className="input input-bordered"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Receiver Address </span>
                    </label>
                    <textarea
                        onChange={ (e) => {
                            setPartialReceiver({ address: e.target.value })
                        } }
                        className="textarea textarea-bordered"
                        value={ receiver.address }
                    >
				</textarea>
                </div>
            </div>
        </div>
    )
}

export function ProductAdminXXX() {
    const {
        productStore,
        getProductData,
        setQty,
        onRemove,
        onIncrement,
        onDecrement,
    } = useProductStore()
    return (
        <div>
            <div className={ 'card-title' }>Product</div>
            <div className="  mt-2">
                <div className="space-y-2">
                    { !productStore
                        ? <EmptyData page={ 'checkout' } />
                        : productStore.map(product => (
                            <div
                                key={ product.id_product }
                                className={ `card card-side card-compact card-bordered bg-base-200 ` }
                            >
                                <figure>
                                    {/* eslint-disable-next-line @next/next/no-img-element */ }
                                    <img
                                        src="https://picsum.photos/200/300?random=1"
                                        alt="Movie"
                                        className='rounded-xl object-cover w-32 h-32 '
                                    />
                                </figure>
                                <div className="card-body">
                                    <div className="flex justify-between">
                                        <h2 className='card-title'>{ product.Product.name }</h2>
                                        <button
                                            onClick={ () => onRemove(product.id_product) }
                                            className=' btn btn-square btn-error btn-sm '
                                        >
                                            <Trash />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="">
                                            <p>{ toRupiah(product.price_at_buy) }</p>
                                            <p>{ product.Product.type }</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type={ 'button' }
                                                onClick={
                                                    () => {
                                                        onIncrement(product.id_product)
                                                    } }
                                                className="btn btn-square btn-sm"
                                            >
                                                <Plus />
                                            </button>
                                            <input
                                                className={ 'input w-20' }
                                                type={ 'number' }
                                                max={ product.Product.qty }
                                                value={ product.qty_at_buy }
                                                onChange={ (e) => {
                                                    setQty(product.id_product, Number(e.target.value))
                                                } }
                                            />
                                            <button
                                                type={ 'button' }
                                                onClick={ () => {
                                                    onDecrement(product.id_product)
                                                    // setTotalOrder(total)
                                                } }
                                                className="btn btn-square  btn-sm"
                                            >
                                                <Minus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) }
                </div>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */ }
            <button
                type={ 'button' }
                className='btn btn-neutral w-full mt-2'
                onClick={ async () => {
                    await getProductData()
                    // @ts-ignore
                    document.getElementById('my_modal_product').showModal()
                } }
            >
                Add Product <Plus />
            </button>
            <ProductShowDialog />
        </div>
    );
}

export function DetailedInvoicePrintAdmin() {
    const param = useParams<{ id: string }>()
    const { getId, onDelete } = useOrder()
    const { data: order, isLoading, isError } = getId(param.id)
    const { isPrinting, handlePrint, contentRef } = usePrint()
    const handleDelete = () => {
        onDelete.mutate(param.id)
    }

    if (!order || isLoading) return <PageLoadingSpin />
    if (isError) return <EmptyData page={ `Order Detail ${ param.id }` } />

    return ( <OrderDetailAdmin
            order={ order.data }
            isPrinting={ isPrinting }
            contentRef={ contentRef }
            id={ param.id }
            isPending={ onDelete.isPending }
            handleDeleteAction={ handleDelete }
            handlePrintAction={ handlePrint }
        />

    )
}

export function OrderExcelAdmin() {
    const { tableRef, onDownload } = useTable()
    const { data: dataTable } = useTableStore()

    return (
        <div className={ 'container-none' }>
            <button onClick={ onDownload }
                    className={ 'btn btn-info' }
            >
                Download
            </button>
            <div className="overflow-x-auto mt-2">
                <table ref={ tableRef }
                       className="table table-xs"
                       data-theme={ 'light' }
                >
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order Time</th>
                        <th>Send Time</th>
                        <th>Status</th>
                        {/**/ }
                        <th>Address</th>
                        <th>Description</th>
                        <th className={ 'bg-green-200' }>Name (Delivery)</th>
                        <th className={ 'bg-green-200' }>Phone (Delivery)</th>
                        <th className={ 'bg-green-200' }>Price Delivery</th>
                        {/**/ }
                        <th className={ 'bg-orange-200' }>Name (Customer)</th>
                        <th className={ 'bg-orange-200' }>Address (Customer)</th>
                        <th className={ 'bg-orange-200' }>Phone (Customer)</th>
                        {/**/ }
                        <th className={ 'bg-red-200' }>Name (Payments)</th>
                        <th className={ 'bg-red-200' }>Type (Payments)</th>
                        <th className={ 'bg-red-200' }>Price (Payments)</th>
                        {/**/ }
                        <th className={ 'bg-yellow-200' }>Name (Product)</th>
                        <th className={ 'bg-yellow-200' }>Qty (Product)</th>
                        <th className={ 'bg-yellow-200' }>Price (Product)</th>
                        <th>Total All</th>
                    </tr>
                    </thead>
                    <tbody>
                    { dataTable.map((order) => (
                        <tr key={ order.id }>
                            <td>{ order.id }</td>
                            <td>{ toDate(order.orderTime || 0) }</td>
                            <td>{ toDate(order.sendTime || 0) }</td>
                            <td> { order.status }</td>
                            <td>{ order.address }</td>
                            <td className={ 'line-clamp-2' }>{ order.desc }</td>
                            <td className={ 'bg-green-100' }>{ order.nameDelivery }</td>
                            <td className={ 'bg-green-100' }>{ order.phoneDelivery }</td>
                            <td className={ 'bg-green-100' }>{ toRupiah(order.priceDelivery) }</td>
                            {/**/ }
                            <td className={ 'bg-orange-100' }>{ order.Customers.name }</td>
                            <td className={ 'bg-orange-100' }>{ order.Customers.address }</td>
                            <td className={ 'bg-orange-100' }>{ order.Customers.phone }</td>
                            {/**/ }
                            <td className={ 'bg-red-100' }>{ order.Payments.name }</td>
                            <td className={ 'bg-red-100' }>{ order.Payments.type }</td>
                            <td className={ 'bg-red-100' }>{ toRupiah(order.totalPayment) }</td>
                            {/**/ }
                            <td className={ 'bg-yellow-100' }>{ order.Trolleys.map(d => d.Product.name).join(', \n') }</td>
                            <td className={ 'bg-yellow-100' }>{ order.Trolleys.map(d => d.qty_at_buy).join(', \n') }</td>
                            <td className={ 'bg-yellow-100' }>{ order.Trolleys.map(d => toRupiah(d.price_at_buy)).join(', \n') }</td>

                            <td>{ toRupiah(order.totalAll) }</td>
                        </tr>
                    )) }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function OrderFormUpdateClient({ idOrder, id_user }: { idOrder: string, id_user: string }) {
    const { getId } = useOrder()
    const { data: order, isLoading, isError } = getId(idOrder)

    if (isLoading || !order) return <PageLoadingSpin />
    if (isError) return <PageErrorData />

    return (
        <OrderFormUpdate
            data={ orderSanitize(order.data) }
            orderRes={ order.data }
            id_customer={ id_user }
        />
    )
}
