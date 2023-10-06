import { FormProduct } from '@/app/components/form/FormProduct';
import { Suspense } from 'react';
import { defaultFormProduct } from '@/app/utils/format/product';
// export const dynamic    = 'force-dynamic'

export default function Page() {

  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <FormProduct
        method={ 'POST' }
        defaultData={ defaultFormProduct }
        id={ "" }
        to={ 'product' }/>
    </Suspense>
  )
}

