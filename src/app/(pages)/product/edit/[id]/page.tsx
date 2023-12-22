import { GateWay } from '@/lib/ress/GateWay';
import { Product } from '@/app/components/organisme/form/Product';
import { TRes } from '@/entity/Utils';

export const revalidate = 0
// export const dynamic    = 'force-dynamic'
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

export default async function Page(
  { params: { id } }:
    {
      params: { id: string }
    } ) {

  const defaultData: TRes<TProduct> = await GateWay( 'GET', 'product', id, )

  return (
    <Product method={ 'PUT' }
             defaultData={ defaultData.data }
             id={ id }
             to={ 'product' }/>

  )
}
