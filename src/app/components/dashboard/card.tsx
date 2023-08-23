"use client"
import React, { Fragment } from 'react';
import { AiOutlineBook, AiOutlineCheckCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import { FiTruck } from 'react-icons/fi';
import { Status } from '@/app/style/status';
import Link from 'next/link';
import { TStatus } from '@/app/dashboard/dashboard';

export type TTextStatus = "Di terima" | "Di Kirim" | "Di Proses" | "Selesai"

function Cards( { title, icon, rout, totalStatus }: {
  title: string,
  icon: React.ReactNode,
  rout: string,
  totalStatus: number
} ) {
  return <div
    className={ " flex card-compact card w-[47%] sm:w-[31%] md:w-[22%] px-2 sm:px-2 md:px-4 h-[60%] my-[.2rem] " +
      Status( title ) }>
    <div className="card-body flex-row justify-between  flex flex-wrap">

      <div className={ " card-title     " }>
        <i>{ icon }</i>
        <div className=" card-title  "> { totalStatus }</div>
      </div>

      <div className={ " card-actions " }>
        <Link href={ rout }>
          <button className={ "btn btn-sm flex flex-row items-center whitespace-nowrap" }>
            { title }
          </button>
        </Link>
      </div>
    </div>

  </div>;
}

export function HorizontalCard( { datas }: {
  datas: TStatus[]
} ) {
  const iconStyle = "w-6 sm:w-6 h-auto";

  const objectarray = datas.map( d => {
    const count = d._count.status
    const nama  = d.status
    return { count, nama }
  } )
  console.log( objectarray )

  function getDiTerimaObject( status: TTextStatus ) {
    // return objectarray.some( obj => obj.nama === status );// back boolean
    return objectarray.find( obj => obj.nama === status );
  }

  getDiTerimaObject( "Di Kirim" );
  return (
    <>

      <Cards totalStatus={ getDiTerimaObject( "Di terima" )?.count || 0 }
             title={ "Di Terima" }
             rout={ "table/Di Terima" }
             icon={ <AiOutlineBook className={ iconStyle }/> }
      />
      <Cards totalStatus={ getDiTerimaObject( "Di Proses" )?.count || 0 }
             title={ "Di Proses" }
             rout={ "table/Di Proses" }
             icon={ < AiOutlineShoppingCart className={ iconStyle }/> }
      />
      <Cards totalStatus={ getDiTerimaObject( "Di Kirim" )?.count || 0 }
             title={ "Di Kirim" }
             rout={ "table/Di Kirim" }
             icon={ <FiTruck className={ iconStyle }/> }
      />
      <Cards totalStatus={ getDiTerimaObject( "Selesai" )?.count || 0 }
             title={ "Selesai" }
             rout={ "table/Selesai" }
             icon={ <AiOutlineCheckCircle className={ iconStyle }/> }
      />
    </ >
  );
}

