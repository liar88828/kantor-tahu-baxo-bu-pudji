"use client"
import React, { useState } from 'react'
import { StyleInputForm, styleLabelForm, wrongInput } from '@/app/style/form';
import { TformProduct } from '@/app/product/page';
import { BiAddToQueue } from "react-icons/bi"
import { SubmitHandler, useForm } from "react-hook-form";
import { TOrder } from '../../../components/data';

const product = [
  { nama: "Tahu Bakso Rebus", harga: 42.000 },
  { nama: "Tahu Bakso Vakum", harga: 46.000 },
  { nama: "Tahu Bakso Special", harga: 50.000 },
  { nama: "Tahu Bakso Goreng", harga: 45.000 },
  { nama: "Bandeng Presto", harga: 60.000 },
  { nama: "Otak-Otak Bandeng", harga: 70.000 },
  { nama: "Bakso Sapi 20", harga: 40.000 },
  { nama: "Bakso Sapi 12", harga: 25.000 },
  { nama: "Bakso Aneka", harga: 29.000 },
  { nama: "Nugget", harga: 27.000 },
  { nama: "Rolade Tahu", harga: 19.000 },
  { nama: "Rolade Singkong", harga: 19.000 },
]

const formInput = {
  pengirim: "Pengirim",
  hpPengirim: "Hp Pengirim",
  penerima: "Penerima",
  tanggal: {
    title: "tanggal",
    opsi: {
      pesan: "Pesan",
      kirim: "Kirim"
    },
  },

  orderan: "Orderan",
  item: "Item",
  total: "Total",
  ekspedisi: "Ekspedisi",
  ongkir: "Ongkir",
  totalPenjualan: "Total Penjualan",
  totalBayar: "Total Bayar",
  pembayaran: "Pembayaran",
  keterangan: "Keterangan",
}
type TsProduct = { id: string } & TformProduct
const sProduct: TsProduct[] = [
  {
    id: "bakso sapi2",
    nama: "bakso sapi",
    harga: "5000",
    jenis: "item",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Bakso_mi_bihun.jpg"
  },

  {
    id: "bakso sapi1",
    nama: "bakso Urat",
    harga: "10000",
    jenis: "orderan",
    img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe"
  }

]

