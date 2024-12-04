import { defaultFormTravel } from '../../../../../asset/constants/model/travel';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';
import FormDeliver from '@/app/(pages)/delivery/Form';

// // export const dynamic    = 'force-dynamic'
// export const revalidate = 0

export default function Home() {
  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormDeliver
        method={ 'POST' }
        defaultData={ defaultFormTravel }
        id={ "" }
        to={ 'delivery' }/>
    </Suspense>
  )
}
