'use client'
import React, { Suspense }        from 'react';
import { LinkList }               from '@/app/product/Links';
import { usePathname, useRouter } from 'next/navigation';
import { CardList }               from '@/app/product/list/card';

export default function Page() {
  const router   = useRouter()
  const pathname = usePathname()
  const path     = pathname.split( "/" ).pop()

  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <LinkList path={ path || "" }/>
      <Suspense fallback={ <div>Loading...</div> }>
        <CardList router={ router }/>
      </Suspense>
    </main>
  )
}

