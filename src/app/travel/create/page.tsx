import { FormTravel } from '@/app/components/form/FormTravel';
import { defaultFormTravel } from '@/app/utils/format/travel';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <FormTravel
        method={ 'POST' }
        defaultData={ defaultFormTravel }
        id={ "" }
        to={ 'travel' }/>
    </Suspense>

  )
}
