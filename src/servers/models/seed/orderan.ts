import { TOrder } from '@/entity/client/orderan';
import { factoryOrderan } from '@/servers/models/factory/orderan';

export function seedOrderan(): TOrder[] {
  return Array.from( { length: 12 } ).map( () => ( factoryOrderan )
  )
}
