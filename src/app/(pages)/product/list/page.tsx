import { GateWay } from '@/lib/utils/ress/GateWay';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import dynamic from 'next/dynamic';
import { UlCard } from '@/app/components/moleculs/card/Card';
// export const dynamic    = 'force-dynamic'
export const revalidate = 0

// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

const ListProduct = dynamic( () => import("@/app/components/organisme/card/product" ), {
  loading: () => <SkeletonCard/>
} );

export default async function Home() {
  const { data }: { data: Required<TProduct[ ]> } = await GateWay( "GET", 'product', 'all', "", "", 'noCache' )

  return (
    <UlCard>
      { data.map( ( d: TProduct ) => ( <ListProduct d={ d } key={ d.id }/> ) ) }
    </UlCard>
  )
}
