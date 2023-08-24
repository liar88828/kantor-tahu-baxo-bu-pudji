'use client'
import { Suspense } from 'react';
import { LinkNavigation, } from '@/app/elements/link/Links';
import { usePathname } from 'next/navigation';
import { useNotifyEffect } from '@/app/utils/notif/toash';

export function LinkNavbar( { children }: { children: React.ReactNode } ) {
  const pathname = usePathname()
  const path     = pathname.split( "/" )
  useNotifyEffect( path );

  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <LinkNavigation path={ path }/>
      <Suspense fallback={ <div>Loading...</div> }>
        { children }
      </Suspense>
    </main>
  )
}

