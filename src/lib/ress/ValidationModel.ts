import { TMethod, ToModel } from '@/entity/Utils';
import { validation } from '@/lib/validation/zod/validation';
import { _test_ } from '../../../config.dev';

const v = validation

export function ValidationModel( to: ToModel, data: any, method: TMethod ) {
  console.table( data )
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
  console.error( "error validation gateway" )
  if( _test_ ) {
    return data
  }
  throw data
}

