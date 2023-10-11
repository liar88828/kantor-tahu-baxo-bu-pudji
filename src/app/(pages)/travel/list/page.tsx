import { ListTravel } from '@/app/components/card/travel';
import { GateWay } from '@/lib/utils/ress/GateWay';
import { UlCard } from '@/app/elements/card/Card';
import { SkeletonCard } from '@/app/components/handling/SkeletonCard';
import { Suspense } from 'react';
import { TRes } from '@/entity/Utils';

// export const dynamic = 'force-dynamic'
export const revalidate = 10
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

export default async function Home() {
  const { data }: TRes<TTravel[]> = await GateWay( "GET", "travel", 'all', "", "", "cache" )

  return (
    <UlCard>
      <Suspense fallback={ <SkeletonCard/> }>
        { data.map( ( d ) => ( <ListTravel d={ d } key={ d.id }/> ) ) }
      </Suspense>
    </UlCard>
  )
}
