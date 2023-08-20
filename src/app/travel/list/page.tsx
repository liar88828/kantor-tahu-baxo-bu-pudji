'use client'
import React, { Suspense } from 'react';
import { LinkNavigation, } from '@/app/elements/link/Links';
import { usePathname, useRouter } from 'next/navigation';
import { CardList } from '@/app/components/card/travel';
import { useNotifyEffect } from '@/app/utils/notif/toash';

export default function Page() {
  const router   = useRouter()
  const pathname = usePathname()
  const path     = pathname.split( "/" )
  useNotifyEffect( path );

  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <LinkNavigation path={ path }/>
      <Suspense fallback={ <div>Loading...</div> }>
        <CardList router={ router }/>
      </Suspense>
    </main>
  )
}

