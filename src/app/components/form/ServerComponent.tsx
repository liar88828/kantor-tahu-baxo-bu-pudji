import { TOrder } from '@/entity/client/orderan';
import { getData as getTravelData } from '@/app/utils/ress/travel';
import { getData as getProductData } from '@/app/utils/ress/product';
import { ClientComponent } from '@/app/components/form/Orderan';

export async function ServerComponent( { id = "", method = "POST", defaultDataOrder, }:
  { id: string, method: string, defaultDataOrder: Awaited<TOrder>, } ) {
  const travelData: Promise<{ data: TTravel[], msg: string }>   = getTravelData()
  const productData: Promise<{ data: TProduct[], msg: string }> = getProductData()

  const [ travel, product ] = await Promise.all( [ travelData, productData ] )
  return ( <ClientComponent id={ id }
                            method={ method }
                            defaultDataOrder={ defaultDataOrder }
                            travel={ travel.data }
                            product={ product.data }/>
  )
}
