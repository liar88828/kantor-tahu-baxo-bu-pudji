"use client"
import React, { ChangeEvent, ReactElement, Suspense, useState } from 'react';
import {
  StyleInputForm, styleLabelForm
}                                                               from '@/app/style/form';
import type {
  TProduct
}                                                               from '@/entity/client/produk';
import {
  Controller, SubmitHandler, useForm
}                                                               from 'react-hook-form';
import {
  InputFormProps
}                                                               from '@/entity/client/InputForm';
import {
  defaultFormProduct, formProduct
}                                                               from '@/app/components/product/format';
import {
  handleUpload, SendData, UploadDescription
}                                                               from '@/app/elements/upload/UploadDescription';

export default function Home() {

  const { control, register, handleSubmit, } = useForm<TProduct>( {/* defaultValues: defaultValues, */
    mode: "onChange",
  } );
  const [ selectedFile, setSelectedFile ]    = useState<File | null>();
  const [ previewURL, setPreviewURL ]        = useState<string | null>( null ); // State to store the preview image URL
  const [ message, setMessage ]              = useState<string>( '' );

  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData( event, setSelectedFile, setPreviewURL );
  };

  const onSubmit: SubmitHandler<TProduct> = async ( data ) => {
    await handleUpload( selectedFile, setMessage, data, "produk" )
    .then( () => {
      // let data
    } )

  };

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
                  className='border border-gray-300 p-2 rounded-md'
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
    <main className="flex p-3 sm:p-6  flex-row z-50 bg-green-50 gap-3 ">
      <form onSubmit={ handleSubmit( onSubmit ) }
            className="w-full flex  flex-row gap-5 ">

        <div className="  sm:m-4 bg-white rounded p-5 w-1/2">
          <FormProduct/>
        </div>

        <div
          className=" sm:m-4 bg-white rounded p-5 w-1/2  flex  flex-col gap-5 ">
          <Suspense fallback={ <p>Loading feed...</p> }>
            <UploadDescription previewURL={ previewURL }
                               onChange={ handleFileChange } message={ message }
                               title={ "Product" }/>
          </Suspense>
          <button type="submit"
                  className="bg-blue-500 p-2 rounded-md text-white">Simpan
          </button>
        </div>

      </form>

    </main>
  );
}