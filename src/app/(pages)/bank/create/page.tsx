import { defaultFormBank } from '../../../../../asset/constants/model/bank';
import FormBank from '@/app/(pages)/bank/Form';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormBank
        method={ 'POST' }
        defaultData={ defaultFormBank }
        id={ "" }
        to={ 'bank' }/>
    </Suspense>
  )
}

