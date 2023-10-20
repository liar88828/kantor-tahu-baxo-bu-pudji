"use client"
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const Basic   = dynamic( () => import('@/app/components/molecules/menu/Basic') )
const Complex = dynamic( () => import('@/app/components/molecules/menu/Complex'),
  { ssr: true } )
// molecule
export default function LayoutNavbar( {
  children,
}: {
  children: ReactNode,
} ) {
  const path = usePathname()
  const slug = path.replaceAll( "%20", " " ).split( "/" ).pop() ?? ""
  return (
    <main className="flex z-50 flex-col p-5 ">
      { path.includes( "table" ) || path.includes( "orderan" )
        ? <Complex slug={ slug }/>
        : <Basic/> }
      { children }
    </main>
  )
}

