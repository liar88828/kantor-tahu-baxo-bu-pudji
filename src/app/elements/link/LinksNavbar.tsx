import { ReactNode, Suspense } from 'react';
import { LinkNavigation, } from '@/app/elements/link/Links';

export function FormBody( { children }: {
  children: ReactNode
} ) {

  return (
    <main className="flex z-50 bg-green-50 flex-col p-5">
      <LinkNavigation/>
      <Suspense fallback={ <div>Loading...</div> }>
        { children }
      </Suspense>
    </main>
  )
}

