"use client"
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { StyleInputForm, styleLabelForm } from '@/app/style/form';
import { TFormProduct } from '../../../entity/produk';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InputFormProps } from '../../../entity/InputForm';
import { defaultFormProduct, formProduct } from '@/components/product/format';
import { handleUpload, SendData, Upload } from '@/element/Upload';

export default function Home() {

  const { control, register, handleSubmit, } = useForm<TFormProduct>( {/* defaultValues: defaultValues, */
    mode: "onChange",
  } );
  const [ selectedFile, setSelectedFile ] = useState<File | null>();
  const [ previewURL, setPreviewURL ] = useState<string | null>( null ); // State to store the preview image URL
  const [ message, setMessage ] = useState<string>( '' );

  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData( event, setSelectedFile, setPreviewURL );
  };

  const onSubmit: SubmitHandler<TFormProduct> = ( data ) => {
    handleUpload( selectedFile, setMessage, data, "product" ).then( r => console.log( r ) )
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

  const FormProduct = () => {
    return ( <>
        <InputForm title={ formProduct.nama } type="text" reg={ register( "nama" ) }
                   defaultValue={ defaultFormProduct.nama }/>
        <InputForm title={ formProduct.harga } type="number" reg={ register( "harga" ) }
                   defaultValue={ defaultFormProduct.harga }/>
        <InputForm title={ formProduct.lokasi } type="text" reg={ register( "lokasi" ) }
                   defaultValue={ defaultFormProduct.lokasi }/>
        <div className="flex flex-col">
          <label className={ styleLabelForm } htmlFor="grid-state">{ formProduct.jenis }  </label>
          <select id="lokasi" className='border border-gray-300 p-2 rounded-md'{ ...register( "jenis" ) }>
            <option value="Orderan">Orderan</option>
            <option value="Item">Item</option>
          </select>
        </div>
        <InputForm title={ formProduct.keterangan } type="textarea" reg={ register( "keterangan" ) }
                   defaultValue={ defaultFormProduct.keterangan }/>
      </>
    )
  }

  return (
    <main className="flex p-3 sm:p-6  flex-row z-50 bg-green-50 gap-3 ">
      <h1> Form Produk</h1>
      <form onSubmit={ handleSubmit( onSubmit ) }
            className="w-full    flex  flex-row gap-5 ">

        <div className="  sm:m-4 bg-white rounded p-5 w-1/2">
          <FormProduct/>
        </div>

        <div className=" sm:m-4 bg-white rounded p-5 w-1/2  flex  flex-col gap-5 ">

          <Upload previewURL={ previewURL } onChange={ handleFileChange } message={ message } title={ "Travel" }/>
          <button type="submit" className="bg-blue-500 p-2 rounded-md text-white">Check</button>
        </div>

      </form>

    </main>
  );
}