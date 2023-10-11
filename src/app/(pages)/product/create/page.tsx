import { Product } from '@/app/components/form/Product';
import { defaultFormProduct } from '@/lib/utils/example/product';
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

