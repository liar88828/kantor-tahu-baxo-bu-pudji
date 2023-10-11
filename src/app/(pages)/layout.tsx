"use client"
import { ReactNode, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const LinkBasic   = dynamic( () => import('@/app/elements/link/LinkBasic') )
const LinkComplex = dynamic( () => import('@/app/elements/link/LinkComplex') )

export default function LayoutNavbar( {
  children,
}: {
  children: ReactNode,
} ) {
  const path = usePathname()
  const slug = path.replaceAll( "%20", " " ).split( "/" ).pop() ?? ""
  return (
    <main className="flex z-50 bg-green-50 flex-col p-5 ">
      { path.includes( "table" ) || path.includes( "orderan" ) ? <LinkComplex slug={ slug }/> :
        <LinkBasic/> }
      { children }
    </main>
  )
}

