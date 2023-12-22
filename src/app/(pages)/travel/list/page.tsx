import { ListTravel } from '@/app/components/organisme/card/travel';
import { GateWay } from '@/lib/ress/GateWay';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';
import { TRes } from '@/entity/Utils';
import { UlCard } from '@/app/components/molecules/card/Card';

// export const dynamic = 'force-dynamic'
export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

export default async function Home() {
  const { data }: TRes<TTravel[]> = await GateWay( "GET", "travel", 'all', "", "", "cache" )

  return (
    <UlCard name={ "travel" }>
      <Suspense fallback={ <SkeletonCard/> }>
        { data.map( ( d ) => ( <ListTravel d={ d } key={ d.id }/> ) ) }
      </Suspense>

    </UlCard>
  )
}
