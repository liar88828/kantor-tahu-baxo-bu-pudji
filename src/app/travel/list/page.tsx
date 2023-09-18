import { CardTravel } from '@/app/components/card/travel/CComponent';
import { FormBody } from '@/app/elements/link/LinksNavbar';
import { GateWay } from '@/app/utils/ress/GateWay';

export const dynamic    = 'auto'
export const revalidate = 0
export const fetchCache = 'auto'
export const runtime    = 'nodejs'

export default async function Home() {
  const { data }: { data: Required<TTravel[ ]>, msg: string } = await GateWay( "GET", "travel", 'all' )

  if( !data ) {
    return ( <h1>Data Kosong</h1> )
  }
  return (
    <FormBody>
      <CardTravel data={ data }/>
    </FormBody>
  )
}
