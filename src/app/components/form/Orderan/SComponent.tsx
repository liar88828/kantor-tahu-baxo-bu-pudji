import { TOrder } from '@/entity/client/orderan';
import { CComponent } from '@/app/components/form/Orderan/CComponent';
import { GateWay } from '@/app/utils/ress/GateWay';

export async function SComponent( { id, method, defaultDataOrder, }:
  { id: string, method: "POST" | "PUT", defaultDataOrder: Awaited<TOrder>, } ) {
  const travelData: Promise<{ data: TTravel[], msg: string }>   = GateWay( "GET", "travel" )
  const productData: Promise<{ data: TProduct[], msg: string }> = GateWay( "GET", "product" )
  const bankData: Promise<{ data: TBank[], msg: string }>       = GateWay( 'GET', "bank", "all", )

  const [ travel, product, bank ] = await Promise.all( [ travelData, productData, bankData ] )

  return ( <CComponent id={ id } method={ method }
                       defaultDataOrder={ defaultDataOrder }
                       travel={ travel.data }
                       product={ product.data }
                       bank={ bank.data }
    />
  )
}
