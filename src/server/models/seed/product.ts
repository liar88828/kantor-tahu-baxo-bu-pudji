import { factoryProduct } from '@/server/models/factory/product';
import { TProductDB } from "@/entity/product.model";

export function seedProduct(): TProductDB[] {
  return Array( 100 ).map( () => ( factoryProduct )
  )
}
