import { CardTravel } from '@/app/components/card/travel/CComponent';
import { Layout } from '@/app/elements/layout/Layout';
import { GateWay } from '@/app/utils/ress/GateWay';

export const dynamic = 'force-dynamic'
// export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

export default async function Home() {
  const { data }: { data: Required<TTravel[ ]>, msg: string } = await GateWay( "GET", "travel", 'all' )

  if( !data ) {
    return ( <h1>Data Kosong</h1> )
  }
  return (
    <Layout>
      <CardTravel data={ data }/>
    </Layout>
  )
}
