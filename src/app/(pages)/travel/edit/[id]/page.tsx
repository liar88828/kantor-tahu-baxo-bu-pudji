import { FormTravel } from '@/app/components/form/FormTravel';
import { GateWay } from '@/app/utils/ress/GateWay';
import { Suspense } from 'react';
import { TRes } from '@/entity/Utils';

export const dynamic = 'force-dynamic'
// export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'


export default async function Page(
  { params: { id } }:
    {
      params: { id: string }
    } ) {

  const defaultData: TRes<TTravel> = await GateWay( 'GET', 'travel', id, )

  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <FormTravel method={ 'PUT' }
                  defaultData={ defaultData.data }
                  id={ id }
                  to={ 'travel' }/>
    </Suspense>

  )
}
