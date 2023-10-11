import { GateWay } from '@/lib/utils/ress/GateWay';
import { UlCard } from '@/app/elements/card/Card';
import { lazy, Suspense } from "react"
import { SkeletonCard } from '@/app/components/handling/SkeletonCard';
// export const dynamic    = 'force-dynamic'
export const revalidate = 10

// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

const ListProduct = lazy( () => import("@/app/components/card/product" ) );


export default async function Home() {
  const { data }: { data: Required<TProduct[ ]> } = await GateWay( "GET", 'product', 'all', )

  if( !data ) {
    return ( <h1>Data Kosong</h1> )
  }

  return (
    <UlCard>
      <Suspense fallback={ <SkeletonCard/> }>
        { data.map( ( d: TProduct ) => ( <ListProduct d={ d } key={ d.id }/> ) ) }
      </Suspense>
    </UlCard>
  )
}
