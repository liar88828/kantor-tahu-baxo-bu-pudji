import { ReactNode } from 'react';
import { LinkBasic, } from '@/app/elements/link/LinkBasic';
import { LinkComplex } from '@/app/elements/link/LinkComplex';

export function Layout( { children, navs = "basic" }: {
  children: ReactNode,
  navs?: "basic" | "complex"
} ) {

  return (
    <main className="flex z-50 bg-green-50 flex-col p-5 ">
      { navs === "basic" ? <LinkBasic/> : <LinkComplex slug={ "orderan" }/> }
        { children }
    </main>
  )
}

