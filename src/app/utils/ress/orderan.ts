import { TOrderServer } from '@/entity/server/orderan';
import { TotalOrderan } from '@/entity/client/orderan';
import { TPOrderan } from '@/entity/server/produkOrderan';

export const onCreate = async ( sendData: TotalOrderan ) => {

  const updatedArrayOfObjects                        = sendData.semuaProduct.map( obj => (
    { ...obj, orderanId: sendData.id }
  ) );
  // console.log(updatedArrayOfObjects)
  const semuaProduct: Omit<TPOrderan, "orderanId">[] = updatedArrayOfObjects.map( obj => {
    const { [ "img" ]: _, ...rest } = obj;
    return rest;
  } )

  const { listItem, listOrderan, semuaProduct: semua, hitung, ...rest } = sendData
  const dataBaru1                                                       = Object.assign( { semuaProduct }, rest )
  dataBaru1.hpPenerima                                                  = `${ dataBaru1.hpPenerima }`
  dataBaru1.hpPengirim                                                  = `${ dataBaru1.hpPengirim }`
  const dataBaru2: TOrderServer                                         = Object.assign( hitung, dataBaru1 )

  if( confirm( "Apakah Data yang di isi sudah Benar ??" ) ) {

    return createOrder( dataBaru2 )
  }
  else {
    // Do nothing!
    // console.log( 'Thing was not saved to the database.' );
  }
}

export const createOrder = async (
  json: Omit<TOrderServer, "semuaProduct">
) => {

  const response = await fetch( "/api/orderan", {
    method: "POST",
    body  : JSON.stringify( json ),
    headers: { "Content-Type": "application/json", }
  } )
  return await response.json()
}


