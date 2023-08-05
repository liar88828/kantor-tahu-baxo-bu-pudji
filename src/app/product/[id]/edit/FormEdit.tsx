"use client"
import React, { ChangeEvent, Suspense, useState } from 'react';
import type {
  TProduct
}                                                 from '@/entity/client/produk';
import { SubmitHandler, useForm }                 from 'react-hook-form';
import {
  handleUpload, SendData, UploadDescription
}                                                 from '@/app/elements/upload/UploadDescription';
import { LinkList }                               from '@/app/product/Links';
import {
  InputForm
}                                                 from '@/app/elements/input/InputNew';
import {
  formProduct
}                                                 from '@/app/components/product/format';
import { urlApi }                                 from '@/app/product/api';

export function FormEdit( { data }: { data: TProduct } ) {

  const { register, handleSubmit, }       = useForm<TProduct>( {/* defaultValues: defaultValues, */
    mode: "onChange",
  } );
  const [ selectedFile, setSelectedFile ] = useState<File | null>();
  const [ previewURL, setPreviewURL ]     = useState<string | null>( null );
  const [ message, setMessage ]           = useState<string>( '' );

  // handle change
  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData( event, setSelectedFile, setPreviewURL );
  };

  // save data
  const onSubmit: SubmitHandler<TProduct> = async ( data ) => {
    console.log( data )
    await handleUpload(
      selectedFile,
      setMessage,
      data,
      "product",
      data.id,
      "PUT"
    )
    .then( () => {
    } )

  };
  const FormProduct                       = () => {
    return ( <>
        <InputForm title={ formProduct.nama } type="text"
                   reg={ register( "nama" ) }
                   defaultValue={ data.nama }/>
        <InputForm title={ formProduct.harga } type="number"
                   reg={ register( "harga" ) }
                   defaultValue={ data.harga }/>

        <InputForm title={ formProduct.lokasi } type="text"
                   reg={ register( "lokasi" ) }
                   defaultValue={ data.lokasi }/>

        <InputForm title={ formProduct.jenis } type="text"
                   reg={ register( "jenis" ) }
                   defaultValue={ data.jenis }/>

        <InputForm title={ formProduct.keterangan } type="textarea"
                   reg={ register( "keterangan" ) }
                   defaultValue={ data.keterangan }/>
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
              <UploadDescription
                previewURL={ !previewURL ? urlApi + data.img : previewURL }
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