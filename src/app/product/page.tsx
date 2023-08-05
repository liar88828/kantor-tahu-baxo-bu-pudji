"use client"
import React, {
  ChangeEvent, Fragment, ReactElement, Suspense, useState
}                                             from 'react';
import { StyleInputForm, styleLabelForm }     from '@/app/style/form';
import type {
  TProduct
}                                             from '@/entity/client/produk';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  InputFormProps
}                                             from '@/entity/client/InputForm';
import {
  defaultFormProduct, formProduct
}                                             from '@/app/components/product/format';
import {
  handleUpload, SendData, UploadDescription
}                                             from '@/app/elements/upload/UploadDescription';
import { LinkList }                           from '@/app/product/Links';

// async function getData() {
//   const res = await fetch( "http://localhost:3000/api/produk",
//     { next: { revalidate: 10 } } )
//
//   if( !res.ok ) {
//     throw new Error( 'Failed to fetch data' )
//   }
//
//   return res.json()
// }

export default function Home() {

  const { control, register, handleSubmit, } = useForm<TProduct>( {/* defaultValues: defaultValues, */
    mode: "onChange",
  } );
  const [ selectedFile, setSelectedFile ]    = useState<File | null>();
  const [ previewURL, setPreviewURL ]        = useState<string | null>( null ); // State to store the preview image URL
  const [ message, setMessage ]              = useState<string>( '' );

  // handle change
  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData( event, setSelectedFile, setPreviewURL );
  };

  // save data
  const onSubmit: SubmitHandler<TProduct> = async ( data ) => {
    await handleUpload( selectedFile, setMessage, data, "product" )
    .then( () => {
      // let data
    } )

  };

  // make input
  const InputForm: React.FC<InputFormProps> = (
    {
      tag: Tag = "input", title, type, reg, value, min, defaultValue
    }: InputFormProps ): ReactElement => {

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
        <label className={ styleLabelForm }
               htmlFor="grid-password"> { title } </label>
        <Controller
          control={ control }
          name={ "nama" }
          render={ () => <Tag{ ...ress }{ ...reg }/> }
        />
      </div>
    )
  }

  const FormProduct = () => {
    return ( <>
        <InputForm title={ formProduct.nama } type="text"
                   reg={ register( "nama" ) }
                   defaultValue={ defaultFormProduct.nama }/>
        <InputForm title={ formProduct.harga } type="number"
                   reg={ register( "harga" ) }
                   defaultValue={ defaultFormProduct.harga }/>

        <InputForm title={ formProduct.lokasi } type="text"
                   reg={ register( "lokasi" ) }
                   defaultValue={ defaultFormProduct.lokasi }/>

        <div className="flex flex-col">
          <label className={ styleLabelForm }
                 htmlFor="grid-state">{ formProduct.jenis }  </label>

          <select id="lokasi"
                  className='border border-gray-300 p-2 rounded-md bg-gray-100'
                  { ...register( "jenis" ) }>
            <option value="Orderan">Orderan</option>
            <option value="Item">Item</option>
          </select>
        </div>
        <InputForm title={ formProduct.keterangan } type="textarea"
                   reg={ register( "keterangan" ) }
                   defaultValue={ defaultFormProduct.keterangan }/>
      </>
    )
  }

  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <LinkList/>

      <div className="flex flex-row">

        <form onSubmit={ handleSubmit( onSubmit ) }
              className="w-full flex  flex-row gap-5 ">

          <div className="  sm:m-4 bg-white rounded p-5 w-1/2">
            <FormProduct/>
          </div>

          <div
            className=" sm:m-4 bg-white rounded p-5 w-1/2  flex  flex-col gap-5 ">
            <Suspense fallback={ <p>Loading feed...</p> }>
              <UploadDescription previewURL={ previewURL }
                                 onChange={ handleFileChange }
                                 message={ message }
                                 title={ "Product" }/>
            </Suspense>
            <button type="submit"
                    className="btn btn-accent text-white">Simpan
            </button>
          </div>

        </form>
      </div>

    </main>
  );
}