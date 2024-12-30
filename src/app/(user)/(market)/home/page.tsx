import { HomeClientUser, ProductHomeCategoryUser } from "@/app/components/home/home.client";
import { PRODUCT_FILTER_PRICE } from "@/interface/entity/product.model";
import { productNew } from "@/network/product";

export default async function Page() {
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
        <div className={ 'space-y-2' }>
            <ProductHomeCategoryUser />
            <HomeClientUser products={ newProduct } title={ 'New Product' } />
            <HomeClientUser products={ popularProduct } title={ 'Popular Product' } />
            <HomeClientUser products={ lowPriceProduct } title={ 'Economical' } />
        </div>
    )
}
