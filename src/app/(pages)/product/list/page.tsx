import { ListProduct } from '@/app/components/card/product/CComponent';
import { Layout } from '@/app/elements/layout/Layout';
import { GateWay } from '@/app/utils/ress/GateWay';

export const dynamic    = 'force-dynamic'
export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'
export default async function Home() {
  const { data }: { data: Required<TProduct[ ]> } = await GateWay( "GET", 'product', 'all', )

  if( !data ) {
    return ( <h1>Data Kosong</h1> )
  }

  return ( <>
      <Layout >
        <ListProduct data={ data }/>
      </Layout>
    </>

  )
}
