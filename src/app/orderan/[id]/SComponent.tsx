import { defaultData } from '@/app/utils/ress/orderan';
import { TOrder } from '@/entity/client/orderan';
import { SComponent } from '@/app/components/form/Orderan/SComponent';

export async function SComponents( { id }: {
  id: string
} ) {
  const data: TOrder = await defaultData( id )
  // console.log(data)
  return <SComponent id={ id }
                     method={ "PUT" }
                     defaultDataOrder={ data }/>
}

