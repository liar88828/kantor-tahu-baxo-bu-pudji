import { setIdModel } from '@/lib/utils/formatId';

import Service from '@/lib/validation/validation';
import Validation from '@/lib/validation/schema';

import { TMethod, ToModel } from '@/entity/Utils';

// const v = new Validation()
const v = new Validation()
const s = new Service()

export function ValidationModel( to: ToModel, data: any ) {
  if( to === "orderan" ) {
    return s.validModel( v.zodModel( data, v.OrderanSchema ), data )
  }
  if( to === "bank" ) {
    return s.validModel( v.zodModel( data, v.BankSchema ), data )
  }
  if( to === "product" ) {
    return s.validModel( v.zodModel( data, v.ProductSchema ), data )
  }
  if( to === "travel" ) {
    return s.validModel( v.zodModel( data, v.TravelSchema ), data )
  }
  if( to === "semuaProduk" ) {
    return s.validModel( v.zodModel( data, v.semuaProdukSchema ), data )
  }
  return "required"
}

export const validationData = ( method: TMethod, to: ToModel, data: any ) => {
  if( method === "POST" || method === "PUT" ) {

    if( typeof data === "object" ) {
      console.info( "object v" )
      data = ValidationModel( to, data );

      const dataString = JSON.stringify( data )

      if( dataString.includes( "equired" ) ||
        dataString.includes( "essage" ) ||
        dataString.includes( "code" )
      ) {
        console.error( "is error zod validation gateway" )
        return data
      }

      data = data.id.length > 20 ? data : setIdModel( to, data )
      console.info( "success v client" )
      return data
    }
  }
}