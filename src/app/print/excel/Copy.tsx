"use client"
import React, { useEffect, useState } from 'react';
import { TOrderServer } from '@/entity/server/orderan';
import { TPOrderan } from '@/entity/server/produkOrderan';
import { config } from '../../../../dataEnv';
import { setTanggal } from '@/lib/utils/formatDate';
import Image from 'next/image';

const MyComponent = () => {
  const [ table, setTable ] = useState( [] );

  useEffect( () => {
    const tableData = sessionStorage.getItem( "table" )
    if( tableData ) {
      setTable( JSON.parse( tableData ) )
    }
  }, [] )
  return (

    <div className={ "flex flex-wrap bg-white border border-black w-[297mm]" }>{
      table
      .sort( ( a: TOrderServer, b: TOrderServer ) => a.semuaProduct.length - b.semuaProduct.length )
      .map( ( d: TOrderServer ) => {

        const ganjil: TPOrderan[] = []
        const genap: TPOrderan[]  = []
        const idOrderan: string[] = []
        d.semuaProduct.forEach( ( c, i ) => i % 2 === 0 ? ganjil.push( c )
                                                        : genap.push( c )
        )

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

          <div className={ "border-double border-4 border-black   m-2 max-w-[10cm] max-h-[10cm] text-[7pt]" }
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


            <div className=" flex flex-row justify-between border-white  border-dashed border border-y-black">

              <ul className=" w-[70%] flex flex-col gap-2   p-1 ">
                <li className={ "flex gap-1" }>
                  <h1 className={ "uppercase" }>Kepada</h1>
                  <p>:</p>
                  <span>{ d.penerima }</span>
                </li>
                <li className={ "flex gap-1" }>
                  <h1 className={ "uppercase" }>Telp</h1>
                  <p>:</p>
                  <span>nama { d.hpPenerima }</span>
                </li>

                <li className={ "flex gap-1" }>
                  <h1
                    className={ "uppercase whitespace-nowrap" }>Penerima </h1>
                  <p>:</p>
                  <br/>
                  <p>
                    <a> { d.penerima } </a> <a>{ d.hpPenerima }</a>
                    <br/>
                    <a> { d.alamatPenerima } </a>
                    <br/>
                    <a>Kota Semarang 50279</a>
                  </p>
                </li>
              </ul>

              <div className=" w-[30%] text-xs border-dashed border-2 border-white  border-l-black">
                <div className={ " break-alls  text-center" }>
                  <p className={ "uppercase text-[8pt] font-bold" }>Dari :</p>
                  <p className={ "uppercase text-[8pt] font-bold" }> { d.pengirim }</p>
                  <p className={ "uppercase text-[8pt] font-bold" }> { d.hpPengirim }</p>
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
                <h1>Pesanan : </h1>
              </div>
              <div className="flex justify-center">

                <table className={ "text-[7pt]   " }>
                  <thead
                    className={ " " }>
                  <tr className={ "  " }>
                    <th className={ "border-black border " }>No.</th>
                    <th className={ "border-black border" }>Nama Barang</th>
                    <th className={ "border-black border border-r-white" }>Banyaknya</th>
                  </tr>
                  </thead>

                  <tbody>
                  { ganjil.map( ( t: TPOrderan, i: number ) => {
                    return (
                      <tr className={ " " } key={ d.id }>
                        <td className={ "border-black border text-center" }>{ i + 1 }</td>
                        <td className={ "border-black border" }>{ t.nama }</td>
                        <td className={ "border-black border border-r-white" }>{ t.jumlah }</td>
                      </tr>
                    )
                  } ) }
                  </tbody>
                </table>

                <table className={ "text-[7pt]  " }>
                  <thead className={ " " }>
                  <tr className={ " " }>
                    <th className={ "border-black border" }>No.</th>
                    <th className={ "border-black border" }>Nama Barang</th>
                    <th className={ "border-black border" }>Banyaknya</th>
                  </tr>
                  </thead>

                  <tbody>
                  { genap.map( ( t: TPOrderan, i: number ) => {
                    return (
                      <tr className={ " " } key={ d.id }>
                        <td className={ "border-black border text-center" }>{ ganjil.length + i + 1 }</td>
                        <td className={ "border-black border" }>{ t.nama }</td>
                        <td className={ "border-black border" }>{ t.jumlah }</td>
                      </tr>
                    )
                  } ) }
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-row justify-between  mt-1 ">
              {/*tanda tangan */ }
              <div className=" mb-10   ml-2">

                <h1 className={ "font-bold" }>Catatan : </h1>
                <p> { d.guna }</p>
              </div>
            </div>
            {/*-----------------------Footer*/ }

            <div className="border-t border-dotted border-black ">
              <h1 className={ "text-lg uppercase text-center font-bold text-bottom" }>
                MAKANAN BASAH, MOHON SEGERA DIBUKA
              </h1>
            </div>
          </div>

        )
      } ) }
    </div>

  );
};

export default MyComponent;
