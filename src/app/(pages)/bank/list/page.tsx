import { GateWay } from '@/lib/utils/ress/GateWay';
import { ListBank } from '@/app/components/card/Bank';
import { TRes } from '@/entity/Utils';
import { UlCard } from '@/app/elements/card/Card';
import { Suspense } from 'react';
import { SkeletonCard } from '@/app/components/handling/SkeletonCard';

export const revalidate = 10

export default async function Page() {
  const { data }: TRes<TBank[]> = await GateWay( "GET", "bank", "all", {}, "", "cache" )

  return <UlCard>
    <Suspense fallback={ <SkeletonCard/> }>
      { data.map( ( d: TBank ) => ( <ListBank d={ d } key={ d.id }/> ) ) }
    </Suspense>
  </UlCard>
}
