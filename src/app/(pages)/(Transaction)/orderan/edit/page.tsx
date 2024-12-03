import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';
import FormOrderan from '@/app/(pages)/(Transaction)/orderan/FormOrderan';
import { SearchParams } from '@/interface/searchParams';

// export const dynamic    = 'force-dynamic'
// export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

const getIdOrderan   = async ( id: string ) => {
  const res = await fetch( `http://localhost:3000/api/orderan?id=${ id }`,
    { cache: 'no-cache' } )
  return res.json().then( data => data.data )
}
const getDataOrderan = async () => {
  const res = await fetch( 'http://localhost:3000/api/orderan?option=orderan',
    { cache: 'no-cache' } )
  return res.json().then( data => data.data )
}
export default async function Page( { searchParams }: SearchParams ) {
  const dataID      = getIdOrderan( searchParams.id as string )
  const dataOrderan = getDataOrderan()

  const [ orderan, data ] = await Promise.all( [ dataID, dataOrderan ] )
  // console.log( orderan )
  // console.log( data )
  if( orderan === undefined ) {
    return <span className="loading loading-spinner loading-lg"></span>

  }
  Object.assign(
    data,
    {
      listOrderan: [],
      // semuaProduct: [],
      listItem: [],
    }
  )

  // console.log( orderan )
  // console.log( searchParams.id )
  console.info( `success fetch data orderan ` )
  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormOrderan id={ searchParams.id as string } method={ "PUT" }
                   defaultDataOrder={ orderan }
                   travel={ data.travel }
                   product={ data.product }
                   bank={ data.bank }/>

    </Suspense>

  )
}

// const defaultData: TOrder = {
//   pengirim      : 'Kantor Tahu Baxo',
//   hpPengirim    : '',
//   penerima      : '',
//   alamatPenerima: '',
//   hpPenerima    : '',
//   dari          : '',
//   pesan         : '2023-12-28',
//   waktuKirim    : ':19',
//   listOrderan   : [],
//   listItem      : [],
//   semuaProduct  : [],
//   lokasi        : 'Semarang',
//   namaPengiriman: '',
//   ongkir        : 0,
//   id            : '',
//   typePembayaran: 'CASH',
//   totalBayar    : 0,
//   totalPenjualan: 0,
//   status        : 'Di terima',
//   guna          : ''
// }

// const responseDatas: typeof defaultData = {
//   id            : '1_231',
//   dari          : 'Kaemtbu ahy',
//   pengirim      : 'Inesrn bKautu',
//   hpPengirim    : '0189',
//   penerima      : 'Unmbtktahua',
//   alamatPenerima: 'OthmCbCmb h',
//   hpPenerima    : '032',
//   pesan         : '2023-12-08T00:00:00.000Z',
//   waktuKirim    : '2023-12-24T14:13:00.000Z',
//   guna          : 'Irulemul edzigjer aku ijuuba nukwi ognomle fi eheisa zin',
//   lokasi        : 'Semarang',
//   namaPengiriman: "' u aK",
//   ongkir        : 326,
//   typePembayaran: 'CASH',
//   totalBayar    : 326,
//   totalPenjualan: 0,
//   status        : 'Kirim',
//
//   // semuaProduct:[],
//   // listOrderan   : [],
//   // listItem:[]
// }
