import { TOrder } from '@/entity/client/orderan';
import { config } from '../../../../config.dev';
import { setDates, setHours } from '@/lib/utils/formatDate';
import { sendData } from '@/app/utils/ress/SendApi';
import { GateWay } from '@/app/utils/ress/GateWay';

const test = "test"

export async function onCreate(
  data: TOrder,
  method: "POST" | "PUT",
  id: string
) {

  data.hpPengirim = "0" + data.hpPengirim.toString()
  data.hpPenerima = "0" + data.hpPenerima.toString()

  const newSemuaProduct: TProOrderan[] = data
  .semuaProduct.map( ( d: TProOrderan ) => {
    d.orderanId = data.id
    return d
  } )

  const { listItem, listOrderan, semuaProduct, ...puts } = data
  const ress                                             = Object.assign( { semuaProduct: newSemuaProduct }, puts )
  if( confirm( "Apakah Data yang di isi sudah Benar ??" ) ) {
    if( method === "POST" ) {
      return await GateWay( "POST", "orderan", "", ress )

      // return await SendApi( "orderan", "POST", ress, "" );
    }
    if( method === "PUT" ) {
      // console.info( "true" )
      return await GateWay( "PUT", "orderan", id, ress )
      // return await SendApi( "orderan", "PUT", ress, id );

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

export async function deleteDataOne( id: string ) {
  return await sendData( "orderan", "DELETE", id )
}

export async function deleteDataMany( ids: string[] ) {

  return await sendData( "orderan", "DELETE", "", "", ids, )
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

