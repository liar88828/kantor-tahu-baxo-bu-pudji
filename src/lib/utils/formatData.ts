import { addDot, getExtensionData, validateExtension } from '@/lib/utils/fileExtension';
import { newError } from '@/server/exeption/errorHandler';
import { setIdProduct, setIdTravel } from '@/lib/utils/formatId';

export const formatData = ( d: any, option: TraPro | string ) => {
  console.debug( option )
  if( option.includes( "product" ) ) {
    const dProduct = d as TProduct | any

    const setId = setIdProduct( dProduct )
    console.debug( setId )

    dProduct.jumlah = dProduct.jumlah ? dProduct.jumlah : 1
    dProduct.harga  = dProduct.harga ? dProduct.harga : Number( dProduct.harga )
    dProduct.id     = dProduct.id ? dProduct.id : dProduct.id = setId
    dProduct.jumlah = Number( dProduct.jumlah )
    dProduct.harga  = Number( dProduct.harga )
    return dProduct
  }

  if( option.includes( "travel" ) ) {

    const dTravel = d as TTravel | any

    dTravel.id    = setIdTravel( dTravel )
    dTravel.harga = Number( dTravel.harga )
    return dTravel
  }
}
export const setData    = (
  file: Blob,
  json: any,
  folderPath: string,
  paths: string | TraPro
) => {
  const extension = getExtensionData( file.name )

  const nama = addDot( extension, paths.includes( "travel" ) ? json.namaPengiriman : json.nama )
  // console.log( nama )
  if( !validateExtension( extension ) ) {
    throw new newError( "Extension is not allow", )
  }
  const data = formatData( json, paths )
  console.log( "set data" )
  console.log( data )
  data.img = folderPath + Date.now() + "_" + nama
  return data
}

export type TraPro = "product" | "travel";
