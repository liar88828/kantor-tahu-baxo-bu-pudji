"use client"
import React, { ChangeEvent, ReactElement, Suspense, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputFormProps } from '../../../entity/InputForm';
import { StyleInputForm, styleLabelForm } from '@/app/style/form';
import { TFromTravel } from '../../../entity/travel';
import { defaultFormTravel, formTravel } from '@/components/travel/format';
import { handleUpload, SendData, Upload } from '@/element/Upload';

// const WithCustomLoading = dynamic( () => import('../../element/Upload').then( Element => Element.Upload ) )

export default function Home() {
  const { control, register, handleSubmit, } = useForm<TFromTravel>( {/* defaultValues: defaultValues, */
    mode: "onChange",
  } );

  const [ selectedFile, setSelectedFile ] = useState<File | null>();
  const [ previewURL, setPreviewURL ] = useState<string | null>( null ); // State to store the preview image URL
  const [ message, setMessage ] = useState<string>( '' );
  const [ salah, setSalah ] = useState<boolean>( false );

  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData( event, setSelectedFile, setPreviewURL );
  };

  const onSubmit: SubmitHandler<TFromTravel> = ( data ) => {
    handleUpload(
      selectedFile,
      setMessage, data, "upload" )
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
        <Tag{ ...ress }{ ...reg }/>
      </div>
    )
  }

  const FormPengiriman = () => {

    return (
      <>
        <InputForm title={ formTravel.namaPengiriman } type="text" reg={ register( "namaPengiriman" ) }
                   defaultValue={ defaultFormTravel.namaPengiriman }/>
        <InputForm title={ formTravel.noHpPerusahaan } type="number" reg={ register( "noHpPerusahaan" ) }
                   defaultValue={ defaultFormTravel.noHpPerusahaan }/>
        <InputForm title={ formTravel.lokasi } type="text" reg={ register( "noHpPerusahaan" ) }
                   defaultValue={ defaultFormTravel.lokasi }/>
        <InputForm title={ formTravel.jenis } type="text" reg={ register( "jenis" ) }
                   defaultValue={ defaultFormTravel.jenis }/>
        <InputForm title={ formTravel.harga } type="text" reg={ register( "harga" ) }
                   defaultValue={ defaultFormTravel.harga }/>
        <InputForm title={ formTravel.keterangan } type="textarea" reg={ register( "keterangan" ) }
                   defaultValue={ defaultFormTravel.keterangan }/>
      </>
    )
  }
  // console.log( Array( 20 ) )
  return (
    <main className="flex p-3 sm:p-6 flex-col z-50 bg-green-50 gap-3">
      <form onSubmit={ handleSubmit( onSubmit ) }
            className="w-full flex  flex-row gap-5 ">

        <div className="  sm:m-4 bg-white rounded p-5 w-1/2">
          <FormPengiriman/>
        </div>

        <div className=" sm:m-4 bg-white rounded p-5 w-1/2  flex  flex-col gap-5 ">
          <Suspense fallback={ <p>Loading feed...</p> }>
            <Upload previewURL={ previewURL } onChange={ handleFileChange } message={ message } title={ "Travel" }/>
          </Suspense>
          {/*<WithCustomLoading previewURL={ previewURL } onChange={ handleFileChange } message={ message }*/ }
          {/*                   title={ "Travel" }/>*/ }
          <button type="submit" className="bg-blue-500 p-2 rounded-md text-white">Simpan</button>
        </div>
      </form>
    </main>
  )
    ;
}

