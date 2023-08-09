import { TOrderServer } from '@/entity/server/orderan';
import { TotalOrderan } from '@/entity/client/orderan';
import { TPOrderan }    from '@/entity/server/produkOrderan';

export const onCreate = async ( sendData: TotalOrderan ) => {
  sendData.id = sendData.id + Date.now()
  if( confirm( "Apakah Data yang di isi sudah Benar ??" ) ) {
    const updatedArrayOfObjects                        = sendData.semuaProduct.map( obj => (
      { ...obj, orderanId: sendData.id }
    ) );
    // console.log(updatedArrayOfObjects)
    const semuaProduct: Omit<TPOrderan, "orderanId">[] = updatedArrayOfObjects.map( obj => {
      const { [ "img" ]: _, ...rest } = obj;
      return rest;
    } )

    const {
            listItem, listOrderan, semuaProduct: semua, hitung, ...rest
          }                       = sendData
    const dataBaru1               = Object.assign( { semuaProduct }, rest )
    const dataBaru2: TOrderServer = Object.assign( hitung, dataBaru1 )
    dataBaru1.hpPenerima          = `${ dataBaru1.hpPenerima }`
    dataBaru1.hpPengirim          = `${ dataBaru1.hpPengirim }`
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
  // console.log( json, "json" )
  const response = await fetch( "http://localhost:3000/api/orderan", {
    method: "POST",
    body  : JSON.stringify( json ),
    headers: { "Content-Type": "application/json", }
  } )
  // console.log( data )
  return await response.json()
}


