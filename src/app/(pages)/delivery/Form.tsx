"use client"
import React, { useState } from 'react';
import { FormBody, FormButton, FormLayout, FormPrev } from '@/app/components/template/layout/Form';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { InputForm } from '@/app/components/Atom/input/InputNew';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { setIdDelivery } from '@/lib/utils/formatId';
import { Fetch } from '@/lib/ress/SendApi';
import { notifyData } from '@/lib/notif/toash';
import { OpenButton, SubmitButton } from '@/app/components/Atom/Button/form/SubmitButton';
import { CreateZod } from '@/lib/validation/zod/createZod';
import { formTravel } from '../../../../asset/constants/model/travel';
import { LayoutImagePrev } from '@/app/components/Atom/img/LayoutImagePrev';
import { ImagePrev } from '@/app/components/Atom/img/ImagePrev';
import { img } from '@/app/(pages)/bank/Form';
import { ToModel } from '@/entity/Utils';

export default function FormDeliver(
  { defaultData, method, id, to }:
    {
      defaultData: TDelivery,
      method: "POST" | "PUT",
      id: string
      to: ToModel
    }, ) {

  const router                                                       = useRouter()
  const [ imageUrl, setImageUrl ]                                    = useState<string>( defaultData.img );
  const [ open, setOpen ]                                            = useState<boolean>( false );
  const { getValues, register, handleSubmit, formState: { errors } } = useForm<TDelivery>( {
    defaultValues: defaultData,
    mode         : "onChange",
    resolver     : zodResolver( CreateZod.DeliverySchema )
  } );

  // console.log( errors )
  const handleImage = () => {
    setImageUrl( getValues().img );
    setOpen( prev => !prev )
  }

  const handleSave = async ( data: TDelivery ) => {
    setImageUrl( data.img )
    const text = method === "POST" ? "SIMPAN" : "EDIT"
    if( confirm( `Apakah anda yakin untuk ${ text } data ini ?` ) ) {
      try {
        // console.log( "send data" )
        data.id   = setIdDelivery( data )
        const res = await Fetch( {
          to    : to,
          json  : data,
          method: method,
          id    : id
        } )
        console.log( res )
        // console.log( "get gateway" )
        if( res.success ) {
          notifyData( 'success create data' )
          router.replace( `/${ to }/list?page=1&take=10` )
        }
        else if( !res.success ) {
          router.replace( `/${ to }/list?page=1&take=10` )
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
}