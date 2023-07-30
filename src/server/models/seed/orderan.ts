import { TOrder } from '@/entity/client/orderan';
import times      from 'lodash.times';
import { factoryOrderan } from '@/server/models/factory/orderan';

export function seedOrderan(): TOrder[] {
  return times( 12, () => ( factoryOrderan )
  )
}
