import React from 'react';
import { TOrder } from '../../../entity/orderan';
import { Rupiah } from '../../../lib/rupiah';

function TableOrder( props: any ) {
  const { data }: { data: TOrder } = props
  // console.table(data)
  let arrayProduct = []
  let arrayItem = []

  if( data.Product.length > 0 ) {
    // console.log("filter jenis" )
    for( let i = 0; i < data.Product.length; i++ ) {
      if( data.Product[ i ].jenis == "Orderan" ) arrayProduct.push( data.Product[ i ] )
      if( data.Product[ i ].jenis == "Item" ) arrayItem.push( data.Product[ i ] )
    }
  }
  // console.log( arrayProduct, arrayItem )

  // for( let i = 0; i < data.Product.length; i++ ) {
  //
  // }

  return (
    <>

      <div className=" ml-2  relative overflow-x-auto shadow-md rounded-lg bg-white p-2 mt-1 ">
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
              { data.total.no }
            </th>
            <td scope="row" className="border border-slate-300 px-4 py-4 whitespace-nowrap">
              {/*<time>{ data.tanggal.pesan.toString() }</time>*/ }
            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap ">
              {/*<time>{ data.tanggal.kirim.toString() }</time>*/ }
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap ">
              {/*<time>{ data.tanggal.waktuKirim.toLocaleString( "id_ID", { hour12: false } ) }</time>*/ }
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
              { data.orang.pengirim }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4">
              { data?.orang.hpPengirim }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap">
              { data.orang.penerima }
            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4">
              { data.Product[ 0 ].jenis == "Orderan"
                ? data.Product[ 0 ].nama : "" }
            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">
              { data.Product[ 0 ].jenis == "Orderan"
                ? Rupiah( data.Product[ 0 ].harga ) : 0 }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4">
              { data.Product[ 0 ].jenis == "Orderan"
                ? data.Product[ 0 ].jumlah : 0 }
            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">
              { data.Product[ 0 ].jenis == "Orderan"
                ? Rupiah( Number( data?.Product[ 0 ].jumlah )
                  * Number( data.Product[ 0 ].harga )
                ) : 0
              }
            </td>


            {/*----------------------Item-----------------------*/ }

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">
              { data.Product[ 0 ].jenis == "Item" ?
                data.Product[ 0 ].nama : "" }
            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4">
              { data.Product[ 0 ].jenis == "Item"
                ? Rupiah( data.Product[ 0 ].harga )
                : 0 }
            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">
              { data.Product[ 0 ].jenis == "Item" ?
                data.Product[ 0 ].jumlah : 0 }
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">

              { data.Product[ 0 ].jenis == "Item" ?
                Rupiah(
                  Number( data.Product[ 0 ].jumlah )
                  * Number( data.Product[ 0 ].harga ) )
                : 0 }
            </td>

            <td scope="row" className="border border-slate-300 px-4 py-4">
              { data?.keterangan.lokasi }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">
              { data.travel.ekspedisi }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4">
              { Rupiah( data.travel.ongkir ) }
            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">
              { data.Product[ 0 ].harga
                ? Rupiah(
                  Number( data?.Product[ 0 ].jumlah )
                  * Number( data.Product[ 0 ].harga )
                ) : 0
              }
            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4">
              {
                Rupiah(
                  ( data.Product[ 0 ].jenis == "Orderan" ?
                      Number( data?.Product[ 0 ].jumlah )
                      * Number( data.Product[ 0 ].harga )
                      : 0
                  )
                  +
                  ( data.Product[ 0 ].nama ?
                      Number( data.Product[ 0 ].jumlah )
                      * Number( data.Product[ 0 ].harga ) : 0
                  )
                  +
                  Number( data?.travel.ongkir )
                )
              }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4">
              {/*{ data.total.pembayaran }*/ }
            </td>
            <td scope="row" className="border border-slate-300  py-4  px-4  break-all w-3/4 "
              //break-all whitespace-normal style={ {
              //   inlineSize: "150px",
              //   overflowWrap: "break-word"
              // } }
            >
              <div className="w-[10rem]">
                <div className="line-clamp-3">
                  {/*{ data.keterangan.guna }*/ }
                </div>
              </div>
            </td>
            <td scope="row" className="border border-slate-300  py-4  px-4  break-all w-3/4 ">
              <div className="w-[10rem]">
                {/*<div className="line-clamp-3">{ data.dataOrang }</div>*/ }
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
            </td>

          </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableOrder;