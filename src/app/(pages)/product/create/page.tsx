import { Product } from '@/app/components/organisme/form/Product';
import { defaultFormProduct } from '../../../../../asset/constants/model/product';
// export const dynamic    = 'force-dynamic'

export default function Page() {

  return (
    <Product
      method={ 'POST' }
      defaultData={ defaultFormProduct }
      id={ "" }
      to={ 'product' }/>
  )
}

