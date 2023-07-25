import React, { useState } from 'react';
import { Rupiah } from '@/lib/utils/rupiah';
import { TFormProduct } from '@/entity/produk';
import { Status } from '@/app/style/status';
import { TotalOrderan } from '@/entity/orderan';
import { PopUp } from '@/app/components/orderan/PopUp';
import { Button } from '@material-tailwind/react';

function TableOrder( props: any ) {
  const [ clickPopUp, setClickPopUp ] = useState( false );
  const { data }: { data: TotalOrderan } = props

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

  const KeteranganProduct: React.FC<{ d: TFormProduct[], k: string, t: string }> = ( { d, k, t } ) => {
    const filteredItems = d.filter( ( o ) => {
      if( t === "Item" ) {
        return o.jenis === "Item";
      }
      else if( t === "Orderan" ) {
        return o.jenis === "Orderan";
      }
      return true; // If 'j' is neither "Item" nor "Orderan", show all items
    } );

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
  return (
    <>
      <div className=" z-10 ml-2  relative overflow-x-auto shadow-md rounded-lg bg-white p-2 mt-1 ">
        <table className="w-full text-sm text-left text-gray-500  rounded table-auto">
          <thead className="text-xs text-gray-700 uppercase   rounded">
          <tr>
            <th scope="col" className="px-4 py-3 bg-gray-400 ">No.</th>
            {/*------------------Waktu--------------------------*/ }
            <th scope="col" className="px-4 py-3 bg-red-500 ">Pesan</th>
            <th scope="col" className="px-4 py-3 bg-red-500 ">Kirim</th>
            <th scope="col" className="px-4 py-3 bg-red-500 ">Waktu Kirim</th>

            {/*---------------------------------------------------------------*/ }
            <th scope="col" className="px-4 py-3 bg-green-200 ">Nama Pengirim</th>
            <th scope="col" className="px-4 py-3 bg-green-200 ">Telpon Pengirim</th>
            <th scope="col" className="px-4 py-3 bg-blue-300 ">Nama Penerima</th>
            <th scope="col" className="px-4 py-3 bg-blue-300 ">Alamat Penerima</th>
            <th scope="col" className="px-4 py-3 bg-blue-300 ">Ho Hp Penerima</th>
            {/*---------------------Order----------------*/ }
            <th scope="col" className="px-4 py-3 bg-yellow-200 ">Orderan</th>
            <th scope="col" className="px-4 py-3 bg-yellow-200 ">Harga Order</th>
            <th scope="col" className="px-4 py-3 bg-yellow-200 ">Jumlah Order</th>
            <th scope="col" className="px-4 py-3 bg-yellow-200 ">Total Order</th>

            {/*---------------------Item----------------*/ }
            <th scope="col" className="px-4 py-3 bg-orange-400 ">Item</th>
            <th scope="col" className="px-4 py-3 bg-orange-400 ">Harga Item</th>
            <th scope="col" className="px-4 py-3 bg-orange-400 ">Jumlah Item</th>
            <th scope="col" className="px-4 py-3 bg-orange-400 ">Total Item</th>

            {/*----------------------Travel-----------------------------------*/ }
            <th scope="col" className="px-4 py-3 bg-fuchsia-400">Lokasi</th>
            <th scope="col" className="px-4 py-3 bg-fuchsia-400 ">Ekspedisi</th>
            <th scope="col" className="px-4 py-3 bg-fuchsia-400 ">Tipe Pembayaran</th>
            <th scope="col" className="px-4 py-3 bg-fuchsia-400 w-3/4">Keterangan</th>
            {/*---------------------------Hitung---------------------*/ }
            <th scope="col" className="px-4 py-3 bg-lime-300">Ongkir</th>
            <th scope="col" className="px-4 py-3 bg-lime-300">Total Penjualan</th>
            <th scope="col" className="px-4 py-3 bg-lime-300">Total Bayar</th>
            {/*-------------------Opsi----------------*/ }
            <th scope="col" className="px-4 py-3 bg-gray-200">Status</th>
            <th scope="col" className="px-4 py-3 bg-gray-200">Action</th>
          </tr>
          </thead>

          <tbody>

          <tr className="border-b border-gray-200 dark:border-gray-700">

            <th scope="row" className="border border-slate-300 px-4 py-4 whitespace-nowrap">
              { data?.total.no }
            </th>
            {/*------------Tanggal----------------*/ }
            <td scope="row" className="border border-slate-300 px-4 py-4 whitespace-nowrap">
              <time>{ data?.tanggal.pesan.toString() }</time>
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50  whitespace-nowrap ">
              <time>{ data?.tanggal.kirim.toString() }</time>
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50  whitespace-nowrap ">
              <time>{ data?.tanggal.waktuKirim.toLocaleString( "id_ID", { hour12: false } ) }</time>
            </td>

            {/*------------Pengirim----------------*/ }
            <td scope="row"
                className="border border-slate-300 px-4 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50  ">
              { data?.orang.pengirim }
            </td>

            <td scope="row" className="border border-slate-300 px-4 py-4">
              { data?.orang.hpPengirim }
            </td>

            {/*------------Penerima----------------*/ }
            <td scope="row" className="border border-slate-300 px-4 py-4 bg-gray-50  whitespace-nowrap">
              { data?.orang.penerima }
            </td>

            <td scope="row" className="border border-slate-300 px-4 py-4 bg-gray-50  whitespace-nowrap">
              { data?.orang.alamatPenerima }
            </td>

            <td scope="row" className="border border-slate-300 px-4 py-4 bg-gray-50  whitespace-nowrap">
              { data?.orang.hpPenerima }
            </td>

            {/*------------Orderan----------------*/ }
            <td scope="row" className="border border-slate-300 px-4 py-4">
              <KeteranganProduct d={ data.listOrderan } k={ "nama" } t={ "Order" }/>
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 ">
              <KeteranganProduct d={ data.listOrderan } k={ "harga" } t={ "Orderan" }/>
            </td>

            <td scope="row" className="border border-slate-300 px-4 py-4">
              <KeteranganProduct d={ data.listOrderan } k={ "jumlah" } t={ "Orderan" }/>
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 ">
              { Rupiah( data.hitung.semuaHargaOrderan ) }
            </td>

            {/*----------------------Item-----------------------*/ }

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 ">
              <KeteranganProduct d={ data.listItem } k={ "nama" } t={ "Item" }/>
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4">
              <KeteranganProduct d={ data.listItem } k={ "harga" } t={ "Item" }/>
            </td>

            <td scope="row" className="border border-slate-300 px-4 py-4 bg-gray-50 ">
              <KeteranganProduct d={ data.listItem } k={ "jumlah" } t={ "Item" }/>
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 ">
              { Rupiah( data.hitung.semuaHargaItem ) }
            </td>
            {/*------------Orderan----------------*/ }

            <td scope="row" className="border border-slate-300 px-4 py-4">
              { data?.keterangan.lokasi }
            </td>

            <td scope="row" className="border border-slate-300 px-4 py-4 bg-gray-50 ">
              { data?.travel.ekspedisi }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4">
              { data.total.typePembayaran }
            </td>
            <td scope="row" className="border border-slate-300  py-4  px-4  break-all w-3/4 ">
              <div className="w-[10rem]">
                <div className="line-clamp-3">
                  { data?.keterangan.guna }
                </div>
              </div>
            </td>

            {/*---------------------------Hitung---------------------*/ }
            <td scope="row" className="border border-slate-300 px-4 py-4">
              { data?.travel.ongkir }
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 ">
              { Rupiah( data.hitung.semuaHargaOrderan ) }
            </td>

            <td scope="row"
                className="border border-slate-300 px-4 py-4">
              { Rupiah( data.hitung.totalHarga ) }
            </td>

            {/*--------------------Aksi---------------------------*/ }
            <td scope="row" className={ ` border border-slate-300 py-4 px-4  break-all w-3/4 ` }>
              <div
                className={ Status( data.total.status ) + " w-[7rem] p-2 rounded-lg text-center shadow-black/40 shadow" }>
                { data.total.status }
              </div>
            </td>


            <td scope="row" className="border border-slate-300 px-4 py-4 ">
              <div className="gap-2 flex flex-col h-full">
                <Button
                  onClick={ () => {
                    // onCreate()
                    // console.log( "create" )
                  }
                  }
                  className="bg-blue-500 p-2 rounded-md text-white">
                  Simpan
                </Button>

                <PopUp
                  clickPopUp={ clickPopUp }
                  setClickPopUp={ setClickPopUp }
                  onCreate={ props.onCreate }
                  data={ data }
                />
              </div>
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
