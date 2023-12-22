"use client"
import React, { useState } from 'react';
import { FormBody, FormButton, FormLayout, FormPrev } from '@/app/components/template/layout/Form';
import { useForm } from 'react-hook-form';
import { InputForm } from '@/app/components/Atom/input/InputNew';
import { vSchema } from '@/lib/validation/zod/validationSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';

import { ImagePrev } from '@/app/components/Atom/img/ImagePrev';
import { LayoutImagePrev } from '@/app/components/Atom/img/LayoutImagePrev';
import { notifyData } from '@/lib/notif/toash';
import { Fetch } from '@/lib/ress/SendApi';
import { OpenButton, SubmitButton } from '@/app/components/Atom/Button/form/SubmitButton';
import { setIdBank } from '@/lib/utils/formatId';
import { formBank } from '../../../../../asset/constants/model/bank';

type TYPE = TBank;
export const img = 'https://dummyimage.com/200x200/000/fff.jpg&text=not+found'

export default function Bank(
  { defaultData, method, id, to }:
    {
      defaultData: TYPE,
      method: "POST" | "PUT",
      id: string
      to: "travel" | "product" | "bank"
    }, ) {

  const router                                                       = useRouter()
  const [ imageUrl, setImageUrl ]                                    = useState<string>( defaultData.img );
  const [ open, setOpen ]                                            = useState<boolean>( false );
  const { getValues, register, handleSubmit, formState: { errors } } = useForm<TYPE>( {
    defaultValues: defaultData,
    mode         : "onChange",
    resolver     : zodResolver( vSchema.BankSchema )
  } );
  console.log( errors )
  const handleImage = () => {
    setImageUrl( getValues().img );
    setOpen( prev => !prev )
  }
  const handleSave  = async ( data: TYPE ) => {
    setImageUrl( data.img )
    const text = method === "POST" ? "SIMPAN" : "EDIT"
    // console.log( errors)
    if( confirm( `Apakah anda yakin untuk ${ text } data ini ?` ) ) {
      try {
        console.log( "send data" )
        data.id = setIdBank( data )
        const res = await Fetch( to, method, id, "", data, "noCache" )
        console.log( "get gateway" )
        if( Array.isArray( res.data ) ) {
          notifyData( "", res.data )
        }
        else {
          notifyData( res.msg )
          if( res.msg.toString().includes( "cess" ) ) {
            // router.prefetch( `/${ to }/list` )
            router.replace( `/${ to }/list` )
          }
        }
      }
      catch ( e ) {
        console.log( e )
        notifyData( "error" )
      }
    }
    else {
      notifyData( `Batal ${ text }` )
    }
  }

  return (
    <form onSubmit={ handleSubmit( handleSave ) }>
      <FormLayout>
        <FormBody>
          <InputForm errors={ errors }
                     title={ formBank.nama }
                     type="text"
                     reg={ register( "nama" ) }/>

          <InputForm errors={ errors }
                     title={ formBank.lokasi }
                     type="text"
                     reg={ register( "lokasi" ) }/>

          <InputForm errors={ errors }
                     title={ formBank.jenis }
                     type="text"
                     reg={ register( "jenis" ) }/>

          <InputForm errors={ errors }
                     title={ formBank.hp }
                     type="number"
                     reg={ register( "hp" ) }/>

          <InputForm errors={ errors }
                     title={ formBank.no }
                     type="number"
                     reg={ register( "no" ) }/>

          <InputForm errors={ errors }
                     tag={ "textarea" } title={ formBank.keterangan }
                     type="textarea"
                     max={ 100 }
                     min={ 5 }
                     reg={ register( "keterangan" ) }/>

          <InputForm errors={ errors }
                     title={ formBank.img }
                     type="text"
                     min={ 20 }
                     max={ 200 }
                     reg={ register( "img" ) }/>
          <FormButton>
            <OpenButton method={ method } fun={ () => handleImage() } states={ open }/>
            <SubmitButton method={ method }/>
          </FormButton>
        </FormBody>

        <FormPrev>
          { open &&
            <LayoutImagePrev text={ to }>
              { !imageUrl && <h1>Upload Image</h1> }
              { imageUrl &&
                // eslint-disable-next-line @next/next/no-img-element
                <ImagePrev src={ defaultData.img === "" ? img : imageUrl }/>
              }
            </LayoutImagePrev>
          }
        </FormPrev>
      </FormLayout>
    </form>

  )
}

