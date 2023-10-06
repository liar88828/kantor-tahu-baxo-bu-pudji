import { GateWay } from '@/app/utils/ress/GateWay';
import { FormProduct } from '@/app/components/form/FormProduct';
import { Suspense } from 'react';
import { TRes } from '@/entity/Utils';

export const dynamic    = 'force-dynamic'
export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

export default async function Page(
  { params: { id } }:
    {
      params: { id: string }
    } ) {

  const defaultData: TRes<TProduct> = await GateWay( 'GET', 'product', id, )

  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <FormProduct method={ 'PUT' }
                   defaultData={ defaultData.data }
                   id={ id }
                   to={ 'product' }/>
    </Suspense>

  )
}
