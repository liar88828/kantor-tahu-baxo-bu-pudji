import { ListProduct } from '@/app/components/card/product/CComponent';
import { FormBody } from '@/app/elements/link/LinksNavbar';
import { GateWay } from '@/app/utils/ress/GateWay';

export const revalidate = 0
export const runtime    = 'nodejs'

export default async function Home() {
  const { data }: { data: Required<TProduct[ ]> } = await GateWay( "GET", 'product', 'all', )

  if( !data ) {
    return ( <h1>Data Kosong</h1> )
  }

  return ( <>
      <FormBody>
        <ListProduct data={ data }/>
      </FormBody>
    </>

  )
}
