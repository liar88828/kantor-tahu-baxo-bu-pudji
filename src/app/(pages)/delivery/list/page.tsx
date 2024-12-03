import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';
import DataEmpty from '@/app/components/template/handling/DataEmpty';
import { ListTravel } from '@/app/(pages)/delivery/Card';
import prisma from '@/servers/data-source/prisma/config';
import { SearchParams } from '@/interface/searchParams';
import { UlCard } from '@/app/components/Card';
import Paginate from '@/app/element/Paginate';

export default async function Home( { searchParams }: SearchParams ) {
  const page = Number( searchParams.page )
  const take = Number( searchParams.take )
  // console.log(page,take)
  // const { data }: TRes<TDelivery[]> = await Fetch(
  //   {
  //     method: "GET",
  //     to    : "delivery",
  //     // id    : 'all',
  //     page: page,
  //     take: take
  //   } )

  const [ data, length ] = await Promise.all( [
    prisma.delivery.findMany( { skip: ( page - 1 ) * take, take: take } ),
    prisma.delivery.count( { take: 100 } )
  ] )

  // console.log(data)

  // if( !data ) {
  //   return <Loading/>
  // }

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
        length={ length }
      />
    </>
  )
}
