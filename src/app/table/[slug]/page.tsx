'use client'
import React, { Suspense } from 'react';
import { LinkTable } from '@/app/elements/link/Links';
import { usePathname } from 'next/navigation';
import { getDataByStatus } from '@/app/utils/ress/table';
import { TableOrder } from '@/app/components/table/Table';

export default function Page() {
  const pathname = usePathname()
  const path     = pathname.split( "/" ) as string[]
  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <LinkTable path={ path[ 1 ] } slug={ path[ 2 ].replace( "%20", " " ) }/>
      <Suspense fallback={ <div>Loading...</div> }>
        <Table path={ path[ 2 ] }/>
      </Suspense>
    </main>
  )
}

async function Table( { path }: {
  path: string
} ) {
  const data = await getDataByStatus( path )
  return (
    <div>
      <h1>table</h1>
      <TableOrder dataOrderan={ data }/>
    </div>
  )
}

