import { CardTravel } from '@/app/components/card/travel/CComponent';
import { LinkNavbar } from '@/app/elements/link/LinksNavbar';
import { GateWay } from '@/app/utils/ress/GateWay';

export const revalidate = 0
export const runtime    = 'nodejs'
export const dynamic    = 'force-dynamic'
export default async function Home() {
  const { data }: { data: Required<TTravel[ ]>, msg: string } = await GateWay( "GET", "travel" )

  if( !data ) {
    return ( <h1>Data Kosong</h1> )
  }
  return (
    <LinkNavbar>
      <CardTravel data={ data }/>
    </LinkNavbar>
  )
}
