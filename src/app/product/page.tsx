"use client"
import React, { ReactElement, useState } from 'react';
import { StyleInputForm, styleLabelForm } from '@/app/style/form';
import { TFormProduct } from '../../../entity/produk';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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

type KeyTFormProduct = keyof TFormProduct

export default function Home( {}: any ) {

  const { control, register, handleSubmit, watch, formState: {}, } = useForm<TFormProduct>( {/* defaultValues: defaultValues, */
    mode: "onChange",
  } );
  const [ selectedFile, setSelectedFile ] = useState<File | null>();
  const [ valueForm, setValueForm ] = useState<TFormProduct>( defaultFormProduct )
  const [ previewURL, setPreviewURL ] = useState<string | null>( null ); // State to store the preview image URL
  const [ message, setMessage ] = useState<string>( '' );
  const [ data, setData ] = useState<string>( '' ); // Assuming data is a JSON string

  const onSubmit: SubmitHandler<TFormProduct> = ( data ) => {
    console.log( data )
    setValueForm( data )
  };

  const InputForm: React.FC<InputFormProps> = (
    { tag: Tag = "input", title, type, reg, value, min, defaultValue }: InputFormProps ): ReactElement => {

    let ress = {
      placeholder: ` Masukan ${ title }....`,
      className: `${ StyleInputForm( false ) }`
    }

    if( type ) ress = Object.assign( ress, { type } );
    if( value ) ress = Object.assign( ress, { value } );
    if( min ) ress = Object.assign( ress, { min } );
    if( defaultValue ) ress = Object.assign( ress, { defaultValue } );

    return (
      <div className="flex flex-col">
        <label className={ styleLabelForm } htmlFor="grid-password"> { title } </label>
        <Controller
          control={ control }
          name={ "nama" }
          render={ () => <Tag{ ...ress }{ ...reg }/> }
        />
      </div>
    )
  }

// console.log(watch("nama"))
  const FormProduct = () => {
    return ( <>
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
      </>
    )
  }

  return (
    <main className="flex   min-h-screen p-3 sm:p-6  flex-row z-50 bg-green-50 gap-3 ">
      <form onSubmit={ handleSubmit( onSubmit ) }
            className="w-full max-w-lg  flex  flex-col gap-5 ">

        <div className="  sm:m-4 bg-white rounded p-5 w-1/2">
          <FormProduct/>
        </div>

        <div className=" sm:m-4 bg-white rounded p-5">
          <label className={ styleLabelForm }>Masukan Gambar Produk</label>
          {/*<Upload/>*/ }
        </div>

        <button type="submit" className="bg-blue-500 p-2 rounded-md text-white">Check</button>
      </form>

    </main>
  );
}