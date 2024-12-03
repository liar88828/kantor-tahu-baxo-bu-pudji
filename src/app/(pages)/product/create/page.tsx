import { defaultFormProduct } from '../../../../../asset/constants/model/product';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';
import FormProduct from '@/app/(pages)/product/Form';

export default function Page() {
  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormProduct
        method={ 'POST' }
        defaultData={ defaultFormProduct }
        id={ "" }
        to={ 'product' }/>
    </Suspense>
  )
}

