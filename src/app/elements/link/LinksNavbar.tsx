'use client'
import { ReactNode, Suspense } from 'react';
import { LinkNavigation, } from '@/app/elements/link/Links';
import { usePathname } from 'next/navigation';

export function LinkNavbar( { children }: {
  children: ReactNode
} ) {
  const pathname = usePathname()
  const path     = pathname.split( "/" )

  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <div className="overflow-x-auto ">
        <LinkNavigation path={ path }/>
      </div>
      <Suspense fallback={ <div>Loading...</div> }>
        { children }
      </Suspense>
    </main>
  )
}

