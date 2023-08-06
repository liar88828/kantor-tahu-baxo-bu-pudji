import {
  addDot, getExtensionData, validateExtension
}                   from '@/lib/utils/fileExtension';
import { TTravel }  from '@/entity/client/travel';
import { newError } from '@/server/exeption/errorHandler';
import { TProduct } from '@/entity/client/produk';

export const formatData = ( d: any, option: string ) => {
  if( option === "produk" ) {
    const dProduct = d as TProduct | any

    const setId = dProduct.nama.slice( 0, 2 ) + "_" +
      dProduct.harga.toString().slice( 0, 2 ) + "_" +
      dProduct.lokasi.slice( 0, 2 ) + "_" +
      dProduct.jenis.slice( 0, 2 ) + "_" +
      dProduct.keterangan.slice( 0, 2 ) + "_" + Date.now()

    dProduct.jumlah = dProduct.jumlah ? dProduct.jumlah : 1
    dProduct.harga  = dProduct.harga ? dProduct.harga : Number( dProduct.harga )
    dProduct.id     = dProduct.id ? dProduct.id : dProduct.id = setId
    dProduct.jumlah = Number( dProduct.jumlah )
    dProduct.harga  = Number( dProduct.harga )
    return dProduct
  }

  if( option === "travel" ) {

    const dTravel = d as TTravel | any

    dTravel.id    = dTravel.namaPengiriman.slice( 0, 2 ) + "_" +
      dTravel.harga.toString().slice( 0, 2 ) + "_" +
      dTravel.lokasi.slice( 0, 2 ) + "_" +
      dTravel.jenis.slice( 0, 2 ) + "_" +
      dTravel.keterangan.slice( 0, 2 ) + "_" + Date.now()
    dTravel.harga = Number( dTravel.harga )
    return dTravel
  }
}
export const setData    = ( file: Blob, json: TTravel, folderPath: string ) => {
  const extension = getExtensionData( file.name )
  const nama      = addDot( extension, json.namaPengiriman )
  if( !validateExtension( extension ) ) {
    throw new newError( "Extension is not allow", "Invalid Value" )
  }
  const dTravel = formatData( json, "travel" )
  dTravel.img   = folderPath + dTravel.namaPengiriman + "_" + nama
  return dTravel
}
