import { TableOrder } from '@/app/(pages)/(Transaction)/table/Table';
import DataEmpty from '@/app/components/template/handling/DataEmpty';

// export const dynamic    = 'force-dynamic'
// export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

// type TDataRes<T> = {
//   msg: string,
//   data: T
// };

const getDataTabel = async ( id: string ) => {
  return fetch( `http://localhost:3000/api/table?id=${ id }&option=table`, {
    // method : 'GET',
    // headers: { 'Content-Type': "application/json" },
    cache: 'no-cache'
    // next: { tags: [ 'orderans' ] }
  } )

}
export default async function Page( { params: { slug } }: {
  params: {
    slug: string
  }
} ) {
  // const id = slug
  // const data = await Fetch( {
  //   to    : "table", method: 'GET', id,
  //   option: "table",
  // } )
  // console.log( data )
  // console.log( slug )
  const res = await getDataTabel( slug )

  if( !res.ok ) {
    return <DataEmpty/>
  }
  else {
    console.info( `success fetch data orderan ${ slug }` )
  }

  const data = await res.json()
  // console.log(data)
  if( !data.success ) {
    return (
      <DataEmpty/>
    )
  }

  return ( <TableOrder dataOrderan={ data }/> )
}
// const objects = {
//   id            : 'asdasdas',
//   dari          : 'asd',
//   pengirim      : 'Kantor Tahu Baxo',
//   hpPengirim    : '00123123123',
//   penerima      : 'asdasd',
//   alamatPenerima: 'asd',
//   hpPenerima    : '02565283670',
//   pesan         : '2023-12-01T00:00:00.000Z',
//   waktuKirim    : '2023-12-24T13:34:00.000Z',
//   guna          : 'asdassdasdasdasdasdas',
//   lokasi        : 'Semarang',
//   namaPengiriman: "' u aK",
//   ongkir        : 0,
//   typePembayaran: 'Ilo kKtao uh r',
//   totalBayar    : 0,
//   totalPenjualan: 0,
//   status        : 'Kirim',
//   created_at    : '2023-12-24T12:34:21.854Z',
//   updated_at    : '2023-12-24T13:10:20.417Z'
// }
//
// export type datas = typeof objects