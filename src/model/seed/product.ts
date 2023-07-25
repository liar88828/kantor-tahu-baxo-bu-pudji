import times from 'lodash.times';
import { TProduct } from '@/entity/produk';
import { factoryProduct } from '@/model/factory/product';

export function seedProduct(): TProduct[] {
  return times( 12, () => ( factoryProduct )
  )
}
