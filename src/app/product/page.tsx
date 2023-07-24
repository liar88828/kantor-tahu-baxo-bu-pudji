"use client"
import React, { ReactElement, useState } from 'react';
import FileUploadForm from '@/app/component/FileUploadForm';
import { StyleInputForm, styleLabelForm } from '@/app/style/form';
import { TFormProduct } from '../../../entity/produk';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputFormProps } from '../../../entity/InputForm';

const formProduct: Record<keyof TFormProduct, any> = {
  id: "1231",
  nama: "Nama Produk",
  harga: "Harga Produk",
  lokasi: "Lokasi Produk",
  jumlah: "Masukan Jumlah",
  jenis: "Jenis Produk",
  img: "Gambar Produk",
  keterangan: "Keterangan Produk"
}

const defaultFormProduct: TFormProduct = {
  id: " ",
  nama: "Nama Product",
  harga: 0,
  lokasi: "Lokasi",
  jumlah: 0,
  jenis: "Jenis",
  img: "Gambar",
  keterangan: "Keterangan Produk"
}

export default function Home( {}: any ) {

  const { control, register, handleSubmit, formState: {}, } = useForm<TFormProduct>( {/* defaultValues: defaultValues, */
    mode: "onChange",
  } );

  const [ valueForm, setValueForm ] = useState<TFormProduct>( defaultFormProduct )

  const [ salah, setSalah ] = useState<boolean>( false );

  const onSubmit: SubmitHandler<TFormProduct> = ( data ) => {
    console.log( data )
    setValueForm( data )
  };

  const InputForm: React.FC<InputFormProps> = (
    { tag: Tag = "input", title, type, reg, value, min, defaultValue }: InputFormProps ): ReactElement => {
    let ress = { className: `${ StyleInputForm( false ) }`, placeholder: ` Masukan ${ title }....`, }
    if( type ) ress = Object.assign( ress, { type } );
    if( value ) ress = Object.assign( ress, { value } );
    if( min ) ress = Object.assign( ress, { min } );
    if( defaultValue ) ress = Object.assign( ress, { defaultValue } );

    return (
      <div className="flex flex-col">
        <label className={ styleLabelForm } htmlFor="grid-password"> { title } </label>
        <Tag { ...ress }{ ...reg }/>
        {/*<p>{ errors. }</p>*/ }
      </div>
    )
  }

  const FormProduct = () => {
    return ( <>
        <form
          onSubmit={ handleSubmit( onSubmit ) }
          className="w-full max-w-lg  flex  flex-col gap-5 ">
          <InputForm title={ formProduct.nama } type="text" reg={ register( "nama" ) } defaultValue={ " Tahu Baxo " }/>
          <InputForm title={ formProduct.harga } type="number" reg={ register( "harga" ) } defaultValue={ 0 }/>
          <InputForm title={ formProduct.lokasi } type="text" reg={ register( "lokasi" ) } defaultValue={ "Ungaran" }/>

          <div className="flex flex-col">
            <label className={ styleLabelForm } htmlFor="grid-state">{ formProduct.jenis }  </label>
            <select id="lokasi" className='border border-gray-300 p-2 rounded-md'{ ...register( "jenis" ) }>
              <option value="Orderan">Orderan</option>
              <option value="Item">Item</option>
            </select>
          </div>

          <InputForm title={ formProduct.keterangan } type="textarea" reg={ register( "keterangan" ) }
                     defaultValue={ "Pedas " }/>

          <button type="submit" className="bg-blue-500 p-2 rounded-md text-white">Simpan</button>
        </form>
      </>

    )
  }

  return (
    <main className="flex   min-h-screen p-3 sm:p-6  flex-row z-50 bg-green-50 gap-3 ">
      <div className="  sm:m-4 bg-white rounded p-5 w-1/2">
        <FormProduct/>
      </div>
      <div className=" sm:m-4 bg-white rounded p-5">
        <label className={ styleLabelForm }>Masukan Gambar Produk</label>
        <FileUploadForm/>
      </div>

    </main>
  );
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