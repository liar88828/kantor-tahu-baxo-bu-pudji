"use client"
import React, { ChangeEvent, Suspense, useState } from 'react';
import { SubmitHandler, useForm }                 from 'react-hook-form';
import type {
  TTravel
}                                                 from '@/entity/client/travel';
import {
  defaultFormTravel, formTravel
}                                                 from '@/app/utils/format/travel';
import {
  handleUpload, SendData, UploadDescription
}                                                 from '@/app/elements/upload/UploadDescription';
import {
  InputForm
}                                                 from '@/app/elements/input/InputNew';
import { usePathname }                            from 'next/navigation';
import {
  LinkTravel
}                                                 from '@/app/elements/link/Links';

export default function Home() {
  const { register, handleSubmit, } = useForm<TTravel>( {/* defaultValues: defaultValues, */
    mode: "onChange",
  } );

  const [ selectedFile, setSelectedFile ] = useState<File | null>();
  const [ previewURL, setPreviewURL ] = useState<string | null>( null );
  const [ message, setMessage ]     = useState<string>( '' );

  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData(
      event,
      setSelectedFile,
      setPreviewURL );
  };

  const onSubmit: SubmitHandler<TTravel> = async ( data ) => {
    await handleUpload(
      selectedFile,
      setMessage,
      data,
      "travel" )
    .then( () => {
      // let data
    } )
  }

  const pathname = usePathname()
  const path     = pathname.split( "/" ).pop()

  // const InputForm: React.FC<InputFormProps> = (
  //   {
  //     tag: Tag = "input", title, type, reg, value, min, defaultValue
  //   }: InputFormProps ): ReactElement => {
  //
  //   let ress = {
  //     placeholder: ` Masukan ${ title }....`,
  //     className: `${ StyleInputForm( false ) }`
  //   }
  //
  //   if( type ) ress = Object.assign( ress, { type } );
  //   if( value ) ress = Object.assign( ress, { value } );
  //   if( min ) ress = Object.assign( ress, { min } );
  //   if( defaultValue ) ress = Object.assign( ress, { defaultValue } );
  //
  //   return (
  //     <div className="flex flex-col">
  //       <label className={ styleLabelForm }
  //              htmlFor="grid-password"> { title } </label>
  //       <Tag{ ...ress }{ ...reg }/>
  //     </div>
  //   )
  // }

  const FormTravel = () => {

    return (
      <>
        <InputForm title={ formTravel.namaPengiriman } type="text"
                   reg={ register( "namaPengiriman" ) }
                   defaultValue={ defaultFormTravel.namaPengiriman }/>

        <InputForm title={ formTravel.noHpPerusahaan } type="number"
                   reg={ register( "noHpPerusahaan" ) }
                   defaultValue={ defaultFormTravel.noHpPerusahaan }/>

        <InputForm title={ formTravel.lokasi } type="text"
                   reg={ register( "lokasi" ) }
                   defaultValue={ defaultFormTravel.lokasi }/>

        <InputForm title={ formTravel.jenis } type="text"
                   reg={ register( "jenis" ) }
                   defaultValue={ defaultFormTravel.jenis }/>

        <InputForm title={ formTravel.harga } type="text"
                   reg={ register( "harga" ) }
                   defaultValue={ defaultFormTravel.harga }/>

        <InputForm title={ formTravel.keterangan } type="textarea"
                   reg={ register( "keterangan" ) }
                   defaultValue={ defaultFormTravel.keterangan }/>
      </>
    )
  }
  return (
    <main className="flex p-3 sm:p-6 flex-col z-50 bg-green-50 gap-3">
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
              <UploadDescription previewURL={ previewURL }
                                 onChange={ handleFileChange }
                                 message={ message }
                                 title={ "Travel" }/>
            </Suspense>
            <button type="submit"
                    className="bg-blue-500 p-2 rounded-md text-white">Simpan
            </button>
          </div>
        </form>
      </div>
    </main>
  )
    ;
}

