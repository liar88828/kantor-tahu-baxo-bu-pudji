import { ListBank } from '@/app/components/organisme/card/Bank';
import { TRes } from '@/entity/Utils';
import { Suspense } from 'react';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { UlCard } from '@/app/components/molecules/card/Card';
import Paginate from '@/app/components/molecules/list/Paginate';
import { Fetch } from '@/lib/ress/SendApi';

export const revalidate = 0

export default async function Page() {
  const { data }: TRes<TBank[]> = await Fetch( "bank", "GET", "all", "", "", "noCache" )
  console.log( data )
  return <>
    <UlCard name={ "bank" }>
      <Suspense fallback={ <SkeletonCard/> }>
        { data.map( ( d: TBank ) => ( <ListBank d={ d } key={ d.id }/> ) ) }
      </Suspense>
    </UlCard>
    <Paginate/>
  </>
}
