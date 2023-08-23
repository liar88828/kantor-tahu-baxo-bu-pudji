import { addDot, getExtensionData, validateExtension } from '@/lib/utils/fileExtension';
import { newError } from '@/server/exeption/errorHandler';
import { setIdProduct, setIdTravel } from '@/lib/utils/formatId';

export const formatData = ( d: any, option: string ) => {
  if( option === "produk" ) {
    const dProduct = d as TProduct | any

    const setId = setIdProduct( dProduct )

    dProduct.jumlah = dProduct.jumlah ? dProduct.jumlah : 1
    dProduct.harga  = dProduct.harga ? dProduct.harga : Number( dProduct.harga )
    dProduct.id     = dProduct.id ? dProduct.id : dProduct.id = setId
    dProduct.jumlah = Number( dProduct.jumlah )
    dProduct.harga  = Number( dProduct.harga )
    return dProduct
  }

  if( option === "travel" ) {
    const dTravel = d as TTravel | any
    dTravel.id    = setIdTravel( dTravel )
    dTravel.harga = Number( dTravel.harga )
    return dTravel
  }
}
export const setData    = ( file: Blob, json: TTravel, folderPath: string ) => {
  const extension = getExtensionData( file.name )
  const nama      = addDot( extension, json.namaPengiriman )
  if( !validateExtension( extension ) ) {
    throw new newError( "Extension is not allow", )
  }
  const dTravel = formatData( json, "travel" )
  // dTravel.img   = folderPath + Date.now() + "_" + nama
  dTravel.img   = folderPath + Date.now() + "_" + nama
  return dTravel
}
