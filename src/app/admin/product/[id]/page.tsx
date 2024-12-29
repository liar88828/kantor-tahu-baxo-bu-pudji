import React from 'react'
import { productId } from "@/network/product";
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/requestHelper";
import { ProductDetails, ProductHistory } from "@/app/admin/product/ProductList.client";
import { prisma } from "@/config/prisma";

export default async function ProductDetail(context: TContext) {

    const id = await getId(context)
    const { data: product } = await productId(id)
    const historyProduct = await prisma.orders.findMany(
        {
            include: { Customers: true },
            where: {
                Trolleys: {
                    every: {
                        id_product: id
                    }
                }
            }
        }
    )

    return (
        <div className='p-3 my-4 '>
            <ProductDetails product={ product }/>
            <ProductHistory historyProduct={ historyProduct }/>
        </div>
    )
}
// <div className=" card card-bordered card-compact bg-base-200">
//     <div className="card-body">
//
//         {/* eslint-disable-next-line @next/next/no-img-element */ }
//         <img
//             src="https://picsum.photos/200/300?random=1"
//             alt={ product.name }
//             className="w-full h-48 object-cover rounded"
//         />
//         <div className="grid grid-cols-2 p-2">
//
//             <div className="">
//                 <h2 className="font-bold text-xl mb-2">{ product.name }</h2>
//                 <p className="text-gray-700 text-sm mb-2">{ product.desc }</p>
//                 <p className="text-gray-600 text-sm">
//                     <strong>Type:</strong> { product.type }
//                 </p>
//                 <p className="text-gray-600 text-sm">
//                     <strong>Location:</strong> { product.location }
//                 </p>
//             </div>
//
//             <div className="  ">
//                 <p className="text-gray-200 font-bold text-lg mb-2">
//                     { toRupiah(product.price) }
//                 </p>
//                 <p className="text-gray-600 text-sm">
//                     <strong>Stock:</strong> { product.qty } units
//                 </p>
//                 <p className="text-gray-500 text-sm">
//                     <strong>Last Updated:</strong> { toDate(product.updated_at) }
//                 </p>
//             </div>
//         </div>
//     </div>
// </div>