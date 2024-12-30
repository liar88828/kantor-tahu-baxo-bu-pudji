'use client'
import Link from "next/link";
import React from "react";
import usePayment, { PAYMENT } from "@/hook/usePayment";
import { PageErrorData } from "@/app/components/PageErrorData";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { PaymentCardPageAdmin } from "@/app/components/payment/payment.page";
import { PaymentCreate } from "@/validation/payment.valid";
import { Plus } from "lucide-react";
import { ResponseAll, TReactFormHookComponent } from "@/interface/server/param";
import { TPaymentCreate, TPaymentDB } from "@/interface/entity/payment.model";
import { useDebounce } from "@/hook/useDebounce";
import { useForm } from "react-hook-form";
import { usePaymentStore } from "@/store/payment";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

export function PaymentFormClientAdmin({ defaultValues, method, id, }: TReactFormHookComponent<TPaymentCreate>) {
    const { onUpsert } = usePayment()
    const { handleSubmit, register, formState: { errors } } = useForm<TPaymentCreate>({
        resolver: zodResolver(PaymentCreate), defaultValues
    });
    const onSubmitAction = async (data: TPaymentCreate) => {
        await onUpsert({ method, data, id })
    }

    return (
        <div>
            <div className="card">

                <form className='card-body' onSubmit={ handleSubmit(onSubmitAction) }>
                    <h2 className={ 'card-title mb-5' }>Form { method === 'POST' ? "Create" : 'Update' } Payment</h2>

                    {/* Name */ }
                    <div className="">
                        <label htmlFor="name">Name</label>
                        <input
                            className='input input-bordered w-full'
                            type="text"
                            { ...register("name", { required: "Name is required" }) }
                        />
                        { errors.name && <p className="text-red-500">{ errors.name.message }</p> }
                    </div>

                    {/* Phone */ }
                    <div className="">
                        <label htmlFor="phone">Phone</label>
                        <input
                            className='input input-bordered w-full'
                            type="text"
                            { ...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10,15}$/,
                                    message: "Invalid phone number"
                                }
                            }) }
                        />
                        { errors.phone && <p className="text-red-500">{ errors.phone.message }</p> }
                    </div>

                    {/* Address */ }
                    <div className="">
                        <label htmlFor="address">Address</label>
                        <input
                            className='input input-bordered w-full'
                            type="text"
                            { ...register("address", { required: "Address is required" }) }
                        />
                        { errors.address && <p className="text-red-500">{ errors.address.message }</p> }
                    </div>

                    {/* Type */ }
                    <div className="">
                        <label htmlFor="type">Type</label>
                        <input
                            className='input input-bordered w-full'
                            type="text"
                            { ...register("type", { required: "Type is required" }) }
                        />
                        { errors.type && <p className="text-red-500">{ errors.type.message }</p> }
                    </div>

                    {/* Accounting */ }
                    <div className="">
                        <label htmlFor="accounting">Accounting</label>
                        <input
                            className='input input-bordered w-full'
                            type="number"
                            { ...register("accounting", {
                                required: "Accounting is required",
                                // valueAsNumber: true,
                            }) }
                        />
                        { errors.accounting && <p className="text-red-500">{ errors.accounting.message }</p> }
                    </div>

                    {/* Image */ }
                    <div className="">
                        <label htmlFor="img">Image URL</label>
                        <input
                            className='input input-bordered w-full'
                            type="url"
                            { ...register("img", {
                                required: "Image URL is required",
                                pattern: {
                                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
                                    message: "Invalid image URL"
                                }
                            }) }
                        />
                        { errors.img && <p className="text-red-500">{ errors.img.message }</p> }
                    </div>

                    {/* Description */ }
                    <div className="">
                        <label htmlFor="desc">Description</label>
                        <textarea
                            className='textarea textarea-bordered w-full'
                            { ...register("desc", { required: "Description is required" }) }
                        />
                        { errors.desc && <p className="text-red-500">{ errors.desc.message }</p> }
                    </div>

                    <button className='btn btn-info mt-4' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export function PaymentListClientAdmin() {
    const { onDelete, onGet } = usePayment()
    const { search } = usePaymentStore();
    const searchDebounce = useDebounce(search,)
    const { payments, isError, isFetching } = onGet(searchDebounce, search);
    if (isFetching || !payments) return <PageLoadingSpin />
    if (payments.length === 0 || isError) return <PageErrorData code={ 404 } msg={ 'Data Payment is Empty' } />

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3 gap-2 mb-20 ">
            { payments.map(payment => (
                <PaymentCardPageAdmin
                    key={ payment.id }
                    payment={ payment }
                    onDeleteAction={ () => onDelete(payment.id) }
                />
            )) }
        </div>
    )
}

export function PaymentSearchClientAdmin({ children }: { children: React.ReactNode }) {
    const { search, setSearch } = usePaymentStore();
    const queryClient = useQueryClient();
    const payments = queryClient.getQueryData<{ data: ResponseAll<TPaymentDB> }>([ PAYMENT.KEY, '' ])
    return (
        <>
            <div className="flex justify-between mb-4 gap-3">
                <input
                    type="text"
                    className='input input-bordered w-full'
                    placeholder='search...'
                    onChange={ (e) => setSearch(e.target.value) }
                    value={ search }
                    list="payments"
                />

                <datalist id="payments">
                    { payments?.data.data
                    .slice(0, 10)
                    .map((item) => (
                        <option
                            key={ item.id }
                            value={ item.name }
                        >
                            { item.name }
                        </option>
                    )) }
                </datalist>
                <Link href={ '/admin/payment/create' } className='btn btn-square'>
                    <Plus />
                </Link>
            </div>
            { children }
        </>
    );
}
