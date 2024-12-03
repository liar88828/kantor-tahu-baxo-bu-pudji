import { TOrder } from '@/entity/client/orderan';
import { CComponent } from '@/app/components/form/Orderan/CComponent';
import { GateWay } from '@/app/utils/ress/GateWay';
import { exampleBank, exampleProduct, exampleTravel } from '@/app/utils/ress/ErrorData';
import { TRes } from '@/entity/Utils';

export async function SComponent( { id, method, defaultDataOrder, }:
  { id: string, method: "POST" | "PUT", defaultDataOrder: Awaited<TOrder>, } ) {

  const travelData: Promise<TRes<TTravel[]>>   = GateWay( "GET", "travel", 'all', "", "", 'noCache' )
  const productData: Promise<TRes<TProduct[]>> = GateWay( "GET", "product", 'all', "", "", 'noCache' )
  const bankData: Promise<TRes<TBank[]>>       = GateWay( 'GET', "bank", "all", "", "", 'noCache' )

  const [ { data: travel }, { data: product }, { data: bank } ] = await Promise.all( [ travelData, productData, bankData ] )

  return ( <CComponent id={ id } method={ method }
                       defaultDataOrder={ defaultDataOrder }
                       travel={ NotNull<TTravel>( travel, exampleTravel ) }
                       product={ NotNull<TProduct>( product, exampleProduct ) }
                       bank={ NotNull<TBank>( bank, exampleBank ) }
    />
  )
}

export function NotNull<T>( data: T[], error: T ) {
  return !data ? [ error ] : data

}