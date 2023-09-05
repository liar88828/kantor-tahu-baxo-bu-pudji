import { TOrder } from '@/entity/client/orderan';
import { getData as getTravelData } from '@/app/utils/ress/travel';
import { getData as getProductData } from '@/app/utils/ress/product';
import { getData as getBankData } from '@/app/utils/ress/bank';
import { CComponent } from '@/app/components/form/Orderan/CComponent';

export async function SComponent( { id, method, defaultDataOrder, }:
  { id: string, method: "POST" | "PUT", defaultDataOrder: Awaited<TOrder>, } ) {
  const travelData: Promise<{ data: TTravel[], msg: string }>   = getTravelData()
  const productData: Promise<{ data: TProduct[], msg: string }> = getProductData()
  const bankData: Promise<{ data: TBank[], msg: string }>       = getBankData()

  const [ travel, product, bank ]                               = await Promise.all( [ travelData, productData, bankData ] )

  return ( <CComponent id={ id } method={ method }
                       defaultDataOrder={ defaultDataOrder }
                       travel={ travel.data }
                       product={ product.data }
                       bank={ bank.data }
    />
  )
}
