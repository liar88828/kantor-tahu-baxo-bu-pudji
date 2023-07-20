import React, { useState } from 'react';
import { Rupiah } from '../../../lib/rupiah';
import { TFormProduct } from '../../../entity/produk';
import { Status } from '@/app/style/status';
import { TotalOrderan } from '../../../entity/orderan';
import { PopUp } from '@/app/orderan/PopUp';

function TableOrder( props: any ) {
  const [ clickPopUp, setClickPopUp ] = useState( false );
  const { data }: { data: TotalOrderan } = props
  console.info( data )
  // if( data?.Product.length > 0 ) {
  //   // console.log("filter jenis" )
  //   for( let i = 0; i < data?.Product.length; i++ ) {
  //     if( data?.Product[ i ].jenis == "Orderan" ) arrayProduct.push( data?.Product[ i ] )
  //     if( data?.Product[ i ].jenis == "Item" ) arrayItem.push( data?.Product[ i ] )
  //   }
  // }
  // console.log( arrayProduct, arrayItem )
  // for( let i = 0; i < data?.Product.length; i++ ) {
  //
  // }
  // const data2 = { ...data.listItem, ...data.listOrderan }

  console.log( data )

  const Jumlah: React.FC<{ d: TFormProduct[] }> = ( { d } ) => {
    return (
      <>
        { d.map( ( o ) => (
          <span key={ o.harga + o.jenis } className={ "flex border-gray-200 border" }>
          { Rupiah( Number( o.harga ) * Number( o.jumlah ) ) }
        </span>
        ) ) }
      </>
    );
  };
  console.log(
    Status( data.total.status ) )

  const KeteranganProduct: React.FC<{ d: TFormProduct[], k: string, t: string }> = ( { d, k, t } ) => {
    // console.log(d,"asdasd")
    //   if( k === "Item" ) {
    //     return d.filter( ( o ) => o.jenis === "Item" );
    //   }
    //   else if( k === "Orderan" ) {
    //     return d.filter( ( o ) => o.jenis === "Orderan" );
    //   }
    //   return d;
    // }

    // const filteredItems = d.filter((o) => {
    //   console.log(d,"======jenis")
    //
    //   if (o.jenis == "Item") {
    //     console.log(o.jenis,"=====item")
    //     return d.filter( ( o ) => o.jenis === "Item" );
    //
    //   } else if (o.jenis === "Orderan") {
    //     console.log(o.jenis,"====orderan")
    //     return d.filter( ( o ) => o.jenis === "Orderan" );
    //   }
    //
    //   return true; // If 'k' is neither "Item" nor "Orderan", show all items
    // });

    // t = t.length === 0 ? "Orderan" : t

    const filteredItems = d.filter( ( o ) => {
      if( t === "Item" ) {
        return o.jenis === "Item";
      }
      else if( t === "Orderan" ) {
        return o.jenis === "Orderan";
      }
      return true; // If 'j' is neither "Item" nor "Orderan", show all items
    } );

    // console.log(filteredItems)
    return ( <>
        { filteredItems.map( ( o: TFormProduct ) => {
            let ket
            if( k === "harga" ) {
              ket = o.harga
            }
            else if( k == "nama" ) {
              ket = o.nama
            }
            else if( k == "jumlah" ) {
              ket = o.jumlah
            }
            else if( k == "total" ) ket = Rupiah( Number( o.harga ) * Number( o.jumlah ) )

            return ( <span className={ "flex border-gray-200 border" }
                           key={ o.harga + o.jenis }>{ ket }</span> )
          }
        ) }
      </>

    )
  }

//   const Jumlah = ( d: TFormProduct[] ): JSX.Element[] => {
//     return d.map( ( o ) => {
//       // order harga kali harga
//       return (
//         <span key={ o.harga + o.jenis } className={ "flex border-gray-200 border" }>
//         { Rupiah( Number( o.harga ) * Number( o.jumlah ) ) }
//       </span> )
//     } )
//   }
//
//   // Use the Jumlah function to render the total prices for each item
//   const totalPriceElements: JSX.Element[] = Jumlah(data.listOrderan);
//
// // Then you can use totalPriceElements in your JSX to display the calculated prices
// // For example, render it within a div:
//   const App = (): JSX.Element => <div>{totalPriceElements}</div>;

// Define the Jumlah function with type annotations
//   const Jumlahs = ( d: TFormProduct[] ): JSX.Element[] => {
//     return d.map( ( o ) => {
//       // Calculate total price for each item (harga * jumlah) and format it using Rupiah function
//       return (
//         <span key={ o.harga + o.jenis } className={ "flex border-gray-200 border" }>
//         { Rupiah( Number( o.harga ) * Number( o.jumlah ) ) }
//       </span>
//       );
//     } );
//   };

  // function HitungJumlahPesanan( d: TFormProduct[] ) {
  //
  //   let totalHitung = 0
  //
  //   for( const o of d ) {
  //     totalHitung += Number( o.harga ) * Number( o.jumlah )
  //   }
  //   console.log( totalHitung )
  // }
  //
  // HitungJumlahPesanan( data.listOrderan )
//   const Jumlah = () => {
//
//     return ( <>
// <span>
//     <h1></h1>
// </span>
//
//       </>
//
//     )
//   }

  // const Penjumlahan = ( { tag: Tag = "input", title, type, reg, value, min, defaultValue } ): ReactElement => {
  //
  //     return (
  //       <div className="flex flex-col">
  //         <label
  //           className={ styleLabelForm }
  //           htmlFor="grid-password">{ title }</label>
  //
  //         <Tag { ...ress }{ ...reg }/>
  //       </div>
  //     )
  //       ;
  //   }
  // ;

  <>


  </>

  return (
    <>
      {/*<Jumlah/>*/ }

      {/*<KeteranganProduct d={ data.listOrderan } k={ "nama" }t={"Orderan"}/>*/ }
      {/*<KeteranganProduct d={ data.listItem } k={ "nama" } t={"Item"} />*/ }


      <div className=" z-10 ml-2  relative overflow-x-auto shadow-md rounded-lg bg-white p-2 mt-1 ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded table-auto">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 rounded">
          <tr>
            <th scope="col" className="px-4 py-3">No.</th>
            {/*------------------Waktu--------------------------*/ }
            <th scope="col" className="px-4 py-3 bg-green-400">Pesan</th>
            <th scope="col" className="px-4 py-3 bg-red-500 dark:bg-gray-800">Kirim</th>
            <th scope="col" className="px-4 py-3 bg-red-500 dark:bg-gray-800">Waktu Kirim</th>

            {/*---------------------------------------------------------------*/ }
            <th scope="col" className="px-4 py-3 bg-gray-50 dark:bg-gray-800">pengirim</th>
            <th scope="col" className="px-4 py-3">Telpon Pengirim</th>
            <th scope="col" className="px-4 py-3 bg-gray-50 dark:bg-gray-800">Penerima</th>
            {/*---------------------Order----------------*/ }
            <th scope="col" className="px-4 py-3 bg-yellow-100">Orderan</th>
            <th scope="col" className="px-4 py-3 bg-yellow-300 dark:bg-gray-800">Harga Order</th>
            <th scope="col" className="px-4 py-3 bg-yellow-100">Jumlah Order</th>
            <th scope="col" className="px-4 py-3 bg-yellow-100">Total Order</th>

            {/*---------------------Item----------------*/ }
            <th scope="col" className="px-4 py-3 bg-red-500 dark:bg-gray-800">Item</th>
            <th scope="col" className="px-4 py-3 bg-red-300">Harga Item</th>
            <th scope="col" className="px-4 py-3 bg-red-500 dark:bg-gray-800">Jumlah Item</th>
            <th scope="col" className="px-4 py-3 bg-red-500 dark:bg-gray-800">Total Item</th>

            {/*---------------------------------------------------------*/ }
            <th scope="col" className="px-4 py-3">Lokasi</th>
            <th scope="col" className="px-4 py-3 bg-blue-400 dark:bg-gray-800">Ekspedisi</th>
            <th scope="col" className="px-4 py-3 bg-green-300">Ongkir</th>
            <th scope="col" className="px-4 py-3 bg-green-200 dark:bg-gray-800">Total Penjualan</th>
            <th scope="col" className="px-4 py-3 bg-green-300">Total Bayar</th>
            <th scope="col" className="px-4 py-3 bg-yellow-100 dark:bg-gray-800">pembayaran</th>
            <th scope="col" className="px-4 py-3  w-3/4">Keterangan</th>
            <th scope="col" className="px-4 py-3  w-3/4">Status</th>
            <th scope="col" className="px-4 py-3  w-3/4">Action</th>
          </tr>
          </thead>

          <tbody>

          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th scope="row" className="border border-slate-300 px-4 py-4 whitespace-nowrap">
              { data?.total.no }
            </th>
            <td scope="row" className="border border-slate-300 px-4 py-4 whitespace-nowrap">
              <time>{ data?.tanggal.pesan.toString() }</time>
            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap ">
              <time>{ data?.tanggal.kirim.toString() }</time>
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap ">
              <time>{ data?.tanggal.waktuKirim.toLocaleString( "id_ID", { hour12: false } ) }</time>
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
              { data?.orang.pengirim }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4">
              { data?.orang.hpPengirim }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap">
              { data?.orang.penerima }
            </td>

            <td scope="row" className="border border-slate-300 px-4 py-4">
              {/* --------------------------orderan  */ }
              <KeteranganProduct d={ data.listOrderan } k={ "nama" } t={ "Order" }/>
              {/*{ data?.listOrderan.map( o => <span*/ }
              {/*  className={ "flex border-gray-200 border" }*/ }
              {/*  key={ o.harga + o.jenis }>*/ }
              {/* { o.nama }*/ }
              {/*  </span>*/ }
              {/*) }*/ }
              {/*{ data?.listOrderan.map( o => o.nama ) }*/ }
              {/*data?.listOrderan[ 0 ]?.jenis == "Orderan" ? data?.listOrderan[ 0 ].nama : "" }*/ }
              {/*{ data?.Product[ 0 ].jenis == "Orderan" ? data?.Product[ 0 ].nama : "" }*/ }
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">
              <KeteranganProduct d={ data.listOrderan } k={ "harga" } t={ "Orderan" }/>
              {/*{ data?.listOrderan.map( o => <span*/ }
              {/*  className={ "flex border-gray-200 border" }*/ }
              {/*  key={ o.harga + o.jenis }>*/ }
              {/* { o.harga }*/ }
              {/*  </span>*/ }
              {/*) }*/ }
              {/*{ data.listOrderan[ 0 ]?.jenis == "Orderan" ? Rupiah( data?.listOrderan[ 0 ].harga ) : 0 }*/ }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4">
              <KeteranganProduct d={ data.listOrderan } k={ "jumlah" } t={ "Orderan" }/>
              {/*{ data?.listOrderan.map( o => <span*/ }
              {/*  className={ "flex border-gray-200 border" }*/ }
              {/*  key={ o.harga + o.jenis }>*/ }
              {/* { o.jumlah }*/ }
              {/*  </span>*/ }
              {/*) }*/ }
              {/*{ data?.listOrderan[ 0 ]?.jenis == "Orderan" ? data?.listOrderan[ 0 ].jumlah : 0 }*/ }
            </td>


            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">
              {/*JUMLAH*/ }
              { Rupiah( data.hitung.semuaHargaOrderan ) }
              {/*<KeteranganProduct d={ data.listOrderan } k={ "total" } t={ "Orderan" }/>*/ }

              {/*<Jumlah d={ data.listOrderan }/>*/ }
              {/*{*/ }
              {/*  data?.listOrderan.map( o => <span*/ }
              {/*      className={ "flex border-gray-200 border" }*/ }
              {/*      key={ o.harga + o.jenis }>*/ }
              {/* { Rupiah( o.harga * o.jumlah )*/ }
              {/* }*/ }
              {/*  </span>*/ }
              {/*  )*/ }
              {/*}*/ }

              {/*{ data?.listOrderan[ 0 ]?.jenis == "Orderan"
               ? Rupiah( Number( data?.listOrderan[ 0 ].jumlah )*/ }
              {/*  * Number( data?.listOrderan[ 0 ].harga )*/ }
              {/*) : 0*/ }
              {/*}*/ }
            </td>


            {/*----------------------Item-----------------------*/ }

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">

              <KeteranganProduct d={ data.listItem } k={ "nama" } t={ "Item" }/>
              {/*{ data?.listItem.map( o => <span*/ }
              {/*  className={ "flex border-gray-200 border" }*/ }
              {/*  key={ o.harga + o.jenis }>*/ }
              {/* { o.nama }*/ }
              {/*  </span>*/ }
              {/*) }*/ }
              {/*{ data?.listItem[ 0 ]?.jenis == "Item" ?*/ }
              {/*  data?.listItem[ 0 ]?.nama : "" }*/ }

            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4">

              <KeteranganProduct d={ data.listItem } k={ "harga" } t={ "Item" }/>

              {/*<Harga d={ data.listItem }/>*/ }
              {/*{ data?.listItem.map( o => <span*/ }
              {/*  className={ "flex border-gray-200 border" }*/ }
              {/*  key={ o.harga + o.jenis }>*/ }
              {/* { Number( o.harga ) }*/ }
              {/*  </span>*/ }
              {/*) }*/ }

              {/*{ data?.listItem[ 0 ]?.jenis == "Item"*/ }
              {/*  ? Rupiah( data?.listItem[ 0 ]?.harga )*/ }
              {/*  : 0 }*/ }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">
              {/*{Rupiah(data.semuaHargaItem)}*/ }
              <KeteranganProduct d={ data.listItem } k={ "jumlah" } t={ "Item" }/>
              {/*{ data?.listItem.map( o => <span*/ }
              {/*  className={ "flex border-gray-200 border" }*/ }
              {/*  key={ o.harga + o.jenis }>*/ }
              {/* { o.jumlah }*/ }
              {/*  </span>*/ }
              {/*) }*/ }

              {/*{ data?.listItem[ 0 ]?.jenis == "Item" ?*/ }
              {/*  data?.listItem[ 0 ]?.jumlah : 0 }*/ }
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">
              {/*<KeteranganProduct d={ data.listItem } k={ "total" } t={ "Item" }/>*/ }
              {/*{ Rupiah( data.semuaProduct ) }*/ }
              { Rupiah( data.hitung.semuaHargaItem ) }

              {/*<KeteranganProduct d={ data.listItem } k={ "total" }/>*/ }
              {/*{ data?.listItem.map( o => <span className={ "flex border-gray-200 border" } key={ o.harga + o.jenis }>*/ }
              {/*{ Rupiah( Number( o.harga ) * o.jumlah ) }</span>*/ }
              {/*) }*/ }


              {/*<Jumlah d={ data.listItem }/>*/ }

            </td>

            <td scope="row" className="border border-slate-300 px-4 py-4">
              { data?.keterangan.lokasi }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">
              { data?.travel.ekspedisi }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4">
              { data?.travel.ongkir }
            </td>


            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">
              {/*{ data.hasOwnProperty()  }*/ }
              { Rupiah( data.hitung.semuaHargaOrderan ) }
              {/*{ data.listOrderan.map( ( o, i ) =>*/ }
              {/*    <span className={ "flex border-gray-200 border" } key={ o.harga + o.jenis }>*/ }
              {/*      /!*{ o.nama }*/ }
              {/*      /!*<br/>*/ }
              {/*      { Rupiah( Number( o.jumlah ) * Number( o.harga ) ) }*/ }
              {/*</span>*/ }
              {/*) }*/ }
            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4">
              { Rupiah( data.hitung.totalHarga ) }


              {/*{*/ }

              {/*  dataProduct.map( o => <span*/ }
              {/*      className={ "flex border-gray-200 border" }*/ }
              {/*      key={*/ }
              {/*        Number( o.harga )*/ }
              {/*        * Number( o.jumlah )*/ }
              {/*      }>*/ }

              {/*    { Rupiah(*/ }
              {/*      Number( o.harga )*/ }
              {/*      * Number( o.jumlah )*/ }

              {/*      + Number( data.travel.ongkir )*/ }
              {/*    ) }*/ }
              {/*  </span>*/ }
              {/*  )*/ }
              {/*}*/ }

              {/*{ data.listItem.map( o =>*/ }
              {/*  <span*/ }
              {/*    className={ "flex border-gray-200 border" }*/ }
              {/*    key={ o.harga + o.jenis }>*/ }
              {/*    <br/>*/ }
              {/*    { Rupiah( Number( o.jumlah ) * Number( o.harga ) + Number( data.travel.ongkir ) ) }*/ }
              {/*     </span>*/ }
              {/*) }*/ }


            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4">
              {/*{ data?.total.pembayaran }*/ }
              { data.total.pembayaran }


            </td>
            <td scope="row" className="border border-slate-300  py-4  px-4  break-all w-3/4 ">
              <div className="w-[10rem]">
                <div className="line-clamp-3">
                  { data?.keterangan.guna }
                </div>
              </div>
            </td>

            <td scope="row" className={ ` border border-slate-300  py-4  px-4  break-all w-3/4 ` }>
              <div


                className={ Status( data.total.status ) + "  w-[7rem] rounded-lg  text-center   dark:shadow-black/40   shadow shadow-red-300" }>
                {/*<div className={ Status( data.total.status ) + " text-white p-2 rounded  shadow-lg shadow-cyan-500/50 " }>*/ }
                { data.total.status }
                {/*</div>*/ }
              </div>
            </td>


            <td scope="row" className="border border-slate-300 px-4 py-4">
              <button
                onClick={ () => {
                  // onCreate()
                  // console.log( "create" )
                }
                }
                className="bg-green-500 p-2 rounded-md text-white">
                Create
              </button>
              <PopUp
                clickPopUp={ clickPopUp }
                setClickPopUp={ setClickPopUp }
                onCreate={ props.onCreate }
                data={ data }
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </>
  )
    ;
}

export default TableOrder;
