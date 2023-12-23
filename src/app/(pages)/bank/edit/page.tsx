import { TRes } from '@/entity/Utils';
import { Fetch } from '@/lib/ress/SendApi';
import FormBank from '@/app/(pages)/bank/Form';
import { SearchParams } from '@/_interface/searchParams';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';

export default async function Home( { searchParams }: SearchParams ) {

  const data: Awaited<TRes<TBank>> = await Fetch(
    { method: "GET", to: "bank", id: searchParams.id } )
  console.log( data )
  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormBank
        method={ 'PUT' }
        defaultData={ data.data }
        id={ searchParams.id as string }
        to={ 'bank' }/>
    </Suspense>
  )
}

