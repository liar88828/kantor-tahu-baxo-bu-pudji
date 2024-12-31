import { useDeliveryStore } from "@/store/delivery";
import { Plus, Search } from "lucide-react";
import React from "react";
import { usePaymentStore } from "@/store/payment";

import { PageLoadingSpin } from "@/app/components/LoadingData";
import useTrolleyStore from "@/store/trolley";
import { EmptyData } from "@/app/components/PageErrorData";
import { useProductStore } from "@/store/product";
import {
    DeliveryActionItem,
    DeliveryListDialog,
    PaymentActionItem,
    PaymentDialogList,
    ProductOrderDialog,
    ProductSelectedList
} from "@/app/components/order/order.page";
//

export function DeliveryActionDialog() {
    const { setDelivery, delivery, getDeliveryData } = useDeliveryStore()
    return (
        <div className="">
            <div className=" mb-2">
                <h1 className="card-title">Delivery</h1>
            </div>
            <div className=" mt-2">
                <div className="">
                    <div className="space-y-2">
                        { !delivery
                            ? <DeliveryFormActionDialog />
                            : <DeliveryActionItem
                                key={ delivery.id }
                                delivery={ delivery }
                                onClick={ () => setDelivery(null) }
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DeliveryFormActionDialog() {
    const { getDeliveryData } = useDeliveryStore()
    return (
        <button
            type="button"
            className="btn join-item "
            onClick={ async () => {
                await getDeliveryData()
                // @ts-ignore
                document.getElementById('my_modal_delivery').showModal()
            } }
        >
            <Search />
        </button>
    )
}

export function DeliveryShowLoadDialog() {
    const { setDelivery, deliveryData, setSearch, search, isLoading } = useDeliveryStore()

    return (
        <dialog id="my_modal_delivery" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Please Add</h3>
                { isLoading
                    ? <PageLoadingSpin />
                    : (
                        <div className="">
                            {/*<p className="py-4">Press ESC key or click the button below to close</p>*/ }
                            <div className="flex justify-between py-4">
                                <input
                                    className={ 'input input-bordered w-full' }
                                    type="text"
                                    onChange={ (e) => setSearch(e.target.value) }
                                    value={ search }
                                    placeholder="Search..."
                                />
                            </div>
                            <div className=" space-y-2">
                                { deliveryData &&
                                    deliveryData
                                    .filter(data => data.name.toLowerCase().includes(search.toLowerCase()))
                                    .map(delivery => (
                                            <DeliveryListDialog
                                                key={ delivery.id }
                                                delivery={ delivery }
                                                onClick={ () => setDelivery(delivery) }
                                            />
                                        )
                                    ) }
                            </div>
                        </div>
                    )
                }

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */ }
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

//

export function PaymentActionDialog() {
    const { getPaymentData, setPayment, payment } = usePaymentStore()

    return <div className="">
        <div className="mb-2">
            <h1 className="card-title">Payment</h1>
        </div>
        <div className=" mt-2">
            <div className="">
                <div className="space-y-2">
                    { !payment
                        ? <>
                            <button className="btn btn-neutral w-full"
                                    onClick={ async () => {
                                        await getPaymentData()
                                        // @ts-ignore
                                        document.getElementById('my_modal_payment').showModal()
                                    } }
                            >
                                Please Add Payment <Plus />
                            </button>
                        </>
                        : (
                            <PaymentActionItem
                                payment={ payment }
                                onDeleteAction={ () => setPayment(null) }
                            />
                        )
                    }
                </div>
            </div>
        </div>
    </div>

}

export function PaymentFormActionDialog() {
    const { getPaymentData } = usePaymentStore()

    return <button className="btn join-item"
                   type={ 'button' }
                   onClick={ async () => {
                       await getPaymentData()
                       // @ts-ignore
                       document.getElementById('my_modal_payment').showModal()
                   } }
    >
        <Search />
    </button>
}

export function PaymentShowLoadDialog() {
    const { setSearch, setPayment, paymentData, search, } = usePaymentStore()

    return (
        <dialog id="my_modal_payment" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Please Select Payment Methods</h3>
                {/*<p className="py-4">Press ESC key or click the button below to close</p>*/ }
                <input
                    className={ 'input input-bordered w-full' }
                    type="text"
                    onChange={ (e) => {
                        setSearch(e.target.value)
                    } }
                    value={ search }
                    placeholder="Search..."
                />
                <div className="space-y-2 mt-2">
                    {
                        paymentData &&
                        paymentData
                        .filter(data => data.name.toLowerCase().includes(search.toLowerCase()))
                        .map(payment => (
                            <PaymentDialogList
                                key={ payment.id }
                                payment={ payment }
                                onClick={ () => {
                                    setPayment(payment);
                                } }
                            />
                        )) }
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */ }
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

//
export function ProductActionDialogUser() {
    const { onIncrement, onDecrement, onRemove, setQty, onSelected } = useTrolleyStore();

    return (
        <div className="">
            <div className="px-2 mb-2">
                <div className="flex justify-between">
                    <h1 className="card-title">Product</h1>
                </div>
            </div>

            <div className="space-y-2  rounded-2xl ">
                { !onSelected
                    ? <EmptyData page={ 'checkout' } />
                    : onSelected.map(trolley => (
                        <ProductSelectedList
                            key={ trolley.id_product }
                            product={ trolley }
                            onChangeQty={ (e) => setQty(trolley.id_product, Number(e.target.value)) }
                            onRemoveAction={ () => onRemove(trolley.id_product) }
                            onIncrementAction={ () => onIncrement(trolley.id_product) }
                            onDecrementAction={ () => onDecrement(trolley.id_product) }
                        />
                    )) }
            </div>
        </div>
    )
}

export function ProductShowDialog() {

    const {
        productAsync,
        isLoading,
        idProduct,
        setProduct,
    } = useProductStore()

    return (
        <dialog id="my_modal_product" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Please Select The Product</h3>
                <div className="space-y-2">
                    { isLoading
                        ? <PageLoadingSpin />
                        : productAsync
                        .filter(product => !idProduct.includes(product.id))
                        .map(product => (
                            <ProductOrderDialog
                                key={ product.id }
                                product={ product }
                                onClick={ () => setProduct(product) }
                            />
                        )) }
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */ }
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export function ProductActionDialogAdmin() {
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
            <div className=" mt-2">
                <div className="space-y-2">
                    { !productStore
                        ? <EmptyData page={ 'Checkout Product' } />
                        : productStore.map(product => (
                            <ProductSelectedList
                                key={ product.id_product }
                                product={ product }
                                onChangeQty={ (e) => setQty(product.id_product, Number(e.target.value)) }
                                onRemoveAction={ () => onRemove(product.id_product) }
                                onIncrementAction={ () => onIncrement(product.id_product) }
                                onDecrementAction={ () => onDecrement(product.id_product) }
                            />
                        ))
                    }
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
                Add Product
                <Plus />
            </button>
        </div>
    );
}
