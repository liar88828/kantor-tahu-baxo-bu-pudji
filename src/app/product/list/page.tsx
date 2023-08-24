import { getData } from '@/app/utils/ress/product';
import { ListProduct } from '@/app/components/card/product/CComponent';
import { LinkNavbar } from '@/app/elements/link/LinksNavbar';

export default async function Home() {
  const { data }: { data: TProduct[ ] } = await getData()

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
