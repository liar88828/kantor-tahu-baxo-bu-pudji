"use client"
import { AiFillPieChart, AiOutlineInbox, AiOutlineTable } from 'react-icons/ai';
import { MdOutlineProductionQuantityLimits, MdOutlineSportsMotorsports } from 'react-icons/md';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { memo, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LinkSlide() {

  return ( <div className={ ` px-2 flex gap-2 flex-col` }>
    <ListSlidebar paths={ "/" } title={ "Dashboard" }>
      <AiFillPieChart name={ "Dashboard" }/>
    </ListSlidebar>

    <ListSlidebar paths={ "/orderan" } title={ "Orderan" }>
      <MdOutlineProductionQuantityLimits name={ "Orderan" }/>
    </ListSlidebar>

    <ListSlidebar paths={ "/table/Semua" } title={ "Table" }>
      <AiOutlineTable name={ "Table" }/>
    </ListSlidebar>

    <ListSlidebar paths={ "/product/list" } title={ "Product" }>
      <AiOutlineInbox name={ "Product" }/>
    </ListSlidebar>

    <ListSlidebar paths={ "/travel/list" } title={ "Pengiriman" }>
      <MdOutlineSportsMotorsports name={ "Pengiriman" }/>
    </ListSlidebar>

    <ListSlidebar paths={ "/bank/list" } title={ "Bank" }>
      <HiOutlineBanknotes name={ "Bank" }/>
    </ListSlidebar>
  </div> )
}

const ListSlidebar = memo( function ListSlidebar(
  { children, paths, title, }:
    { children: ReactNode, paths: string, title: string, } ) {

  const pathname = usePathname()
  const path     = pathname.split( "/" )[ 1 ]
  // console.table( { path, title })
  return ( <li>
      <Link href={ paths } replace={ true }
            className={ `flex rounded items-center px-2 py-2
                  ${ path.includes( title.toLowerCase() ) ? " bg-info  hover:bg-blue-500 "
                                                          : " bg-success  hover:bg-green-500 " } 
                  ` }
      >
        { children }
        <span className={ `ml-2 text-white font-bold  ` }>{ title }</span>
      </Link>
    </li>
  )
} )