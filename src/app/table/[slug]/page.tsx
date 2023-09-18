import { LinkTable } from '@/app/elements/link/LinkTable';
import { Suspense } from 'react';
import { GateWay } from '@/app/utils/ress/GateWay';
import { TableOrder } from '@/app/components/table/Table';

export const dynamic = 'auto'
export const revalidate = 0
export const fetchCache = 'auto'
export const runtime    = 'nodejs'

type TDataRes<T> = {
  msg: string,
  data: T
};
export default async function Page( { params: { slug } }: { params: { slug: string } } ) {
  const id = slug.replaceAll( "%20", " " )

  const data: TDataRes<TOrderServer[]> = await GateWay( 'GET', "orderan", id, "", "table" )
  return (
    <main className="flex p-3 sm:p-6  z-50 bg-green-50 gap-3 flex-col">
      <div className=" overflow-x-auto pb-2">
        <LinkTable slug={ slug.replace( "%20", " " ) }/>
      </div>
      <Suspense fallback={ <div>Loading...</div> }>
        <TableOrder dataOrderan={ data }/>
      </Suspense>
    </main>
  )
}
