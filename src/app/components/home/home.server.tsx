import { HomeProductClientUser } from "@/app/components/home/home.client";
import { PRODUCT_FILTER_PRICE } from "@/interface/entity/product.model";
import { productNew } from "@/network/product";

export async function NewProduct() {
    const newProduct = await productNew({
        pagination: { limit: 20 },
        filter: { new: true }
    })
    .then(res => {
        if (res) {
            return res.data.data
        }
        return res
    })

    return (
        <HomeProductClientUser products={ newProduct } title={ 'New Product' } />
    )
}

export async function LowPriceProduct() {

    const lowPriceProduct = await productNew({
        pagination: { limit: 20 },
        filter: { price: PRODUCT_FILTER_PRICE.LOW }
    })
    .then(res => {
        if (res) {
            return res.data.data
        }
        return res
    })

    return (
        <HomeProductClientUser products={ lowPriceProduct } title={ 'Economical' } />
    )
}

export async function PopularProduct() {

    const popularProduct = await productNew({
        pagination: { limit: 20 },
        filter: { popular: true }
    })
    .then(res => {
        if (res) {
            return res.data.data
        }
        return res
    })

    return (
        <HomeProductClientUser products={ popularProduct } title={ 'Popular Product' } />
    )
}
