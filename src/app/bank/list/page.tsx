import { getData } from '@/app/utils/ress/bank';
import { LinkNavbar } from '@/app/elements/link/LinksNavbar';
import { CardBank } from '@/app/components/card/bank/CComponent';

export const revalidate = 0
export const runtime    = 'nodejs'
export default async function Page() {
  const data = await getData()
  console.log( data )
  if( !data ) {
    return ( <h1>Data Kosong</h1> )
  }
  return (
    <LinkNavbar>
      <CardBank data={ data.data }/>
    </LinkNavbar>
  )
}
