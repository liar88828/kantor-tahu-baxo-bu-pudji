"use client"

import { defaultValues } from '@/app/utils/format/orderan';
import { SComponent } from '@/app/components/form/Orderan/SComponent';
import { LinkTable } from '@/app/elements/link/Links';
import { usePathname } from 'next/navigation';

export const revalidate = 10
export const runtime    = 'nodejs'

// default component
export default function Page() {
  const pathname = usePathname()
  const path     = pathname.split( "/" )
  // console.log( path )
  return ( <main className="flex p-3 sm:p-6  z-50 bg-green-50 gap-3 flex-col">
      <div className=" overflow-x-auto pb-2">
        <LinkTable slug={ path[ 1 ] }/>
        <SComponent id={ "" }
                    defaultDataOrder={ defaultValues }
                    method={ "POST" }/>
      </div>
    </main>
  )
}
