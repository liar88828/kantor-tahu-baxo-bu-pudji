import { TOrderServer } from '@/entity/server/orderan';
import { TOrder, TotalOrderan } from '@/entity/client/orderan';
import { TPOrderan } from '@/entity/server/produkOrderan';
import { config } from '../../../../dataEnv';
import { setDates, setHours } from '@/lib/utils/formatDate';
import { redirect } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { sendAPI } from '@/app/utils/ress/sendApi';

export async function onCreate( sendData: TotalOrderan, method: string = "POST", id: string ) {

  const updatedArrayOfObjects                        = sendData.semuaProduct.map( obj => ( { ...obj, orderanId: sendData.id } ) );
  const semuaProduct: Omit<TPOrderan, "orderanId">[] = updatedArrayOfObjects.map( obj => {
    const { ...rest } = obj;
    return rest;
  } )

  const { listItem, listOrderan, semuaProduct: semua, hitung, ...rest } = sendData

  const dataBaru1 = Object.assign( { semuaProduct }, rest )
  const dataBaru2: TOrderServer = Object.assign( hitung, dataBaru1 )
  if( confirm( "Apakah Data yang di isi sudah Benar ??" ) ) {
    if( method === "POST" ) {
      return await sendAPI( "orderan", "POST", dataBaru2, "" );
    }
    if( method === "PUT" ) {
      return await sendAPI( "orderan", "PUT", dataBaru2, id );
    }
  }
  else {
    // Do nothing!
    // console.log( 'Thing was not saved to the database.' );
  }
}

function formatData( data: { data: TOrder; msg: string } ) {
  return {
    listOrderan   : [],
    listItem      : [],
    semuaProduct  : data.data.semuaProduct,
    pesan         : setDates( data.data.pesan.toString() ),
    kirim         : setDates( data.data.kirim.toString() ),
    waktuKirim    : setHours( data.data.waktuKirim.toString() ),
    pengirim      : data.data.pengirim,
    hpPengirim    : data.data.hpPengirim,
    penerima      : data.data.penerima,
    alamatPenerima: data.data.alamatPenerima,
    hpPenerima    : data.data.hpPenerima,
    guna          : data.data.guna,
    lokasi        : data.data.lokasi,
    namaPengiriman: data.data.namaPengiriman,
    ongkir        : data.data.ongkir,
    id            : data.data.id,
    typePembayaran: data.data.typePembayaran,
    totalBayar    : data.data.totalBayar,
    totalPenjualan: data.data.totalPenjualan,
    status        : data.data.status,
  }
}

export async function defaultData( id: string ): Promise<TOrder> {
  const response = await fetch(
    config.url + "/api/orderan?id=" + id,
    { method: "GET", } )

  const data: {
    data: TOrder,
    msg: string
  } = await response.json()

  if( !response.ok ) {
    return redirect( '/not-found/' + id )
  }
  // console.log( data )
  return formatData( data );
}

export async function getDataByStatus( slug: string ): Promise<{ msg: string, data: TOrderServer[] }> {
  const res = await fetch( config.url + `/api/orderan?id=${ slug }&option=table`, {
    method: "GET",
    next  : { revalidate: 20 }
  } )
  const data = await res.json()
  // console.log(data)
  return data
}

export async function getData() {
  const res = await fetch( config.url + "/api/orderan",
    {
      // cache: 'no-cache',
      next  : { revalidate: 10, tags: [ "table" ] },
      method: "GET"
    }
  )
  console.log( await res.json() )
  return await res.json()
}

export async function deleteDataMany( send: string [] ) {

  const formData = new FormData();
  formData.append( "data", JSON.stringify( send ) )
  const res = await fetch( config.url + "/api/orderan/", {
      method: "DELETE",
      body  : formData,
    }
  )

  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  const data = await res.json()
  if( data.success === false ) {
    const arrays = JSON.parse( data.data )
  }
  return data
}

export async function deleteDataOne( id: string[] ) {
  const res = await fetch( config.url + `/api/orderan?id=` + id[ 0 ], {
      method: "DELETE",
    }
  )
  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  const data = await res.json()
  if( data.success === false ) {
    const arrays = JSON.parse( data.data )
  }
  return data
}

export async function editData( id: string, json: any ) {
  const res = await fetch( config.url + "/api/orderan/" + id, {
    method: "PUT",
    }
  )

  return await res.json()
}

export async function updateOneData( id: string, value: string | number, router: AppRouterInstance ) {

  const res = await fetch( config.url + `/api/orderan?id=${ id }&value=${ value }`,
    {
      method: "PUT",
    }
  )
  return await res.json()
}

