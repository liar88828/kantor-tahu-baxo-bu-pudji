"use client"
import { memo, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const LinkSlidebar = memo( function ListSlidebar(
  { paths, title, }:
    { paths: string, title: string, } ) {

  const pathname = usePathname()
  const path     = pathname.split( "/" )[ 1 ]

  return ( <Link href={ paths } replace={ true }
                 className={ `flex rounded items-center px-2 py-2 mb-2
                  ${ path.includes( title.toLowerCase() )
                     ? " bg-info hover:bg-blue-500 "
                     : " bg-success hover:bg-green-500 " } 
                  ` }
    >
      <span className={ `ml-2 text-white font-bold  ` }>{ title }</span>
    </Link>
  )
} )