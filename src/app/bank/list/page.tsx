import { FormBody } from '@/app/elements/link/LinksNavbar';
import { GateWay } from '@/app/utils/ress/GateWay';
import { ListBank } from '@/app/components/card/bank/Bank';
import { TRes } from '@/entity/Utils';

export const dynamic    = 'auto'
export const revalidate = 0
export const fetchCache = 'auto'
export const runtime    = 'nodejs'
export default async function Page() {
  const data: TRes<TBank[]> = await GateWay( "GET", "bank", "all", {} )
  if( !data ) {
    return ( <h1>Data Kosong</h1> )
  }

  return (
    <FormBody>
      <ListBank data={ data.data }/>
    </FormBody>
  )
}
