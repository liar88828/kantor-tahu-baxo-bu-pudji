import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';
import { TRes } from '@/entity/Utils';
import { UlCard } from '@/app/components/molecules/card/Card';
import { Fetch } from '@/lib/ress/SendApi';
import { SearchParams } from '@/_interface/searchParams';
import DataEmpty from '@/app/components/template/handling/DataEmpty';
import Paginate from '@/app/components/molecules/list/Paginate';
import { ListTravel } from '@/app/(pages)/delivery/Card';

export default async function Home( { searchParams }: SearchParams ) {
  const page                        = Number( searchParams.page )
  const take                        = Number( searchParams.take )
  // console.log(page,take)
  const { data }: TRes<TDelivery[]> = await Fetch(
    {
      method: "GET",
      to    : "delivery",
      // id    : 'all',
      page: page,
      take: take
    } )
  // console.log(data)
  return ( <>
      <UlCard name={ "delivery" }>
        { data.length === 0 ? (
          <DataEmpty/>
        ) : <>
            <Suspense fallback={ <SkeletonCard/> }>
              { data.map( ( d ) => ( <ListTravel d={ d } key={ d.id } to={ 'delivery' }/> ) ) }
            </Suspense>
          </> }
      </UlCard>
      <Paginate
        take={ take }
        page={ page }
        length={ 100 }
      />
    </>
  )
}
