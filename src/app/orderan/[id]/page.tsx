import { LinkTable } from '@/app/elements/link/LinkTable';
import { Suspense } from 'react';
import { TOrder } from '@/entity/client/orderan';
import { defaultData } from '@/app/utils/ress/orderan';
import { SComponent } from '@/app/components/form/Orderan/SComponent';

export const revalidate = 10
export const runtime    = 'nodejs'
export default async function Page( { params: { id } }: { params: { id: string } } ) {
  const data: TOrder = await defaultData( id )

  return (
    <main className="flex p-3 sm:p-6 z-50 bg-green-50 gap-3 flex-col">
      <div className=" overflow-x-auto pb-2">
        <LinkTable slug={ id }/>
      </div>
      <Suspense fallback={ <div>Loading...</div> }>
        <SComponent id={ id } method={ "PUT" } defaultDataOrder={ data }/>
      </Suspense>
    </main>
  )
}
