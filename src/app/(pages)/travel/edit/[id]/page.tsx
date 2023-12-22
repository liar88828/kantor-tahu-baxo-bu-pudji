import { TRes } from '@/entity/Utils';
import Travel from '@/app/components/organisme/form/Travel';
import { Fetch } from '@/lib/ress/SendApi';

// export const dynamic = 'force-dynamic'
export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

export default async function Page(
  { params: { id } }:
    {
      params: { id: string }
    } ) {

  const defaultData: TRes<TTravel> = await Fetch( 'travel', 'GET', id, "", "", "noCache" )

  return (
    <Travel method={ 'PUT' }
            defaultData={ defaultData.data }
            id={ id }
            to={ 'travel' }/>

  )
}
