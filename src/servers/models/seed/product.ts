import { factoryProduct } from '@/servers/models/factory/product';

export function seedProduct(): TProduct[] {
  return Array( 100 ).map( () => ( factoryProduct )
  )
}
