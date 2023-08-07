'use client'
import { useParams, usePathname }                 from 'next/navigation';
import React, { ChangeEvent, Suspense, useState } from 'react';
import { SubmitHandler, useForm }                 from 'react-hook-form';
import {
  handleUpload, SendData, UploadDescription
}                                                 from '@/app/elements/upload/UploadDescription';
import {
  LinkTravel
}                                                 from '@/app/elements/link/Links';
import {
  InputForm
}                                                 from '@/app/elements/input/InputNew';
import {
  urlApi
}                                                 from '@/app/utils/ress/product';
import {
  TTravel
}                                                 from '@/entity/client/travel';
import {
  formTravel
}                                                 from '@/app/utils/format/travel';

export default function Page() {
  const { id }   = useParams()
  const pathname = usePathname()
  const path     = pathname.split( "/" ).pop()
  return ( <FormEdit id={ id } path={ path || "" }/> )

}

export function FormEdit( { id, path }:
  { id: string, path: string } ) {

  const { register, handleSubmit, }       = useForm<TTravel>( {
    defaultValues: async () => {

      const res                         = await fetch( urlApi +
        "api/travel/" + id )
      const { data }: { data: TTravel } = await res.json()
      // console.log( data )
      setImage( data.img || "tidak ada" )
      return {
        id    : data.id,
        img   : data.img || "tidak ada",
        lokasi: data.lokasi,

        namaPengiriman: data.namaPengiriman,
        noHpPerusahaan: data.noHpPerusahaan,
        jenis         : data.jenis,
        harga         : data.harga,
        keterangan    : data.keterangan,

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
  const onSubmit: SubmitHandler<TTravel> = async ( data ) => {
    // console.log( data )
    await handleUpload(
      selectedFile,
      setMessage,
      data,
      "travel",
      data.id,
      "PUT"
    )
    .then( () => {
    } )

  };
  const FormTravel                       = () => {
    return ( <>
        <InputForm title={ formTravel.namaPengiriman } type="text"
                   reg={ register( "namaPengiriman" ) }
        />

        <InputForm title={ formTravel.noHpPerusahaan } type="number"
                   reg={ register( "noHpPerusahaan" ) }
        />

        <InputForm title={ formTravel.lokasi } type="text"
                   reg={ register( "lokasi" ) }
        />


        <InputForm title={ formTravel.jenis } type="text"
                   reg={ register( "jenis" ) }
        />

        <InputForm title={ formTravel.harga } type="number"
                   reg={ register( "harga" ) }
        />

        <InputForm title={ formTravel.keterangan } type="textarea"
                   reg={ register( "keterangan" ) }
        />
      </>
    )
  }

  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <LinkTravel path={ path || "" }/>

      <div className="flex flex-row">

        <form onSubmit={ handleSubmit( onSubmit ) }
              className="w-full flex  flex-row gap-5 ">

          <div className="  sm:m-4 bg-white rounded p-5 w-1/2">
            <FormTravel/>
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


                title={ "Travel" }/>

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