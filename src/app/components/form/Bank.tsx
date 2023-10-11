"use client"
import { Cshadow } from '@/app/style/shadow';
import { styleLabelForm } from '@/app/style/form';

import React, { useState } from 'react';
import { FormLayout } from '@/app/components/layouts/Form';
import { useForm } from 'react-hook-form';
import { InputForm } from '@/app/elements/input/InputNew';
import { GateWay } from '@/lib/utils/ress/GateWay';
import { notifyData } from '@/lib/utils/notif/toash';
import { useRouter } from 'next/navigation';
import { formBank } from '@/lib/utils/example/bank';

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
  const router                    = useRouter()
  const [ imageUrl, setImageUrl ] = useState<string>( defaultData.img );
  const [ open, setOpen ]         = useState<boolean>( false );
  const formUse                   = useForm<TYPE>( {
    defaultValues: defaultData,
    mode         : "onChange",
  } );
  const handleSubmit              = async ( d: TYPE ) => {
    console.log( d )
    console.log( "summit" )
    setImageUrl( d.img );
    setOpen( !open )

  }
  const handleSave                = async () => {
    const text = method === "POST" ? "SIMPAN" : "EDIT"
    if( confirm( `Apakah anda yakin untuk ${ text } data ini ?` ) ) {
      try {
        console.log( formUse.getValues() )
        const res = await GateWay( method, to, id, formUse.getValues(), "", "noCache" )

        console.log( res )
        console.log( "get gateway" )
        if( Array.isArray( res.data ) ) {
          notifyData( "", res.data )
        }
        else {
          notifyData( res.msg )
          if( res.msg.toString().includes( "cess" ) ) {
            router.prefetch( `/${ to }/list` )
            router.replace( `/${ to }/list` )
          }
        }
      }
      catch ( e ) {
        console.log( e )
      }

    }
    else {
      notifyData( `Batal ${ text }` )
    }
  }

  // console.log( "get data" )
  // console.log( formUse.getValues() )
  // console.log( "get data" )

  return (
    <FormLayout<"bank">
      formUse={ formUse }
      handleSubmit={ handleSubmit }

      FormInput={ <>
        <InputForm title={ formBank.nama } type="text" reg={ formUse.register( "nama" ) }/>
        <InputForm title={ formBank.lokasi } type="text" reg={ formUse.register( "lokasi" ) }/>
        <InputForm title={ formBank.jenis } type="text" reg={ formUse.register( "jenis" ) }/>
        <InputForm title={ formBank.hp } type="number" reg={ formUse.register( "hp" ) }/>
        <InputForm title={ formBank.no } type="number" reg={ formUse.register( "no" ) }/>
        <InputForm tag={ "textarea" } title={ formBank.keterangan } type="textarea"
                   reg={ formUse.register( "keterangan" ) }/>
        <InputForm title={ formBank.img } type="text" reg={ formUse.register( "img" ) }/>
      </> }

      button={
        <button type="submit"

                className="bg-blue-500 p-2 rounded-md text-white">CEK</button>
      }

      submit={
          <button type="submit"
                  onClick={ handleSave }
                  className={ `bg-${ !open ? "success" : "warning" } p-2 rounded-md text-white` }>
            { method === "POST" ? "SIMPAN" : "EDIT" }
          </button>

      }
    >
      { open &&
        <div className={ " bg-white rounded-lg p-5 flex flex-col gap-5 " + Cshadow }>
          <div className={ 'flex flex-col gap-5 ' }>
            <label className={ styleLabelForm + "capitalize" }>Masukan Gambar { to }</label>
            { !imageUrl && <h1>Upload Image</h1> }
            { imageUrl &&
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="Preview"
                   src={ defaultData.img === "" ? img : imageUrl }
                   className={ 'w-[100%] h-auto border-2 border-gray-300 rounded-3xl' }/>
            }
          </div>
        </div> }
    </FormLayout>

  )
}
