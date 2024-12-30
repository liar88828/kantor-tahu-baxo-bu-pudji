'use client'
import React, { startTransition, useRef, useState } from 'react';
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { toStatus } from "@/app/components/status";
import { toDate } from "@/utils/formatDate";
import { toRupiah } from "@/utils/toRupiah";
import { Filter, NotebookTabs, Plus } from "lucide-react";
import Link from "next/link";
import { useTableStore } from "@/store/table";
import { useOrder } from "@/hook/useOrder";
import { PageEmptyData } from "@/app/components/PageErrorData";
import { useDebounce } from "@/hook/useDebounce";

export function OrderTable() {
    const { setTable, existTable, search: nameTable, status: statusTable, tableDetail } = useTableStore()
    const { getAll } = useOrder()
    const searchDebounce = useDebounce(nameTable)
    const statusDebounce = useDebounce(statusTable)
    const { data: orders, isLoading, isError } = getAll({
            filter: {
                name: nameTable,
                status: statusTable,
            },
            pagination: {}
        },
        {
            name: searchDebounce,
            status: statusDebounce,
        }
    )
    const [ selectedOrders, setSelectedOrders ] = useState<string[]>([]);
    const tableRef = useRef(null);
    return (
        <div className="overflow-x-auto mt-2 ">
            { !orders || isLoading
                ? <PageLoadingSpin />
                : <table className="table table-xs"
                         ref={ tableRef }
                         data-theme={ 'light' }
                >
                    <thead>
                    <tr>
                        <th>
                            <label>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={ selectedOrders.length === orders.length }
                                    onChange={ (e) => {
                                        startTransition(() => {
                                            if (e.target.checked) {
                                                setSelectedOrders(orders.map((order) => order.id));
                                            } else {
                                                setSelectedOrders([]);
                                            }
                                        })
                                    } }
                                />
                            </label>
                        </th>
                        <th>ID</th>
                        <th>Order Time</th>
                        <th>Send Time</th>
                        <th>Status</th>
                        {/**/ }
                        <th>Name (Customer)</th>
                        <th>Address</th>
                        { tableDetail.description && (
                            <th>Description</th>
                        ) }
                        {/**/ }
                        { tableDetail.receiver && ( <>
                            <th className={ 'bg-orange-100' }>Name (Receiver)</th>
                            <th className={ 'bg-orange-100' }>Address (Receiver)</th>
                            <th className={ 'bg-orange-100' }>Phone (Receiver)</th>
                        </> )
                        }
                        {/**/ }
                        { tableDetail.deliver && ( <>
                            <th className={ 'bg-green-100' }>Name (Delivery)</th>
                            <th className={ 'bg-green-100' }>Phone (Delivery)</th>
                        </> ) }
                        {/**/ }
                        { tableDetail.payment && ( <>
                            <th className={ 'bg-red-100' }>Name (Payments)</th>
                            <th className={ 'bg-red-100' }>Type (Payments)</th>
                        </> ) }
                        {/**/ }
                        <th className={ 'bg-yellow-100 ' }>Name (Product)</th>
                        <th className={ 'bg-yellow-100' }>Price (Product)</th>
                        {/**/ }
                        <th className={ 'bg-red-100' }>Price (Payments)</th>
                        <th className={ 'bg-green-100' }>Price Delivery</th>

                        <th>Total All</th>
                        <th className={ 'w-24' }>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { isError || !orders
                        ? <tr>
                            <td><PageEmptyData page={ 'Data is Empty' } /></td>
                        </tr>
                        : orders
                        .filter((order) => {
                            const nameOrder = order.Customers.name.toLowerCase().includes(nameTable.toLowerCase());
                            const statusOrder = order.status.includes(statusTable);
                            return nameOrder && statusOrder;
                        })
                        .map((order) => (
                            <tr key={ order.id }>
                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm"
                                            checked={
                                                // isChecked(order.id) ||
                                                existTable(order.id) }
                                            onChange={ () => {
                                                setTable(order)
                                                // handleCheckboxChange(order.id)
                                            } }
                                        />
                                    </label>
                                </td>
                                <td>{ order.id }</td>
                                <td>{ toDate(order.orderTime || 0) }</td>
                                <td>{ toDate(order.sendTime || 0) }</td>
                                <td>
                                    {
                                        <span className={ `badge badge-${ toStatus(order.status) }` }>
												{ order.status }
											</span>
                                    }
                                </td>
                                {/**/ }
                                <td>{ order.Customers.name }</td>
                                <td>{ order.address }</td>
                                { tableDetail.description && (
                                    <td className={ 'line-clamp-2' }>{ order.desc }</td>
                                ) }
                                {/**/ }
                                { tableDetail.receiver &&
                                    ( <>
                                        <td className={ 'bg-orange-50' }>{ order.Customers.name }</td>
                                        <td className={ 'bg-orange-50' }>{ order.Customers.address }</td>
                                        <td className={ 'bg-orange-50' }>{ order.Customers.phone }</td>
                                    </> ) }
                                {/**/ }
                                { tableDetail.deliver &&
                                    ( <>
                                        <td className={ 'bg-green-50' }>{ order.nameDelivery }</td>
                                        <td className={ 'bg-green-50' }>{ order.phoneDelivery }</td>
                                    </> ) }
                                {/**/ }
                                { tableDetail.payment &&
                                    ( <>
                                        <td className={ 'bg-red-50' }>{ order.Payments.name }</td>
                                        <td className={ 'bg-red-50' }>{ order.Payments.type }</td>
                                    </> ) }
                                {/**/ }
                                <td className={ 'bg-yellow-50 ' }>{ order.Trolleys.map(d => (
                                    <span key={ d.id } className={ 'text-nowrap' }>
												{ d.Product.name } x { d.qty_at_buy } <br />
											</span>
                                )) }</td>
                                <td className={ 'bg-yellow-50' }>{ order.Trolleys.map(d => toRupiah(d.price_at_buy)).join(', \n') }</td>
                                {/**/ }
                                <td className={ 'bg-red-50' }>{ toRupiah(order.totalPayment) }</td>
                                <td className={ 'bg-green-50' }>{ toRupiah(order.priceDelivery) }</td>
                                <td>{ toRupiah(order.totalAll) }</td>
                                <td className={ ' ' }>
                                    <Link
                                        href={ `/admin/order/${ order.id }` }
                                        className={ 'btn btn-sm btn-square' }
                                    >
                                        <NotebookTabs />
                                    </Link>
                                    {/*<button className={ 'btn btn-sm btn-info btn-square' }>*/ }
                                    {/*	<Pencil/>*/ }
                                    {/*</button>*/ }
                                    {/*<button className={ 'btn btn-sm btn-error btn-square' }>*/ }
                                    {/*	<Trash/>*/ }
                                    {/*</button>*/ }
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            }
        </div>
    );
}

export function OrderSearch({ children }: { children: React.ReactNode }) {
    const { search, setSearch } = useTableStore()

    return ( <>
            <div className="flex justify-between items-center gap-2">
                <div className="join w-full ">
                    <input
                        className="input input-bordered join-item w-full"
                        onChange={ (e) => setSearch(e.target.value) }
                        placeholder="Search"
                        value={ search }
                    />

                    <button
                        className="btn join-item "
                        onClick={ () => {
                            // @ts-ignore
                            document.getElementById('my_modal_filter').showModal()
                        } }
                    >
                        <Filter />
                    </button>
                </div>

                <div className=" flex flex-nowrap gap-2">
                    {/* Open the modal using document.getElementById('ID').showModal() method */ }
                    <Link href={ '/admin/order/create' } className={ 'btn ' }>
                        <Plus />
                    </Link>
                </div>
            </div>
            { children }
        </>

    );
}

export function FilterDialog() {
    const { setStatus, data, setTableDetail, tableDetail } = useTableStore()
    return (
        <dialog id="my_modal_filter" className="modal ">
            <div className="modal-box ">
                <h3 className="font-bold text-lg mb-2">Filter</h3>

                <div className=" space-y-5">
                    <div className="">
                        <h2 className={ 'font-semibold' }>Select Status</h2>
                        <label className="">
                            <select className="select select-bordered w-full"
                                    onChange={ (e) => setStatus(e.target.value) }
                            >
                                <option value={ '' }>All</option>
                                <option value="Pending">Pending</option>
                                <option value="Fail">Fail</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <h2 className="font-semibold">Show Column</h2>
                        <div className="space-y-1">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={ tableDetail.description }
                                    onChange={ () => {
                                        setTableDetail({ description: !tableDetail.description })
                                    } }
                                />
                                <span>Description</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={ tableDetail.receiver }
                                    onChange={ () => {
                                        setTableDetail({ receiver: !tableDetail.receiver })
                                    } }
                                />
                                <span>Receiver</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={ tableDetail.payment }
                                    onChange={ () => {
                                        setTableDetail({ payment: !tableDetail.payment })
                                    } }
                                />
                                <span>Payment</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={ tableDetail.deliver }
                                    onChange={ () => {
                                        setTableDetail({ deliver: !tableDetail.deliver })
                                    } }
                                />
                                <span>Deliver</span>
                            </label>
                        </div>
                    </div>

                    <div className="font-semibold ">
                        <h2>Selected Data : { data.length }</h2>
                        <div className="space-x-2">
                            <Link href={ '/admin/order/export/excel' }
                                  className={ 'btn ' }
                            >
                                Export
                            </Link>
                            <Link href={ '/admin/order/print' }
                                  className={ 'btn btn-error' }
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */ }
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
