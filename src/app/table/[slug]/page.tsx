import { LinkTable } from '@/app/elements/link/LinkTable';
import { getDataByStatus } from '@/app/utils/ress/orderan';
import { TableOrder } from '@/app/components/table/Table';
import { Suspense } from 'react';

// export const dynamic       = 'auto'
export const revalidate = 0
export const fetchCache = 'auto'
export const runtime    = 'nodejs'

export default async function Page( { params: { slug } }: { params: { slug: string } } ) {
  const data = await getDataByStatus( slug )
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
