"use client"
import { memo, useState } from "react";
import { AiOutlineArrowLeft, } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import LinkSlide from '@/app/elements/link/LinkSlide';

const Slidebar = memo( function Slidebar() {
  const [ open, setOpen ] = useState( false );
  const pathname = usePathname()
  const path     = pathname.split( "/" )[ 1 ].toUpperCase()

  return (
    <div className={ ` relative transition-all duration-150 flex bg-green-200 flex-col
    ${ open ? "w-72 p-4 sm:p-1" : "w-12 " }
    ${ path.toLowerCase() === "print" ? "hidden" : "block" } `
    }>
      {/*----------------button arrow---------------*/ }
      <AiOutlineArrowLeft
        className={ ` z-[6] mt-3 bg-white w-9 h-9 -right-3 p-1 absolute rounded-xl border-black border-2
           transition-all duration-500 ` }
        onClick={ () => setOpen( !open ) }
        style={ { cursor: "pointer", transform: open ? " rotate(180deg) " : "" } }
      />

      {/* ------------------name logo------------- */ }
      { open && ( <h1 className="text-black font-bold text-center my-2">Main Menu</h1> ) }


      {/*<LinkSlide open={ open } pathname={ pathname }/>*/ }
    </div>
  );
} )

export default Slidebar
