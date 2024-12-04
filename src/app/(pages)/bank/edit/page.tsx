import { Fetch } from '@/lib/ress/SendApi';
import FormBank from '@/app/(pages)/bank/Form';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';
import { SearchParams } from '@/interface/searchParams';
import { TRes } from '@/interface/Utils';

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

