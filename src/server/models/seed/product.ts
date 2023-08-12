import { factoryProduct } from '@/server/models/factory/product';

export function seedProduct(): TProduct[] {
  return Array( 100 ).map( () => ( factoryProduct )
  )
}
