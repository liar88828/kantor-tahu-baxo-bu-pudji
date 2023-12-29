import { Fetch } from '@/lib/ress/SendApi';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';
import FormProduct from '@/app/(pages)/product/Form';
import { SearchParams } from '@/interface/searchParams';
import { TRes } from '@/interface/Utils';

export default async function Page(
  { searchParams }: SearchParams ) {

  const data: Awaited<TRes<TProduct>> = await Fetch(
    {
      method: "GET", to: "product", id: searchParams.id
    } )

  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormProduct method={ 'PUT' }
                   defaultData={ data.data }
                   id={ searchParams.id as string }
                   to={ 'product' }/>
    </Suspense>
  )
}
