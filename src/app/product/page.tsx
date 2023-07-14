"use client"
import React, { useState } from 'react';
import FileUploadForm from '@/app/component/FileUploadForm';
import { StyleInputForm, styleLabelForm, wrongInput } from '@/app/style/form';

export type TformProduct = {
  nama: string,
  harga: string,
  lokasi: string,
  jenis: string
  img?: string
}

const formProduct = {
  nama: "Nama Product",
  harga: "Harga",
  lokasi: {
    nama: "Lokasi", tempat: [ "Semarang", "Ungaran"
    ]
  },
  jenis: {
    nama: "Jenis", jenis: [ "Utama", "Lain-Lain" ]
  }
}

export default function Home() {
  const [ salah, setSalah ] = useState<boolean>( false );
  return (
    <main className="flex   min-h-screen p-3 sm:p-6  flex-row z-50 bg-green-50 gap-3">
      <div className="  sm:m-4 bg-white rounded p-5">
        <FormProduct salah={ salah }/>
      </div>
      <div className=" sm:m-4 bg-white rounded p-5">
        <label className={ styleLabelForm }>Masukan Gambar Produk</label>

        <FileUploadForm/>
      </div>

    </main>
  );
}

const FormProduct = ( { salah }: { salah: boolean } ) => {
  let styleInputForm = StyleInputForm( salah )
  return ( <>
      <>
        <form className="w-full max-w-lg  flex  flex-col gap-5 ">
          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">{ formProduct.nama }</label>
            <input className={ styleInputForm } id="grid-first-name" type="text" placeholder="Tahu Bakso"/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>

          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">{ formProduct.harga }</label>
            <input className={ styleInputForm } id="grid-first-name" type="number" placeholder="Masukan Harga .... "/>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>


          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-state">{ formProduct.lokasi.nama }</label>
            <select className={ styleInputForm } id="grid-state">
              <option value={ formProduct.lokasi.tempat[ 1 ] }>{ formProduct.lokasi.tempat[ 1 ] }</option>
              <option value={ formProduct.lokasi.tempat[ 0 ] }>{ formProduct.lokasi.tempat[ 0 ] }</option>
            </select>
          </div>


          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-state">{ formProduct.jenis.nama }</label>
            <select className={ styleInputForm } id="grid-state">
              <option value={ formProduct.jenis.jenis[ 0 ] }>{ formProduct.jenis.jenis[ 0 ] }</option>
              <option value={ formProduct.jenis.jenis[ 1 ] }>{ formProduct.jenis.jenis[ 1 ] }</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-password">Keterangan </label>
            <textarea  className={ StyleInputForm( false ) }
                   id="grid-first-name"
                       placeholder="Keterangan"></textarea>
            { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
          </div>


        </form>
      </>

    </>
  )
}

// <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//   <label className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
//          htmlFor="grid-state">
//     State
//   </label>
//   <div className="relative">
//     <select
//       className="block appearance-none w-full bg-gray-100 border border-gray-200 text-black py-3 px-4 pr-8 rounded
// leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"> <option>New Mexico</option>
// <option>Missouri</option> <option>Texas</option> </select> <div className="pointer-events-none absolute inset-y-0
// right-0 flex items-center px-2 text-black"> <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
// viewBox="0 0 20 20"> <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
// </div> </div> </div>