export default function FormOrder() {
  const [ salah, setSalah ] = useState( false );
  const [ count, setCount ] = useState<number>( 1 );
  const defaultValues: TOrder = {
    alamat_penerima: '',
    ekspedisi: '',
    hp_penerima: '',
    hp_pengirim: '',
    ongkir: 0,
    penerima: '',
    pengirim: '',
    kirim: new Date(),
    pesan: new Date(),
    lokasi: "",
    item: "",
    harga_item: 0,
    jumlah_item: 0,
    orderan: '',
    harga_orderan: 0,
    jumlah_orderan: 0,
    pembayaran: "",
    keterangan: ""
  }
  const { register, handleSubmit } = useForm<TOrder>(
    // {
    //   defaultValues: defaultValues
    // }
  );
  const [ valueForm, setValueForm ] = useState<TOrder>( defaultValues )

  let Rupiah = ( n: number ): string => {
    return new Intl.NumberFormat( "id-ID", {
      style: "currency",
      currency: "IDR"
    } ).format( n );
  }
  // function formatDate( date: Date | undefined ) {
  //   var d = new Date( date ),
  //     month = '' + ( d.getMonth() + 1 ),
  //     day = '' + d.getDate(),
  //     year = d.getFullYear();
  //
  //   if( month.length < 2 )
  //     month = '0' + month;
  //   if( day.length < 2 )
  //     day = '0' + day;
  //
  //   return [ day, month, year ].join( '-' );
  // }

  const onSubmit: SubmitHandler<TOrder> = ( data ) => {
    setValueForm( data )
    console.log( data )
  };

  function Nama() {
    return (
      <>
        <div className={ "bg-white p-3  flex-col flex gap-3 rounded" }><h2>Nama</h2>
          <hr/>
          <div className="flex flex-col ">
            <label className={ styleLabelForm }
                   htmlFor="grid-password"> Pengiriman</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="text"
                   placeholder="Nama Pengiriman"
                   { ...register( "pengirim" ) }
            />
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>
          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">Hp Pengirim</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="number"
                   placeholder="Hp Pengiriman"
                   { ...register( "hp_pengirim" ) }
            />
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>
          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">Penerima</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="text"
                   placeholder="Masukan Penerima"
                   { ...register( "penerima" ) }/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>
          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">Alamat Penerima</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="text"
                   placeholder="Masukan Alamat Penerima"
                   { ...register( "alamat_penerima" ) }/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>
          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">Hp Penerima</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="number"
                   placeholder="Masukan Hp Penerim"
                   { ...register( "hp_penerima" ) }/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>
        </div>
      </>
    );
  }

  function Tanggal() {
    return (
      <>
        <div className={ " bg-white p-3  flex-col flex gap-3 rounded" }>
          <h2>Tanggal</h2>
          <hr/>
          <div className="flex flex-col ">
            <label className={ styleLabelForm } htmlFor="grid-password">Pesan</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="date"
                   placeholder="Masukan Pesan"
                   { ...register( "pesan" ) }/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>

          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">Kirim</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="date"
                   placeholder="Masukan Kirim" { ...register( "kirim" ) }/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Keterangan</label>
            <textarea placeholder="Masukkan Keterangan ..."
                      className="border border-gray-300 p-2 rounded-md"
                      { ...register( "keterangan" ) }
            />
          </div>

        </div>
      </> )
  }

  function Orderan() {
    return (
      <>
        <div className="bg-white p-3 w-[50%] flex-col flex gap-3 rounded">
          <div className="flex flex-col gap-3"><h2>Orderan</h2>
            <hr/>
            <div className="flex flex-col">
              <label>Cari Barang</label>
              <input type={ "text" } placeholder={ "Search ...." }
                     className={ StyleInputForm( salah ) }/>
            </div>

            <div className="flex flex-col gap-1 overflow-y-auto relative h-[10rem]">
              {

                sProduct.map( ( sP ) => {

                  console.log( Object.values( sP ).includes( "orderan" ) ? "orderan" : "item" )
                  const jenis = Object.values( sP ).includes( "orderan" )
                  return (

                    <ul key={ sP.id }
                        className={ " border-gray-300 border" }>
                      <li className={ " flex flex-row justify-between  items-center gap-2 p-2" }>
                        <img className={ "w-[20%] h-auto rounded" } src={ sP.img } alt={ sP.nama }/>
                        <div className={ "justify-between flex-col flex " }>

                          <p className={ " uppercase text-gray-900 text-xs sm:text-xl font-bold " }>
                            { sP.nama }</p>
                          <input type={ "hidden" }
                                 value={ sP.nama } readOnly
                                 { ...register( jenis ? "orderan" : "item" ) }
                          />
                          <p className={ " uppercase text-gray-900 text-xs sm:text-xl font-bold  " }>
                            { sP.harga }</p>
                          <input type={ "hidden" }

                                 className={ "!overflow-hidden" }
                                 value={ sP.harga }
                                 { ...register( jenis ? "harga_orderan" : "harga_item" ) }
                          />
                          <p className={ "text-xs sm:text-xl " }>{ sP.jenis }</p>
                          <input className={ "hidden w-0 h-0" }
                                 type={ 'text' }
                                 value={ jenis ? "orderan" : "item" }
                                 { ...register( jenis ? "orderan" : "item" ) }
                          />
                        </div>

                        <div className=" flex-col  flex gap-1 w-[30%]">
                          <input type={ "number" } className={ ` ${ input }` }
                                 value={ jenis ? "jumlah_orderan" : "jumlah_item" }
                                 { ...register( jenis ? "jumlah_orderan" : "jumlah_item"
                                   // , {required: { value: true, message: "Jumlah Order is Required" } }
                                 ) }
                          />

                          <div className="flex gap-1 justify-center flex-row sm:flex-col">
                            <button
                              onClick={ () => console.log( "click" ) }
                              className={ "bg-blue-600 text-white p-1 sm:p-2 rounded flex flex-row justify-center items-center gap-1" }>
                              <BiAddToQueue/>
                              <span className="invisible sm:visible w-0 sm:w-auto">Tambah</span>
                            </button>
                            <button
                              onClick={ () => console.log( "click" ) }
                              className={ "bg-red-600 text-white p-1 sm:p-2 rounded flex flex-row justify-center items-center gap-1" }>
                              <BiAddToQueue/>
                              <span className="invisible sm:visible w-0 sm:w-auto">Hapus</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  )
                } ) }
            </div>


            {/*  <div className="flex flex-col">*/ }
            {/*    <label htmlFor="">Orderan</label>*/ }
            {/*    <select name="orderan" id="orderan"*/ }
            {/*            className='border border-gray-300 p-2 rounded-md'>*/ }
            {/*      <option value="Tahu Bakso Rebus">Tahu Bakso Rebus Rp.42.000</option>*/ }
            {/*      <option value="Tahu Bakso Vakum">Tahu Bakso Vakum Rp.46.000</option>*/ }
            {/*      <option value="Tahu Bakso Specialty">Tahu Bakso Special Rp.50.000</option>*/ }
            {/*      <option value="Tahu Bakso Goreng">Tahu Bakso Goreng Rp.45.000</option>*/ }
            {/*      <option value="Bandeng Presto">Bandeng Presto Rp.60.000</option>*/ }
            {/*      <option value="Otak-Otak Bandeng">Otak-Otak Bandeng Rp.70.000</option>*/ }
            {/*      <option value="Bakso Sapi 20">Bakso Sapi 20 Rp.40.000</option>*/ }
            {/*      <option value="Bakso Sapi 12">Bakso Sapi 12 Rp.25.000</option>*/ }
            {/*      <option value="Bakso Aneka">Bakso Aneka Rp.29.000</option>*/ }
            {/*      <option value="Nugget">Nugget Rp.27.000</option>*/ }
            {/*      <option value="Rolade Tahu">Rolade Tahu Rp.19.000</option>*/ }
            {/*      <option value="Rolade Singkong">Rolade Singkong Rp.19.000</option>*/ }
            {/*    </select>*/ }
            {/*  </div>*/ }
            {/*</div>*/ }

            {/*<div className="flex flex-col gap-5">*/ }
            {/*  <h1>Lain Lain</h1>*/ }
            {/*  <hr/>*/ }
            {/*  <label htmlFor="">Item</label>*/ }
            {/*  <input type="number" name="price" placeholder="Masukkan Jumlah Yang Di Pesan ..."*/ }
            {/*         className={ input }*/ }
            {/*  />*/ }
            {/*  /!* Semisal Peroduct lain selain tahu bakso  */ }

            {/*  <label htmlFor="">Total</label>*/ }
            {/*  <input type="number" name="price" placeholder="Total Bayar..."*/ }
            {/*         className={ input }*/ }
            {/*  />*/ }

            {/* Total Keseluruhan dari Item lain-lain */ }
          </div>

          <hr className={ "m-2" }/>
          <div className={ "flex flex-col gap-3" }>

            {/* combo box  */ }
            <label htmlFor="">Ekspedisi</label>
            <select id="ekspedisi"
                    className='border border-gray-300 p-2 rounded-md'
                    { ...register( "ekspedisi" ) }
            >
              <option value="Paxel">Paxel</option>
              <option value="JNE">JNE</option>
              <option value="Travel Omega">Travel Omega</option>
              <option value="Travel Serasi">Travel Serasi</option>
              <option value="Go Send">Go Send</option>
              <option value="Maxim">Maxim</option>
              <option value="Delivery">Delivery</option>
            </select>

            {/* tulis sendiri */ }
            <label htmlFor="">Ongkir</label>
            <input type="number" placeholder="Masukkan Harga Ongkir ..."
                   className="border border-gray-300 p-2 rounded-md"
                   { ...register( "ongkir" ) }
            />

            {/* total product tanpa ongkir   tapi di isi dengan product yang lain lain*/ }
            {/*<label htmlFor="">Total Penjualan</label>*/ }
            {/*<input type="number" name="price" placeholder="Masukan Total Bayar..."*/ }
            {/*       className="border border-gray-300 p-2 rounded-md"*/ }
            {/*/>*/ }

            {/*<label htmlFor="">Total Bayar</label>*/ }
            {/*<input type="number" name="price" placeholder="Enter Product name..."*/ }
            {/*       className="border border-gray-300 p-2 rounded-md"*/ }
            {/*/>*/ }

            <label htmlFor="">Pembayaran</label>
            <select id="lokasi"
                    className='border border-gray-300 p-2 rounded-md'
                    { ...register( "lokasi" ) }
            >
              <option value="Ungaran">Ungaran</option>
              <option value="Semarang">Semarang</option>
            </select>

            {/* jenis Pembayaran */ }
            <label htmlFor="">Pembayaran</label>
            <select id="pembayaran"
                    className='border border-gray-300 p-2 rounded-md'
                    { ...register( "pembayaran" ) }
            >
              <option value="Cash">Cash</option>
              <option value="BCA">BCA</option>
              <option value="Mandiri">Mandiri</option>
              <option value="BRI">BRI</option>
            </select>


          </div>
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-md text-white">
            Add Product
          </button>
        </div>

      </>
    )
  }

  // const formCard = ( wide: number ) => `border  flex flex-col gap-5 p-5 bg-white rounded w-[${ wide }%]`;

  const inputType = ( a: number = 0, b: string = "" ) => `border border-gray-300 p-${ a } rounded-md w-${ ( b = "" ) ? "" : b }`;
  const input = inputType()
  return (
    <div className={ "" }>
      {/*<h1 className="text-3xl font-bold text-center"> Orderan Form </h1>*/ }
      <form className="bg-green-100 sm:bg-green-50 "
            onSubmit={ handleSubmit( onSubmit ) }>
        <div className="flex flex-row gap-1 sm:gap-2  mt-5">
          <div className="flex-col w-[50%] ml-2   ">
            <Nama/>
            <Tanggal/>
          </div>
          <Orderan/>
        </div>

        <div className=" ml-2  relative overflow-x-auto shadow-md rounded-lg bg-white p-2 mt-1 ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded ">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 rounded">
            <tr>

              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3 bg-green-400">
                Pesan
              </th>
              <th scope="col" className="px-6 py-3 bg-red-500 dark:bg-gray-800">
                Kirim
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                pengirim
              </th>
              <th scope="col" className="px-6 py-3">
                Telpon Pengirim
              </th>

              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Penerima
              </th>
              <th scope="col" className="px-6 py-3 bg-yellow-100">
                Orderan
              </th>
              <th scope="col" className="px-6 py-3 bg-yellow-300 dark:bg-gray-800">
                Harga Order
              </th>
              <th scope="col" className="px-6 py-3 bg-yellow-100">
                Jumlah Order
              </th>
              <th scope="col" className="px-6 py-3 bg-red-500 dark:bg-gray-800">
                Item
              </th>
              <th scope="col" className="px-6 py-3 bg-red-300">
                Harga Item
              </th>
              <th scope="col" className="px-6 py-3 bg-red-500 dark:bg-gray-800">
                Jumlah Item
              </th>
              <th scope="col" className="px-6 py-3">
                Lokasi
              </th>
              <th scope="col" className="px-6 py-3 bg-blue-400 dark:bg-gray-800">
                Ekspedisi
              </th>
              <th scope="col" className="px-6 py-3 bg-green-300">
                Ongkir
              </th>
              <th scope="col" className="px-6 py-3 bg-green-200 dark:bg-gray-800">
                Total Penjualan
              </th>
              <th scope="col" className="px-6 py-3 bg-green-300">
                Total Bayar
              </th>
              <th scope="col" className="px-6 py-3 bg-yellow-100 dark:bg-gray-800">
                pembayaran
              </th>
              <th scope="col" className="px-6 py-3 ">
                Keterangan
              </th>
            </tr>
            </thead>
            <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                1.
              </th>
              <td scope="row" className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                { valueForm?.pesan.toLocaleString() }
              </td>
              <td scope="row"
                  className="border border-slate-300 px-6 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap ">
                { valueForm?.kirim.toLocaleString() }
              </td>
              <td scope="row"
                  className="border border-slate-300 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50
                  dark:text-white dark:bg-gray-800">
                { valueForm?.pengirim }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4">
                { valueForm?.hp_pengirim }
              </td>
              <td scope="row"
                  className="border border-slate-300 px-6 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap">
                { valueForm?.penerima }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4">
                { valueForm?.orderan }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4 bg-gray-50 dark:bg-gray-800">
                { Rupiah( valueForm?.harga_orderan ) }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4">
                { valueForm?.jumlah_orderan }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4 bg-gray-50 dark:bg-gray-800">
                { valueForm?.item }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4">
                { Rupiah( valueForm?.harga_item ) }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4 bg-gray-50 dark:bg-gray-800">
                { valueForm?.jumlah_item }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4">
                { valueForm?.lokasi }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4 bg-gray-50 dark:bg-gray-800">
                { valueForm?.ekspedisi }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4">
                { Rupiah( valueForm?.ongkir ) }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4 bg-gray-50 dark:bg-gray-800">
                { Rupiah( valueForm.jumlah_item + valueForm.ongkir ) }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4">
                { Rupiah(
                  Number( valueForm?.jumlah_item )
                  * Number( valueForm?.harga_item )
                  + Number( valueForm?.ongkir )
                  + Number( valueForm?.jumlah_orderan )
                  * Number( valueForm?.harga_orderan ) ) }
              </td>
              <td scope="row" className="border border-slate-300 px-6 py-4">
                { valueForm?.pembayaran }
              </td>
            </tr>
            </tbody>
          </table>
        </div>


      </form>


    </div>
  )
}
// {/* <label htmlFor="">Pembayaran</label>
//  <input
//  type="text"
//  name="price"
//  placeholder="Metode Pembayaran..."
//  className="border border-gray-300 p-2 rounded-md"
//  />
//  </div> */ }
// {/* <input type="image" formAction={ submitImage } /> */ }
// <h2 className="font-bold p-5">List og Product</h2>
// <div className="">
//   {/*<Tables lg gap={ 2 } css={ { mt: '$10' } } />*/ }
// </div>
//
// <div className="flex flex-wrap gap-5">
//   {/* { !products ? <h1>salah</h1> : products.map( ( p: any ) =>
//    {
//    if ( p == undefined || !p ) return <h1>Hot found</h1>;
//    else
//    {
//    return (
//    <div className="p-5 shadow" key={ p.id }>
//    <p>{ p.product }</p>
//    <p>Rp.{ p.price }</p>
//    </div>
//    );
//    }
//    } ) } */ }
// </div>
