"use client"
import React, { Fragment } from 'react';
import { AiOutlineBook, AiOutlineCheckCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import { FiTruck } from 'react-icons/fi';
import { Status } from '@/app/style/status';
import Link from 'next/link';

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

export function HorizontalCard() {
  const iconStyle = "w-6 sm:w-6 h-auto";
  return (
    <Fragment>
      <Cards totalStatus={ 10 }
             title={ "Di Terima" }
             rout={ "table/Di Terima" }
             icon={ <AiOutlineBook className={ iconStyle }/> }
      />
      <Cards totalStatus={ 20 } title={ "Di Proses" }
             rout={ "table/Di Proses" }
             icon={ < AiOutlineShoppingCart className={ iconStyle }/> }
      />
      <Cards totalStatus={ 40 }
             title={ "Di Kirim" }
             rout={ "table/Di Kirim" }
             icon={ <FiTruck className={ iconStyle }/> }
      />
      <Cards totalStatus={ 30 }
             title={ "Selesai" }
             rout={ "table/Selesai" }
             icon={ <AiOutlineCheckCircle className={ iconStyle }/> }
      />
    </Fragment>
  );
}

