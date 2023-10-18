import dynamic from 'next/dynamic'
import { defaultFormBank } from '@/lib/utils/example/bank';

const Form = dynamic( () => import('@/app/components/organisme/form/Bank')
  , { loading: () => <p>Loading...</p>, }
)

export default function Page() {
  // console.log(OtherComponent)

  return (
    <Form
        method={ 'POST' }
        defaultData={ defaultFormBank }
        id={ "" }
        to={ 'bank' }/>
  )
}

