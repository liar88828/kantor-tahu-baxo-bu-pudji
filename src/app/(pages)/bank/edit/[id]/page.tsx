import { TRes } from '@/entity/Utils';
import { FormBank } from '@/app/components/form/FormBank';
import { config } from '../../../../../../config.dev';
import { GateWay } from '@/app/utils/ress/GateWay';

export const dynamic = 'force-dynamic'
// export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

// async function getData( id :string) {
//   const res = await fetch( config.url + '/api/bank?id=' + id ,{cache:'no-store'})
//   return res.json()
// }

export default async function Home( { params: { id } }: { params: { id: string } } ) {

  const data: Awaited<TRes<TBank>> = await GateWay( "GET", "bank", id, )
  // const data: TRes<TBank> = await getData( id )
  return (
    <FormBank
      method={ 'PUT' }
      defaultData={ data.data }
      id={ id }
      to={ 'bank' }/>

  )
}

