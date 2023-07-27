import { TOrder } from '@/entity/orderan';
import { TOrderValid } from '@/entity/server/orderan';

const validate = ( data: TOrder ) => {

  const datas: TOrderValid = Object.assign( data, { valid: true } )
  return datas
}

export { validate }