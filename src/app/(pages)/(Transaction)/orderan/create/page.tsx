import { Suspense } from 'react';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { defaultValues } from '../../../../../../asset/constants/model/orderan';
import FormOrderan from '@/app/(pages)/(Transaction)/orderan/FormOrderan';

// const Orderan = dynamic( () => import('@/app/components/organisme/form/Orderan'), {
//   loading: () => <SkeletonCard/>,
//   ssr    : false
// } )
//
// // export const dynamic    = 'force-dynamic'
// export const revalidate = 10
export type OrderanData = {
  travel: { nama: string }[],
  bank: { nama: string }[],
  product: { id: string, nama: string, img: string, jumlah: number, jenis: string, harga: number, lokasi: string }[]
}
export default async function Page() {
  // const { data }: { data: OrderanData } = await Fetch( {
  //   method: 'GET', to: 'orderan', option: 'orderan', id: ''
  // } )

  const res = await fetch( 'http://localhost:3000/api/orderan?option=orderan', { cache: 'no-cache' } )
  if( !res.ok ) {
    // notifyData('Failed to fetch data')
    throw new Error( 'Failed to fetch data' )
  }
  else {
    // notifyData('Success Fetch Data')
  }

  const { data }: { data: OrderanData } = await res.json()
  // console.log( data )
  // console.log(defaultValues)
  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormOrderan id={ "" } method={ "POST" }
                   defaultDataOrder={ defaultValues }
                   travel={ data.travel }
                   product={ data.product }
                   bank={ data.bank }/>

    </Suspense>
  )
}

