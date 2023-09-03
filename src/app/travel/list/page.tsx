import { getData } from '@/app/utils/ress/travel';
import { CardTravel } from '@/app/components/card/travel/CComponent';
import { LinkNavbar } from '@/app/elements/link/LinksNavbar';

export const revalidate = 0
export const runtime    = 'nodejs'
export const dynamic    = 'force-dynamic'
export default async function Home() {
  const { data }: { data: Required<TTravel[ ]>, msg: string } = await getData()

  if( !data ) {
    return ( <h1>Data Kosong</h1> )
  }
  return (
    <LinkNavbar>
      <CardTravel data={ data }/>
    </LinkNavbar>
  )
}
