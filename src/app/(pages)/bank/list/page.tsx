import { GateWay } from '@/lib/utils/ress/GateWay';
import { ListBank } from '@/app/components/organisme/card/Bank';
import { TRes } from '@/entity/Utils';
import { Suspense } from 'react';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { UlCard } from '@/app/components/moleculs/card/Card';

export const revalidate = 0

export default async function Page() {
  const { data }: TRes<TBank[]> = await GateWay( "GET", "bank", "all", {}, "", "noCache" )

  return <UlCard>
    <Suspense fallback={ <SkeletonCard/> }>
      { data.map( ( d: TBank ) => ( <ListBank d={ d } key={ d.id }/> ) ) }
    </Suspense>
  </UlCard>
}
