"use client"
import React, { ChangeEvent, Suspense, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { defaultFormProduct, formProduct } from '@/app/utils/format/product';
import { LinkNavigation } from '@/app/elements/link/Links';
import { InputForm } from '@/app/elements/input/InputNew';
import { usePathname } from 'next/navigation';
import { handleUpload, SendData, UploadDescription } from '@/app/elements/upload/Upload';

export default function Home() {

  const { register, handleSubmit, }       = useForm<TProduct>( {/* defaultValues: defaultValues, */
    mode: "onChange",
  } );
  const [ selectedFile, setSelectedFile ] = useState<File | null>();
  const [ previewURL, setPreviewURL ]     = useState<string | null>( null );
  const [ message, setMessage ]           = useState<string>( '' );

  // handle change
  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData(
      event,
      setSelectedFile,
      setPreviewURL );
  };

  // save data
  const onSubmit: SubmitHandler<TProduct> = async ( data ) => {
    await handleUpload(
      selectedFile,
      setMessage,
      data,
      "product" )
    .then( () => {
      // let data
    } )
  };

  const pathname = usePathname()
  const path     = pathname.split( "/" )

  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <LinkNavigation path={ path }/>
      <div className="flex flex-row">
        <form onSubmit={ handleSubmit( onSubmit ) }
              className="w-full flex  flex-row gap-5 ">
          <div className="  sm:m-4 bg-white rounded p-5 w-1/2">
            <InputForm title={ formProduct.nama } type="text" reg={ register( "nama" ) }
                       defaultValue={ defaultFormProduct.nama }/>
            <InputForm title={ formProduct.harga } type="number" reg={ register( "harga" ) }
                       defaultValue={ defaultFormProduct.harga }/>
            <InputForm title={ formProduct.lokasi } type="text" reg={ register( "lokasi" ) }
                       defaultValue={ defaultFormProduct.lokasi }/>
            <InputForm title={ formProduct.jenis } type="text" reg={ register( "jenis" ) }
                       defaultValue={ defaultFormProduct.jenis }/>
            <InputForm title={ formProduct.keterangan } type="textarea" reg={ register( "keterangan" ) }
                       defaultValue={ defaultFormProduct.keterangan }/>
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