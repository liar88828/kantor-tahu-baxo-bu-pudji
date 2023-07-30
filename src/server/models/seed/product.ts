import times        from 'lodash.times';
import { TProduct } from '@/entity/client/produk';
import { factoryProduct } from '@/server/models/factory/product';

export function seedProduct(): TProduct[] {
  return times( 12, () => ( factoryProduct )
  )
}
