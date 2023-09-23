import { LinkTable } from '@/app/elements/link/LinkTable';
import { SComponent } from '@/app/components/form/Orderan/SComponent';
import { GateWay } from '@/app/utils/ress/GateWay';
import { TOrder } from '@/entity/client/orderan';
import { Suspense } from 'react';

export const dynamic    = 'force-dynamic'
export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'
export default async function Page( { params: { id } }: { params: { id: string } } ) {
  const data: { msg: string, data: TOrder, } = await GateWay( 'GET', "orderan", id, )
  // console.log( data )
  return (
    <main className="flex p-3 sm:p-6 z-50 bg-green-50 gap-3 flex-col">
      <LinkTable slug={ id }/>
        <SComponent id={ id } method={ "PUT" } defaultDataOrder={ data.data }/>

    </main>
  )
}

