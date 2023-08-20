'use client'
import React, { Suspense, use } from 'react';
import { LinkTable } from '@/app/elements/link/Links';
import { usePathname } from 'next/navigation';
import { getDataByStatus } from '@/app/utils/ress/orderan';
import { TableOrder } from '@/app/components/table/Table';
import { useNotifyEffect } from '@/app/utils/notif/toash';

export default function Page() {
  const pathname = usePathname()
  const path     = pathname.split( "/" )
  useNotifyEffect( path[ 1 ] );

  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <LinkTable path={ path[ 1 ] } slug={ path[ 2 ].replace( "%20", " " ) }/>
      <Suspense fallback={ <div>Loading...</div> }>
        <ServerComponent
          path={ path[ 2 ].replace( "%20", " " ) }/>
      </Suspense>
    </main>
  )
}

function ServerComponent( { path }: { path: string } ) {
  const data = use( getDataByStatus( path ) )
  return ( <TableOrder dataOrderan={ data }/>
  )

}