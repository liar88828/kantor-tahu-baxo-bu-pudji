'use client'
import { LinkTable } from '@/app/elements/link/Links';
import { usePathname } from 'next/navigation';
import { ServerComponent } from '@/app/table/[slug]/SComponent';

export default function Page() {
  const pathname = usePathname()
  const path     = pathname.split( "/" )

  return (
    <main className="flex p-3 sm:p-6  z-50 bg-green-50 gap-3 flex-col">
      <div className=" overflow-x-auto pb-2">
        <LinkTable path={ path[ 1 ] } slug={ path[ 2 ].replace( "%20", " " ) }/>
      </div>
      <ServerComponent path={ path[ 2 ].replace( "%20", " " ) }/>
    </main>
  )
}
