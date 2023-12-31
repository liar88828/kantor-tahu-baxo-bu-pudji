"use client"
import React, { useState } from "react";
import { AiFillPieChart, AiOutlineArrowLeft, AiOutlineInbox, AiOutlineTable, } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits, MdOutlineSportsMotorsports } from "react-icons/md";
import Link from 'next/link';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';

const menuList = [
  { s: "bg-green-400", title: "Dashboard", icon: AiFillPieChart, link: "/" },
  { s: "bg-green-400", title: "Orderan", icon: MdOutlineProductionQuantityLimits, link: "/orderan" },
  { s: "bg-green-400", title: "Files", icon: AiOutlineTable, link: "/table/Semua" },
  { s: "bg-green-400", title: "Product", icon: AiOutlineInbox, gap: true, link: "/product/list" },
  { s: "bg-green-400", title: "Pengiriman", icon: MdOutlineSportsMotorsports, link: "/travel/list" },
  { s: "bg-green-400", title: "Bank", icon: HiOutlineBanknotes, link: "/bank/list" },
  // { title: "Analytic", icon: MdAnalytics, gap: true, link: "/form" },
  // { title: "Setting", icon: AiFillSetting, link: "/form" },
];

export const Slidebar = () => {
  const [ open, setOpen ] = useState( false );
  const pathname = usePathname()
  const path     = pathname.split( "/" )[ 1 ].toUpperCase()
  let colorTextSlideBar = "black"
  let titleSlideBar     = "black"
  let bgColorSlideBar   = "#d6ffe0"

  return (
    <div className={ `flex ${ path.toLowerCase() === "print" ? "hidden" : "block" } ` }>
      {/* body slide bar*/ }
      <div
        className={ ` ${ open ? "w-72 p-4 sm:p-1" : "w-12 sm:w-20" }   relative transition-all duration-150 ` }
        style={ { background: bgColorSlideBar } }>

        {/*----------------button arrow---------------*/ }
        <AiOutlineArrowLeft
          className={ ` z-[6] mt-3 bg-white w-9 h-9 -right-3 p-1 absolute rounded-xl border-black border-2
           transition-all duration-500 ` }
          onClick={ () => setOpen( !open ) }
          style={ { cursor: "pointer", transform: open ? "rotate(180deg)" : "" } }
        />
        {/*----------------button arrow---------------*/ }


        <div className="flex gap-4 justify-center">
          {/* logo -----------------------*/ }
          {/*<AiOutlineYoutube*/ }
          {/*  style={ { transform: open && "rotate(180deg)", } }*/ }
          {/*  className={`text-red-600 w-40 h-20 duration-500}`}*/ }
          {/*/>*/ }

          {/* ------------------name logo------------- */ }
          { open && ( <h3
              className="text-white mt-6  font-bold text-22"
              style={ { transition: open && "opacity 2s linear", } }>
              <span className="transition-all duration-75"
                    style={ { color: titleSlideBar, transition: "all 5s ease", } }>Main Menu
              </span>
            </h3>
          ) }
        </div>


        <ul className={ `${ !open && "mt-10" }  ml-1   sm:py-4 sm:px-4 ` }>
          { menuList.map( ( item ) => {
            const Icons = item.icon
            return (
              <Link href={ item.link } replace={ true } key={ item.title } className={ "" }>
                <li
                  style={ {
                    transition   : "all .5s ease",
                    borderRadius : ".5rem",
                    WebkitTransition: "all .5s ease",
                    MozTransition: "all .5s ease",
                  } }
                  className={ `flex gap-4 p-2
                   ${ pathname === item.link ?
                      " hover:bg-gradient-to-t hover:from-green-500 hover:via-green-700 hover:to-green-700" +
                        " bg-gradient-to-b from-green-500 to-green-700"
                                             :
                      " hover:bg-gradient-to-t hover:from-green-200 hover:via-green-400 hover:to-green-500 bg-gradient-to-b from-green-400 to-green-500" }
                   ${ item.gap ? 'mt-9' : 'mt-2' } 
                  ${ !open && 'justify-center' } `
                  }
                  key={ item.title }>
                <span className={ "text-white hover:scale-100 " }>
                  <Icons size={ '26px' }/></span>

                  { open && <span
                    style={ { color: colorTextSlideBar } }
                    className="text-white hover:font-bold  ">
                  { item.title }
                </span> }
                </li>
              </Link>
            )
          } ) }
        </ul>

      </div>
    </div>
  );
};

