import { ListProduct } from '@/app/components/card/product/CComponent';
import { LinkNavbar } from '@/app/elements/link/LinksNavbar';
import { sendData } from '@/app/utils/ress/SendApi';

export const revalidate = 0
export const runtime    = 'nodejs'

export default async function Home() {
  const { data }: { data: TProduct[ ] } = await sendData<TProduct[]>( "product", "GET", "", {} );

  if( !data ) {
    return ( <h1>Data Kosong</h1> )
  }

  return ( <>
      <LinkNavbar>
        <ListProduct data={ data }/>
      </LinkNavbar>
    </>

  )
}
