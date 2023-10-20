import Travel from '@/app/components/organisme/form/Travel';
import { defaultFormTravel } from '../../../../../asset/constants/model/travel';

// export const dynamic    = 'force-dynamic'
export const revalidate = 0

export default function Home() {
  return (
    <Travel
      method={ 'POST' }
      defaultData={ defaultFormTravel }
      id={ "" }
      to={ 'travel' }/>

  )
}
