import { Travel } from '@/app/components/organisme/form/Travel';
import { GateWay } from '@/lib/utils/ress/GateWay';
import { TRes } from '@/entity/Utils';

// export const dynamic = 'force-dynamic'
export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'


export default async function Page(
  { params: { id } }:
    {
      params: { id: string }
    } ) {

  const defaultData: TRes<TTravel> = await GateWay( 'GET', 'travel', id, )

  return (
    <Travel method={ 'PUT' }
            defaultData={ defaultData.data }
            id={ id }
            to={ 'travel' }/>

  )
}
