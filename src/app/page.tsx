import ServerComponent from '@/app/(pages)/dashboard/dashboard';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';
import { SearchParams } from '@/interface/searchParams';

export default async function Page( { searchParams }: SearchParams ) {
  return <Suspense fallback={ <SkeletonCard/> }>
    <ServerComponent id={ searchParams.id as string ?? 'Kirim' }/>
  </Suspense>
}


