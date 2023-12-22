"use client"
import React, { ChangeEvent, useState } from 'react';
import { SendData } from '@/app/components/organisme/upload/SendData';
import { FormBody, FormButton, FormLayout, FormPrev } from '@/app/components/template/layout/Form';
import { UploadDescription } from '@/app/components/organisme/upload/Upload';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { InputForm } from '@/app/components/Atom/input/InputNew';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { vSchema } from '@/lib/validation/zod/validationSchema';
import { setIdTravel } from '@/lib/utils/formatId';
import { img } from '@/app/components/organisme/form/Bank';
import { TRes } from '@/entity/Utils';
import { Fetch } from '@/lib/ress/SendApi';
import { handleUpload } from '@/app/components/organisme/upload/HandleUpload';
import { notifyData } from '@/lib/notif/toash';
import { OpenButton, SubmitButton } from '@/app/components/Atom/Button/form/SubmitButton';
import { formTravel } from '../../../../../asset/constants/model/travel';

export default function Travel(
  { defaultData, method, id, to }:
    {
      defaultData: TTravel,
      method: "POST" | "PUT",
      id: string
      to: "travel"
    }, ) {

  const router                            = useRouter()
  const [ selectedFile, setSelectedFile ] = useState<File | null>();
  const [ previewURL, setPreviewURL ]     = useState<string | null>( null );
  const [ message, setMessage ]           = useState<string>( '' );
  const [ open, setOpen ]                 = useState<boolean>( false );

  const { handleSubmit, register, formState: { errors } } = useForm<TTravel>( {
    defaultValues: defaultData,
    mode         : "onChange",
    resolver     : zodResolver( vSchema.TravelSchema )
  } );

  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData(
      event,
      setSelectedFile,
      setPreviewURL );
  };
  console.log( errors )
  const handleSave       = async ( data: TTravel ) => {
    console.log( "click" )
    const text = method === "POST" ? "SIMPAN" : "EDIT"
    if( confirm( `Apakah anda yakin untuk ${ text } data ini ?` ) ) {
      if( !open ) {
        data.img                 = method === "POST" ? img : data.img
        data.id                  = method === "POST" ? setIdTravel( data ) : data.id
        const res: TRes<TTravel> = await Fetch<TTravel>( to, method, id, "text", data, )
        notifyData( res.msg )
        if( res.msg.includes( "cess" ) && !Array.isArray( res.data ) ) {
          // router.prefetch( "/" + to + "/list" )
          router.replace( "/" + to + "/list" )
        }
      }

      else if( open ) {
        await handleUpload(
          selectedFile,
          setMessage,
          method,
          to,
          data,
          id,
          router
        )
      }
    }
    else {
      notifyData( `Batal ${ text }` )
    }
  }

  return <form onSubmit={ handleSubmit( handleSave ) }>
    <FormLayout>
      <FormBody>
        <InputForm errors={ errors }
                   title={ formTravel.nama }
                   type="text"
                   reg={ register( "nama" ) }/>

        <InputForm errors={ errors }
                   title={ formTravel.hp }
                   type="tel"
                   reg={ register( "hp" ) }/>

        <InputForm errors={ errors }
                   title={ formTravel.lokasi }
                   type="text"
                   reg={ register( "lokasi" ) }/>

        <InputForm errors={ errors }
                   title={ formTravel.jenis }
                   type="text"
                   reg={ register( "jenis" ) }/>

        <InputForm errors={ errors }
                   title={ formTravel.harga }
                   type="number"
                   reg={ register( "harga",
                     { valueAsNumber: true } ) }/>

        <InputForm errors={ errors }
                   min={ 5 }
                   max={ 100 }
                   title={ formTravel.keterangan }
                   type="textarea"
                   reg={ register( "keterangan" ) }/>
        <FormButton>
          <OpenButton method={ method } fun={ () => setOpen( !open ) } states={ open }/>
          <SubmitButton method={ method }/>
        </FormButton>
      </FormBody>

      <FormPrev>
        { open
          && ( <UploadDescription previewURL={ previewURL }
                                  onChange={ handleFileChange }
                                  message={ message }
                                  title={ "Travel" }
          /> ) }
      </FormPrev>

    </FormLayout>
  </form>
}