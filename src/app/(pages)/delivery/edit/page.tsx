import { Fetch } from '@/lib/ress/SendApi';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';
import FormDeliver from '@/app/(pages)/delivery/Form';
import { SearchParams } from '@/interface/searchParams';
import { TRes } from '@/interface/Utils';

export default async function Page( { searchParams }: SearchParams ) {

  const data: Awaited<TRes<TDelivery>> = await Fetch(
    {
      method: "GET", to: "delivery", id: searchParams.id
    } )

  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormDeliver method={ 'PUT' }
                   defaultData={ data.data }
                   id={ searchParams.id as string }
                   to={ 'delivery' }/>
    </Suspense>

  )
}
