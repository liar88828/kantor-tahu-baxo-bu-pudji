import { defaultFormBank } from '@/app/utils/format/bank';
import { Suspense } from 'react';
import { FormBank } from '@/app/components/form/FormBank';

export default function Page() {

  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <FormBank
        method={ 'POST' }
        defaultData={ defaultFormBank }
        id={ "" }
        to={ 'bank' }/>
    </Suspense>
  )
}

