import Bank from '@/app/components/organisme/form/Bank';
import { defaultFormBank } from '../../../../../asset/constants/model/bank';

export default function Page() {
  // console.log(OtherComponent)
  return (
    <Bank
      method={ 'POST' }
      defaultData={ defaultFormBank }
      id={ "" }
      to={ 'bank' }/>
  )
}

