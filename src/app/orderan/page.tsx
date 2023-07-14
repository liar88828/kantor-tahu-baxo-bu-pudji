"use client"
import React, { useState } from 'react'
import { StyleInputForm, styleLabelForm, wrongInput } from '@/app/style/form';
import { TformProduct } from '@/app/product/page';
import { BiAddToQueue } from "react-icons/bi"

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
}

type TsProduct = { id: string } & TformProduct
const sProduct: TsProduct[] = [
  {
    id: "bakso sapi2",
    nama: "bakso sapi",
    harga: "5000",
    jenis: "utama",
    lokasi: "semarang",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Bakso_mi_bihun.jpg"
  },
  {
    id: "bakso sapi1",
    nama: "bakso Urat",
    harga: "10000",
    jenis: "Lain Lain",
    lokasi: "ungaran",
    img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe"
  }

]

export default function FormOrder() {
  const [ salah, setSalah ] = useState( false );
  const [ count, setCount ] = useState<number>( 1 );

  // const [ sProduct, setSProduct ] = useState( [] );

  function Nama() {
    return (
      <>
        <div className={ "bg-white p-3  flex-col flex gap-3" }><h2>Nama</h2><hr/>
          <div className="flex flex-col ">
            <label className={ styleLabelForm }
                   htmlFor="grid-password"> Pengiriman</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="text"
                   placeholder="Nama Pengiriman"/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>
          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">Hp Pengirim</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="number"
                   placeholder="Hp Pengiriman"/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>
          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">Penerima</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="text"
                   placeholder="Masukan Penerima"/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>
          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">Alamat Penerima</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="text"
                   placeholder="Masukan Alamat Penerima"/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>
          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">Hp Penerima</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="number"
                   placeholder="Masukan Hp Penerim"/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>
        </div>
      </>
    );
  }

  function Tanggal() {
    return (
      <>
        <div className={ " bg-white p-3  flex-col flex gap-3" }>
          <h2>Tanggal</h2>
          <hr/>
          <div className="flex flex-col ">
            <label className={ styleLabelForm } htmlFor="grid-password">Pesan</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="date"
                   placeholder="Masukan Pesan"/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>

          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">Kirim</label>
            <input className={ StyleInputForm( salah ) } id="grid-first-name" type="date"
                   placeholder="Masukan Kirim"/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>
        </div>
      </> )
  }

  function Orderan() {
    return (
      <>
        <div className="bg-white p-3 w-1/2 flex-col flex gap-3">
          <div className="flex flex-col gap-3"><h2>Orderan</h2><hr/>
            <div className="flex flex-col">
              <label>Cari Barang</label>
              <input type={ "text" } placeholder={ "Search ...." }
                     className={ StyleInputForm( salah ) }/>
            </div>

            <div className="flex flex-col gap-1 overflow-y-auto relative h-[10rem]">
              { sProduct.map( ( sP ) => (

                <ul key={ sP.id }
                    className={ " border-gray-300 border" }>
                  <li className={ " flex flex-row justify-between  items-center gap-2 p-2" }>

                    <img
                      className={ "w-[20%] h-auto rounded" }
                      src={ sP.img }
                      alt={ sP.nama }
                    />
                    <div className={ "justify-between flex-col flex" }>
                      <p className={ " uppercase text-gray-900 text-xs font-bold  " }>{ sP.nama }</p>
                      <p className={ "text-xs " }>{ sP.lokasi }</p>
                      <p className={ "text-xs" }>{ sP.jenis }</p>
                    </div>

                    <div className="flex-col flex gap-1 w-[30%]">
                      <input type={ "number" } className={ ` ${ input }` } name={ "jumlah" }/>
                      <button
                        className={ "bg-blue-600 text-white p-2 rounded flex flex-row justify-center items-center gap-1" }>
                        <BiAddToQueue/>
                          <span className="invisible sm:visible w-0 sm:w-auto">Tambah</span>
                      </button>

                    </div>
                  </li>
                </ul>
              ) ) }
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
            <select name="jenis pembayaran"
                    id="ekspedisi"
                    className='border border-gray-300 p-2 rounded-md'>
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
            <input type="number" name="price" placeholder="Masukkan Harga Ongkir ..."
                   className="border border-gray-300 p-2 rounded-md"
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

            {/* jenis Pembayaran */ }
            <label htmlFor="">Pembayaran</label>
            <select name="jenis pembayaran" id="cod"
                    className='border border-gray-300 p-2 rounded-md'>
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

  const formCard = ( wide: number ) => `border  flex flex-col gap-5 p-5 bg-white rounded w-[${ wide }%]`;

  const inputType = (
    a: number = 0,
    b: string = ""
  ) => `border border-gray-300 p-${ a } rounded-md w-${ ( b = "" ) ? "" : b }`;
  const input = inputType()
  return (
    <div className={ "w-[100%] " }>
      {/*<h1 className="text-3xl font-bold text-center"> Orderan Form </h1>*/ }
      <form className="bg-green-100 sm:bg-green-50 ">
        <div className="flex flex-row gap-1 sm:gap-5 p-1 sm:p-5 mt-5">
          <div className="flex-col w-[50%]  ">
            <Nama/>
            <Tanggal/>
          </div>
          <Orderan/>
        </div>
        <div className="relative overflow-x-auto shadow-md rounded-lg bg-white p-6 ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded ">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 rounded">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                pengirim
              </th>
              <th scope="col" className="px-6 py-3">
                hpPengirim
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                penerima
              </th>
              <th scope="col" className="px-6 py-3">
                pesan
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                kirim
              </th>
              <th scope="col" className="px-6 py-3">
                orderan
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                item
              </th>
              <th scope="col" className="px-6 py-3">
                total
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                ekspedisi
              </th>
              <th scope="col" className="px-6 py-3">
                ongkir
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                totalPenjualan
              </th>
              <th scope="col" className="px-6 py-3">
                totalBayar
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                pembayaran
              </th>
            </tr>
            </thead>
            <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">

                pengirim
              </th>
              <td className="px-6 py-4">
                hpPengirim
              </td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                penerima
              </td>
              <td className="px-6 py-4">
                pesan
              </td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                kirim
              </td>
              <td className="px-6 py-4">
                orderan
              </td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                item
              </td>
              <td className="px-6 py-4">
                total
              </td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                ekspedisi
              </td>
              <td className="px-6 py-4">
                ongkir
              </td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                totalPenjualan
              </td>
              <td className="px-6 py-4">
                totalBayar
              </td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                pembayaran
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
