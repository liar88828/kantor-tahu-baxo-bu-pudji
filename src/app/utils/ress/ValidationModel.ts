import { ToModel } from '@/entity/Utils';
import Validation from '@/lib/validation/validation';

const v = new Validation()

export function ValidationModel( to: ToModel, data: any ) {
  console.log( "validation model client" )
  if( to === "orderan" ) {
    return v.validModelNew( data, v.OrderanSchema )
  }
  if( to === "bank" ) {
    return v.validModelNew( data, v.BankSchema )
  }
  if( to === "product" ) {
    return v.validModelNew( data, v.ProductSchema )
  }
  if( to === "travel" ) {
    return v.validModelNew( data, v.TravelSchema )
  }
  if( to === "semuaProduk" ) {
    return v.validModelNew( data, v.semuaProdukSchema )
  }
  return "required"
}

