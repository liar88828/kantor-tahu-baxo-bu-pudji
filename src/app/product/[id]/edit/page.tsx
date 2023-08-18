'use client'
import { useParams, usePathname } from 'next/navigation';
import React, { ChangeEvent, Suspense, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { handleUpload, SendData, UploadDescription } from '@/app/elements/upload/UploadDescription';
import { LinkProduct } from '@/app/elements/link/Links';
import { InputForm } from '@/app/elements/input/InputNew';
import { formProduct } from '@/app/utils/format/product';

import { urlApi } from '@/app/utils/config/urlApi';

export default function Page() {
  const { id }   = useParams()
  const pathname = usePathname()
  const path     = pathname.split( "/" ).pop() as string
  return ( <FormEdit id={ id } path={ path }/> )

}

export function FormEdit( { id, path }: { id: string, path: string } ) {
  const { register, handleSubmit, } = useForm<TProduct>( {
    defaultValues: async () => {

      const res = await fetch( "/api/product/" + id )
      const { data }: { data: TProduct } = await res.json()
      // console.log( data )

      setImage( data.img || "tidak ada" )
      return {
        nama      : data.nama,
        jenis     : data.jenis,
        lokasi    : data.lokasi,
        keterangan: data.keterangan,
        jumlah    : data.jumlah,
        img       : data.img || "tidak ada",
        id        : data.id,
        harga     : data.harga
      }
    },
    mode         : "onChange",
  } );

  const [ selectedFile, setSelectedFile ] = useState<File | null>();
  const [ image, setImage ]               = useState<string | null>( null );
  const [ previewURL, setPreviewURL ]     = useState<string | null>( null );
  const [ message, setMessage ]           = useState<string>( '' );

  // handle change
  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData( event, setSelectedFile, setPreviewURL );
  };

  // save data
  const onSubmit: SubmitHandler<TProduct> = async ( data ) => {
    // console.log( data )
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

  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <LinkProduct path={ path || "" }/>
      <div className="flex flex-row">
        <form onSubmit={ handleSubmit( onSubmit ) }
              className="w-full flex  flex-row gap-5 ">
          <div className={ "sm:m-4 bg-white rounded p-5 w-1/2" }>
            <InputForm title={ formProduct.nama } type="text" reg={ register( "nama" ) }/>
            <InputForm title={ formProduct.harga } type="number" reg={ register( "harga" ) }/>
            <InputForm title={ formProduct.lokasi } type="text" reg={ register( "lokasi" ) }/>
            <InputForm title={ formProduct.jenis } type="text" reg={ register( "jenis" ) }/>
            <InputForm title={ formProduct.keterangan } type="textarea" reg={ register( "keterangan" ) }/>
          </div>
          <div
            className=" sm:m-4 bg-white rounded p-5 w-1/2  flex  flex-col gap-5 ">
            <Suspense fallback={ <p>Loading feed...</p> }>
              <UploadDescription
                previewURL={ !previewURL
                             ? urlApi + image
                             : previewURL }
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