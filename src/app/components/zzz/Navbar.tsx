"use client"
import React, { memo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { styleLabelForm } from '@/app/style/form';
import Image from 'next/image';
import profilePic from "../../../../public/logo.png"

const Navbar = memo( function Navbar() {
  const [ open, setOpen ] = useState<boolean>( true );
  const path = usePathname().split( "/" )[ 1 ].toUpperCase()

  const linkNavbar = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-green-400 md:dark:hover:text-blue-500 md:hover:text-white md:dark:hover:bg-transparent md:p-0.5  md:border-0  dark:hover:bg-gray-200 ";
  return (
    <div className={ `${ path.toLowerCase() === "print" ? "hidden" : "block" } w-[100%]` }>
      <nav className="bg-green-400 border-gray-200 ">

        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link className="flex items-center" href={ "/dashboard" }>
            <Image
              src={ profilePic }
              priority
              className={ "w-24 h-auto" }
              alt="/logo.png"/>

            <span
              className={ "    text-3xl font-bold text-white ml-5" +
                " font-poppins " + styleLabelForm }>{ path || "DASHBOARD" }
            </span>
          </Link>

          <button
            onClick={ () => setOpen( !open ) }
            data-collapse-toggle="navbar-default" type="button"
            className="inline-flex items-center p-2 w-10  justify-center text-sm text-black rounded-lg md:hidden bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  "
            aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>

            <svg className="w-5 h-5" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"/>
            </svg>

          </button>

          <div
            className={ `${ !open ? "h-60" : "hidden"
            } w-full md:block md:w-auto ` }
            id="navbar-default trans"
            style={ { transition: "all .5s ease ", transitionDuration: ".5s" } }
          >

            <ul className=" font-medium flex flex-col p-4  mt-4 border border-gray-100 rounded-lg bg-gray-50
            md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white md:p-2">
              <li>
                <Link href="#"
                      className={ linkNavbar }
                      aria-current="page">Orderan</Link>
              </li>
              <li>
                <Link href="#"
                      className={ linkNavbar }>About</Link>
              </li>
              <li>
                <a href="#"
                   className={ linkNavbar }>Services</a>
              </li>
              <li>
                <a href="#"
                   className={ linkNavbar }>Pricing</a>
              </li>
              <li>
                <a href="#"
                   className={ linkNavbar }>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
} )

export default Navbar