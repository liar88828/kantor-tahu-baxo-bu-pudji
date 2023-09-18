import { setIdModel } from '@/lib/utils/formatId';

import Schema from '@/lib/validation/schema';

import { TMethod, ToModel } from '@/entity/Utils';
import Validation from '@/lib/validation/validation';

// const s = new Validation()
const s = new Schema()
const v = new Validation()

export function ValidationModel( to: ToModel, data: any ) {
  if( to === "orderan" ) {
    return v.validModel( s.zodModel( data, s.OrderanSchema ), data )
  }
  if( to === "bank" ) {
    return v.validModel( s.zodModel( data, s.BankSchema ), data )
  }
  if( to === "product" ) {
    return v.validModel( s.zodModel( data, s.ProductSchema ), data )
  }
  if( to === "travel" ) {
    return v.validModel( s.zodModel( data, s.TravelSchema ), data )
  }
  if( to === "semuaProduk" ) {
    return v.validModel( s.zodModel( data, s.semuaProdukSchema ), data )
  }
  return "required"
}

export const validationData = ( method: TMethod, to: ToModel, data: any ) => {
  if( method === "POST" || method === "PUT" ) {

    if( typeof data === "object" ) {
      console.info( "object s" )
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
      console.info( "success s client" )
      return data
    }
  }
}