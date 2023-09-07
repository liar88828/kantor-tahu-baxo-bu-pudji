import { TOrderServer } from '@/entity/server/orderan';
import { TOrder } from '@/entity/client/orderan';
import { config } from '../../../../dataEnv';
import { setDates, setHours } from '@/lib/utils/formatDate';
import { redirect } from 'next/navigation';
import { sendAPI, sendData } from '@/app/utils/ress/sendApi';
import { TPOrderan } from '@/entity/server/produkOrderan';

const test = "test"

export async function onCreate(
  sendData: TOrder,
  method: "POST" | "PUT",
  id: string
) {
  sendData.hpPengirim                = "0" + sendData.hpPengirim.toString()
  sendData.hpPenerima                = "0" + sendData.hpPenerima.toString()
  const newSemuaProduct: TPOrderan[] = sendData.semuaProduct.map( ( d: TPOrderan ) => {
    d.orderanId = sendData.id
    return d
  } )

  const { listItem, listOrderan, semuaProduct, ...puts } = sendData
  const ress                                             = Object.assign( { semuaProduct: newSemuaProduct }, puts )
  if( confirm( "Apakah Data yang di isi sudah Benar ??" ) ) {
    if( method === "POST" ) {
      return await sendAPI( "orderan", "POST", ress, "" );
    }
    if( method === "PUT" ) {
      console.log( "true" )
      return await sendAPI( "orderan", "PUT", ress, id );
    }
  }
  else {
    // Do nothing!
    // console.log( 'Thing was not saved to the database.' );
  }
}

export type TFormatDataOrder = { data: TOrder; msg: string }

function formatData( data: TFormatDataOrder ) {
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

export async function getDataByStatus( slug: string ): Promise<{
  msg: string,
  data: TOrderServer[]
}> {
  const test = "test"
  const res  = await fetch( config.url + `/api/orderan?id=${ slug }&option=table`, {
    method : "GET",
    headers: { "Content-Type": "application/json" },
    cache  : "reload"
  } )
  const data = await res.json()
  if( test !== "test" ) {
    console.table( data )
  }
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

  return await sendData<TPOrderan>( "orderan", "DELETE", "", send )
}

export async function deleteDataOne( id: string[] ) {
  return await sendData( "orderan", "DELETE", "", id )
}

if( test !== "test" ) {
  async function editData( id: string, ) {
    const res = await fetch( config.url + "/api/orderan/" + id, {
        method: "PUT",
      }
    )
    return await res.json()
  }

  console.log( editData( "test" ) )

  async function updateOneData(
    id: string,
    value: string | number,
    // router: AppRouterInstance
  ) {
    const res = await fetch( config.url + `/api/orderan?id=${ id }&value=${ value }`,
      {
        method: "PUT",
      }
    )
    // router.refresh()
    return await res.json()
  }

  console.log( updateOneData( "test", 12 ) )
}

