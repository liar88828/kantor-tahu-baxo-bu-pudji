"use client"
import React, { useEffect, useState } from 'react';
import { TOrderServer } from '@/entity/server/orderan';
import { setHours, setTanggal } from '@/lib/utils/formatDate';
import { TPOrderan } from '@/entity/server/produkOrderan';
import { Rupiah } from '@/lib/utils/rupiah';
import { statusWarna } from '@/app/style/status';

const MyComponent = () => {
  const [ table, setTable ] = useState( [] );

  useEffect( () => {
    const tableData = sessionStorage.getItem( "table" )
    if( tableData ) {
      setTable( JSON.parse( tableData ) )
    }
  }, [] )

  function getPrint( data: TPOrderan[], option: string ) {
    if( option === "total" ) {
      return data.reduce( ( acc: number, item: TPOrderan ): number => acc +
        item.harga * item.jumlah, 0 );
    }
    if( option === "subTotal" ) {
      return data.reduce( ( acc: number, item: TPOrderan ): number => acc +
        item.harga * item.jumlah, 0 )
    }
    if( option === "paket" ) {
      return data.reduce( ( a, c ) => a + c.jumlah, 0 )
    }
  }

  return (

    <div className={ "flex flex-wrap bg-white border border-black w-[297mm]" }>{
      table
      .sort( ( a: TOrderServer, b: TOrderServer ) => a.semuaProduct.length - b.semuaProduct.length )
      .map( ( d: TOrderServer ) => {
        return (

          <div className={ "border border-black p-2 m-2 w-[calc(297mm/2-.5cm)] text-xs " }
               key={ d.id }>
            {/*----------------------Head*/ }
            <div className=" flex flex-row justify-between ">
              <ul className=" w-[70%] flex flex-col gap-2">
                <li className={ "flex gap-1" }>
                  <h1 className={ "uppercase" }>Pemesan</h1>
                  <p>:</p>
                  <span>{ d.penerima }</span>

                </li>
                <li className={ "flex gap-1" }>
                  <h1 className={ "uppercase" }>Pengirim</h1>
                  <p>:</p>

                  <span>{ d.pengirim }</span>

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

              <div className=" w-[30%] text-center text-xs">
                <div className={ "border border-black break-alls " +
                  statusWarna( d.status ) }>
                  <h1
                    className={ "uppercase text-xs font-bold" }>{ d.status }</h1>
                  <h1
                    className={ "uppercase text-md font-bold" }>{ setTanggal( d.kirim, "hari" ) }</h1>
                  <p>{ setTanggal( d.kirim.toString(), "angka" ) }</p>
                  <p className={ "font-bold" }>{ setHours( d.kirim ) }</p>
                </div>
                <div className="border border-black text-xs">
                  <h1>Outlet</h1>
                  <p className={ " " }>Jl. parmulasih No. 15 Semarang</p>
                </div>
                <div className=" ">
                  <h1
                    className={ "italic underline font-bold text-[8pt] whitespace-nowrap " }>BUKAN
                    BUKTI BAYAR</h1>
                </div>
              </div>
            </div>
            {/*---------------------Table*/ }

            <table className={ "text-xs w-full" }>
              <thead className={ "border-black border" }>
              <tr className={ "border-black border" }>
                <th className={ "border-black border" }>No.</th>
                <th className={ "border-black border" }>Nama Barang</th>
                <th className={ "border-black border" }>Banyaknya</th>
                <th className={ "border-black border" }>Harga Satuan</th>
                <th className={ "border-black border" }>Jumlah</th>
              </tr>
              </thead>

              <tbody>
              { d.semuaProduct.map( ( t: TPOrderan, i: number ) => {
                return (

                  <tr className={ "border-black border" } key={ d.id }>
                    <td className={ "border-black border text-center" }>{ i +
                      1 }</td>
                    <td className={ "border-black border" }>{ t.nama }</td>
                    <td className={ "border-black border" }>{ t.jumlah }</td>
                    <td
                      className={ "border-black border" }>{ Rupiah( t.harga ) }</td>
                    <td className={ "border-black border" }>{ Rupiah( t.harga *
                      t.jumlah ) }</td>
                  </tr>
                )
              } ) }


              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className={ "font-bold" }> SubTotal</td>
                <td>{ Rupiah( getPrint( d.semuaProduct, "subTotal" ) ) }</td>
              </tr>

              </tbody>
            </table>

            {/*-----------------------Footer*/ }
            <div className="flex flex-row justify-between  mt-1 ">
              {/*tanda tangan */ }
              <div className="flex flex-col w-[60%] justify-between ">
                <div className="flex flex-row mb-10 gap-1">
                  <h1 className={ "font-bold" }>Catatan</h1>
                  <p>:</p>
                  <p> Keterangan Untuk Ngaji</p>
                </div>
                <div className="flex flex-row justify-around ">
                  <div className={ " text-center" }>
                    <p>Customer</p>
                    <br/>
                    <p>( Tanda Tangan )</p>
                  </div>
                  <div className={ " text-center" }>
                    <p>Penerima Pemesanan</p>
                    <br/>
                    <p>( TSO )</p>
                  </div>
                </div>
              </div>


              <div className="text-xs w-[40%] text-end  ">
                <table className={ "w-full" }>
                  <tbody className={ "border border-black " }>
                  <tr>
                    <td className={ "text-[7pt]" }>Total</td>
                    <td className={ "text-[7pt]" }>:</td>
                    <td className={ "text-[7pt]" }>{ Rupiah( getPrint( d.semuaProduct, "total" ) ) }</td>
                  </tr>
                  <tr>
                    <td className={ "text-[7pt]" }>Biaya Kirim</td>
                    <td className={ "text-[7pt]" }>:</td>
                    <td className={ "text-[7pt]" }>{ Rupiah( d.ongkir ) }</td>
                  </tr>
                  <tr>
                    <td className={ "text-[7pt]" }>Total + Biaya Kirim</td>
                    <td className={ "text-[7pt]" }>:</td>
                    <td className={ "text-xs font-bold" }>{ Rupiah( d.ongkir +
                      d.semuaProduct.reduce( ( acc, item ) => acc +
                        item.harga * item.jumlah, 0 ) ) }</td>
                  </tr>

                  <tr>
                    <td className={ "text-[7pt]" }>Total Berat</td>
                    <td className={ "text-[7pt]" }>:</td>
                    <td className={ "text-[7pt]" }>50 kg</td>
                  </tr>
                  <tr>
                    <td className={ "text-[7pt]" }>Jumlah Paket</td>
                    <td className={ "text-[7pt]" }>:</td>
                    <td className={ "text-[7pt]" }> { getPrint( d.semuaProduct, "paket" ) } Paket</td>
                  </tr>
                  </tbody>

                  <tbody className={ "border border-black mt-5 " }>
                  <tr>
                    <td className={ "text-[7pt]" }>Pembayaran</td>
                    <td className={ "text-[7pt]" }>:</td>
                    <td className={ "font-bold" }>{ d.typePembayaran }</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        )
      } ) }
    </div>

  );
};

export default MyComponent;
