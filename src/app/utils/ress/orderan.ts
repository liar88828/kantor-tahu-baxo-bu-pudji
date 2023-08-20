import { TOrderServer } from '@/entity/server/orderan';
import { TOrder, TotalOrderan } from '@/entity/client/orderan';
import { TPOrderan } from '@/entity/server/produkOrderan';
import { config } from '../../../../dataEnv';
import { setDates, setHours } from '@/lib/utils/formatDate';
import { redirect } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export const onCreate = async ( sendData: TotalOrderan, method: string = "POST", id: string ) => {

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
      return await sendAPI( "POST", dataBaru2, "" );
    }
    if( method === "PUT" ) {
      return await sendAPI( "PUT", dataBaru2, id );
    }
  }
  else {
    // Do nothing!
    // console.log( 'Thing was not saved to the database.' );
  }
}

async function sendAPI( method: string, json: TOrderServer, id: string ) {
  const response = await fetch( config.url + "/api/orderan/" + id, {
    method: method,
    body  : JSON.stringify( json ),
    headers: { "Content-Type": "application/json", }
  } )

  if( !response.ok ) {
    redirect( '/not-found' )
  }

  const data = await response.json()
  // console.log( data )
  return data
}

export const defaultData = async ( id: string ): Promise<TOrder> => {
  const response = await fetch(
      config.url + "/api/orderan?id=" + id,
    {
      method: "GET",
      next  : { tags: [ "table" ] }
    } )

  const data: {
    data: TOrder,
    msg: string
  } = await response.json()

  if( !response.ok ) {
    return redirect( '/not-found/' + id )
  }
  // console.log( data )

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

export const getDataByStatus = async ( slug: string ): Promise<{
  msg: string,
  data: TOrderServer[]
}> => {
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
      next  : { tags: [ "table" ] }
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
  console.log( "-----------" )
  console.log( id )
  console.log( "-----------" )

  const res = await fetch( config.url + `/api/orderan?id=` + id[ 0 ], {
      method: "DELETE",
      next  : { tags: [ "table" ] }
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
  const res = await fetch( config.url + "/api/orderan/" + id,
    {
      // cache: 'no-cache',
      // next  : { revalidate: 10 },
      method: "PUT",
      next  : { tags: [ "table" ] }

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

