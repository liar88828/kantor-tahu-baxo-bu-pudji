import { LinkNavbar } from '@/app/elements/link/LinksNavbar';
import { CardBank } from '@/app/components/card/bank/CComponent';
import { GateWay } from '@/app/utils/ress/GateWay';

export const revalidate = 0
export const runtime    = 'nodejs'
export default async function Page() {
  const data = await GateWay( "GET", "bank", "all", {} )
  if( !data ) {
    return ( <h1>Data Kosong</h1> )
  }

  return (
    <LinkNavbar>
      <CardBank data={ data.data }/>
    </LinkNavbar>
  )
}
