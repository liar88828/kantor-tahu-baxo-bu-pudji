import { PageErrorData } from "@/app/components/PageErrorData";
import { ProductDetailPageUser } from "@/app/components/product/product.page";
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/requestHelper";
import { productId } from "@/network/product";

export default async function DetailedProduct(context: TContext) {
    const id: string = await getId(context);
    const response = await productId(id)

    if (!response.data) {
        return (
            <div className="flex justify-center">
                <PageErrorData code={ 404 } msg={ 'Data is not found' } />
            </div>
        )
    }

    return ( <ProductDetailPageUser product={ response.data } /> )
}
