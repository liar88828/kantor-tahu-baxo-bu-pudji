"use client"
import React, { Suspense } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { SComponents } from '@/app/orderan/[id]/SComponent';
import { LinkTable } from '@/app/elements/link/Links';

export default function Page() {
  const { id }   = useParams()
  const pathname = usePathname()
  const path     = pathname.split( "/" ).pop() as string
  const slug     = id && path ? path : ""
  return (
    <main className="flex p-3 sm:p-6 z-50 bg-green-50 gap-3 flex-col">
      <div className=" overflow-x-auto pb-2">
        <LinkTable slug={ slug.at( -1 ) as string }/>
      </div>
      <Suspense fallback={ <div>Loading...</div> }>
        <SComponents id={ slug }/>
      </Suspense>
    </main>
  )
}
