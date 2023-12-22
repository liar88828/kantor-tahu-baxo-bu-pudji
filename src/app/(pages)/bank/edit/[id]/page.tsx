import { TRes } from '@/entity/Utils';
import { GateWay } from '@/lib/ress/GateWay';
import Bank from '@/app/components/organisme/form/Bank';

// export const dynamic = 'force-dynamic'
export const revalidate = 2
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'


export default async function Home( { params: { id } }: { params: { id: string } } ) {

  const data: Awaited<TRes<TBank>> = await GateWay( "GET", "bank", id, )
  // const data: TRes<TBank> = await getData( id )
  return (
    <Bank
      method={ 'PUT' }
      defaultData={ data.data }
      id={ id }
      to={ 'bank' }/>
  )
}

