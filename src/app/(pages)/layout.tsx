"use client"
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Complex from '@/app/components/template/slidebar/top/menu/Complex';
import Basic from '@/app/components/template/slidebar/top/menu/Basic';

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

