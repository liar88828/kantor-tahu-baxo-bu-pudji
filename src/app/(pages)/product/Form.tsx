"use client"
import React, { useState } from 'react';
import { FormBody, FormButton, FormLayout, FormPrev } from '@/app/components/template/layout/Form';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { InputForm } from '@/app/components/Atom/input/InputNew';
import { notifyData } from '@/lib/notif/toash';
import { setIdProduct } from '@/lib/utils/formatId';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { Fetch } from '@/lib/ress/SendApi';
import { CreateZod } from '@/lib/validation/zod/createZod';
import { LayoutImagePrev } from '@/app/components/Atom/img/LayoutImagePrev';
import { ImagePrev } from '@/app/components/Atom/img/ImagePrev';
import { img } from '@/app/(pages)/bank/Form';
import { formProduct } from '../../../../asset/constants/model/product';
import { formBank } from '../../../../asset/constants/model/bank';
import { OpenButton, SubmitButton } from '@/app/element/SubmitButton';
import { ToModel } from '@/interface/Utils';

type TYPE = TProduct;

export default function FormProduct(
  { defaultData, method, id, to }:
    {
      defaultData: TYPE,
      method: "POST" | "PUT",
      id: string
      to: ToModel
    }, ) {

  const router                                                       = useRouter()
  const [ imageUrl, setImageUrl ]                                    = useState<string>( defaultData.img );
  const [ open, setOpen ]                                            = useState<boolean>( false );
  const { getValues, register, handleSubmit, formState: { errors } } = useForm<TYPE>( {
    defaultValues: defaultData,
    mode         : "onChange",
    resolver: zodResolver( CreateZod.ProductSchema )
  } );

  // console.log( errors )
  const handleImage = () => {
    setImageUrl( getValues().img );
    setOpen( prev => !prev )
  }

  const handleSave = async ( data: TYPE ) => {
    console.log( 'click' )
    setImageUrl( data.img )
    const text = method === "POST" ? "SIMPAN" : "EDIT"
    if( confirm( `Apakah anda yakin untuk ${ text } data ini ?` ) ) {
      try {
        console.log( "send data" )
        data.id   = setIdProduct( data )
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

  return (
    <form onSubmit={ handleSubmit( handleSave ) }>
      <FormLayout>
        <FormBody>
          <InputForm errors={ errors }
                     title={ formProduct.nama }
                     type="text"
                     reg={ register( "nama" ) }
          />

          <InputForm errors={ errors }
                     title={ formProduct.harga }
                     type="number"
                     reg={ register( "harga", { valueAsNumber: true } ) }
          />

          <InputForm errors={ errors }
                     title={ formProduct.lokasi }
                     type="text"
                     reg={ register( "lokasi" ) }
          />

          <InputForm errors={ errors }
                     title={ formProduct.jenis }
                     type="text"
                     reg={ register( "jenis" ) }
          />

          <InputForm errors={ errors }
                     title={ formProduct.keterangan }
                     type="textarea"
                     min={ 0 }
                     max={ 100 }
                     reg={ register( "keterangan" ) }
          />

          <InputForm errors={ errors }
                     title={ formBank.img }
                     type="textarea"
                     min={ 0 }
                     max={ 300 }
                     reg={ register( "img" ) }/>
          <FormButton>
            <OpenButton method={ method } fun={ () => handleImage() } states={ open }/>
            <SubmitButton method={ method }/>
          </FormButton>
        </FormBody>


        {/*<div className={ `${ open ? "block" : "hidden fixed" }` }>*/ }

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