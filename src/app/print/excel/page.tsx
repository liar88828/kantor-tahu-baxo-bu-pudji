"use client"
import React, { useEffect, useState } from 'react';
import { TOrderServer } from '@/entity/server/orderan';
import { config } from '../../../../dataEnv';
import { setTanggal } from '@/lib/utils/formatDate';
import Image from 'next/image';
import { formatPhoneNumber } from '@/lib/utils/formatNumber';

const MyComponent = () => {
  const [ table, setTable ] = useState( [] );

  useEffect( () => {
    const tableData = sessionStorage.getItem( "table" )
    if( tableData ) {
      setTable( JSON.parse( tableData ) )
    }
  }, [] )
  // console.log( table )
  // console.log( "---------------------" )
  return (

    <div className={ "flex flex-wrap bg-white border border-black w-[297mm]" }>{
      table
      .sort( ( a: TOrderServer, b: TOrderServer ) => a.semuaProduct.length - b.semuaProduct.length )
      .map( ( d: TOrderServer ) => {

        const idOrderan: string[] = []

        function getId( d: TOrderServer, idOrderan: string[], lokasi: string ) {
          const ids = d.id.split( lokasi )
          idOrderan.push( ids[ 0 ] )
          idOrderan.push( lokasi + ids[ 1 ] )
        }

        const id    = d.id.split( "_" )
        const idLok = id.at( -2 )
        if( idLok ) {
          getId( d, idOrderan, idLok );

        }

        return (

          <div className={ "border-double border-4 border-black m-2 max-w-[10cm] min-w-[10cm] " +
            " max-h-[10cm] min-h-[10cm] text-[7pt]" }
               key={ d.id }>
            {/*----------------------Head*/ }
            <div className="  flex justify-between p-1">
              <div className="   ">
                <Image alt="gambar" src={ config.url + "/img.png" } width={ 200 } height={ 100 }/>
              </div>
              <div className="text-end">
                <p>{ idOrderan[ 0 ] }</p>
                <p>{ idOrderan[ 1 ] }</p>
                <p>{ setTanggal( d.kirim, "full" ) }</p>
              </div>
            </div>


            <div className=" flex flex-row justify-between border-white border-dashed border border-y-black">

              <ul className=" w-[70%] flex flex-col gap-2   p-1 ">
                <li className={ "flex gap-1" }>
                  <h1 className={ "uppercase font-bold" }>{ d.penerima }</h1>
                </li>
                <li className={ "flex gap-1" }>
                  <h1 className={ "uppercase" }>Tlp. <a>{ formatPhoneNumber( d.hpPenerima ?? 12 ) }</a></h1>
                </li>

                <li className={ "flex gap-1" }>
                  <h1
                    className={ "uppercase whitespace-nowrap" }>{ d.alamatPenerima }</h1>
                </li>
              </ul>

              <div className=" w-[30%] text-xs border-dashed border-2 border-white border-l-black">
                <div className={ " break-alls text-center" }>
                  <p className={ "uppercase text-[8pt] font-bold" }>Dari :</p>
                  <p className={ "uppercase text-[8pt] font-bold" }> { d.pengirim }</p>
                  <p className={ "uppercase text-[8pt] font-bold" }> { formatPhoneNumber( d.hpPengirim ?? 12 ) }</p>
                </div>
                <div className="border border-t-black border-white">
                  <h1>QC : </h1>
                  <p>Catatan</p>
                </div>


              </div>
            </div>
            {/*---------------------Table*/ }
            <div className="">
              <div className="ml-2">
                <h1 className={ "font-bold" }>Pesanan : </h1>
              </div>
              <div className="ml-2  flex flex-wrap flex-col w-fit max-h-20">

                { d.semuaProduct
                   .sort( ( a, b ) => a.nama.length - b.nama.length )
                   .map( ( p, index ) => ( <p className={ "flex-inline  w-[6rem]" } key={ p.id }>
                     {/*{ index + 1 }.*/ }
                     { p.jumlah }x{ p.nama }</p> ) ) }

              </div>
            </div>

            <div className="flex flex-row justify-between  mt-1 ">
              {/*tanda tangan */ }
              <div className="ml-2 mb-2">
                <h1 className={ "font-bold" }>Catatan : </h1>
                <p> { d.guna }</p>
              </div>
            </div>
            {/*-----------------------Footer*/ }

            <div className="border-t-2 border-dotted border-black ">

              <h1 className={ "text-lg uppercase font-bold text-center " }>
                MAKANAN BASAH, SEGERA DIBUKA</h1>
            </div>
          </div>

        )
      } ) }
    </div>

  );
};

export default MyComponent;
