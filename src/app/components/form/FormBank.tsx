"use client"
import { formBank } from '@/app/utils/format/bank';
import { Cshadow } from '@/app/style/shadow';
import { styleLabelForm } from '@/app/style/form';

import React, { Suspense, useState } from 'react';
import { FormBody } from '@/app/elements/link/LinksNavbar';
import { FormList } from '@/app/components/form/Form';
import { useForm } from 'react-hook-form';
import { InputForm } from '@/app/elements/input/InputNew';
import { setIdBank } from '@/lib/utils/formatId';
import { EFButton } from '@/app/elements/button/form/Save';

type TYPE = TBank;
export const img = 'https://dummyimage.com/200x200/000/fff.jpg&text=not+found'

export function FormBank(
  { defaultData, method, id, to }:
    {
      defaultData: TYPE,
      method: "POST" | "PUT",
      id: string
      to: "travel" | "product" | "bank"
    }, ) {
  const [ data, setData ]         = useState<TBank>( defaultData );
  const [ imageUrl, setImageUrl ] = useState( "" );

  const handleSubmit = async ( d: TYPE ) => {
    console.log( "summit" )
    setData( d )
    setImageUrl( d.img );
    if( d.id.length < 10 ) {
      d.id = setIdBank( d )
    }
  }

  const formUse = useForm<TYPE>( {
    defaultValues: defaultData,
    mode         : "onChange",
  } );

  return ( <>
      <FormBody>
        <FormList<"bank">
          formUse={ formUse }
          handleSubmit={ handleSubmit }

          FormInput={ <>
            <InputForm title={ formBank.nama } type="text" reg={ formUse.register( "nama" ) }/>
            <InputForm title={ formBank.lokasi } type="text" reg={ formUse.register( "lokasi" ) }/>
            <InputForm title={ formBank.jenis } type="text" reg={ formUse.register( "jenis" ) }/>
            <InputForm title={ formBank.hp } type="tel" reg={ formUse.register( "hp" ) }/>
            <InputForm title={ formBank.no } type="tel" reg={ formUse.register( "no" ) }/>
            <InputForm title={ formBank.keterangan } type="textarea" reg={ formUse.register( "keterangan" ) }/>
            <InputForm title={ formBank.img } type="tel" reg={ formUse.register( "img" ) }/>
          </> }

          button={
            <button type="submit" className="bg-blue-500 p-2 rounded-md text-white">CEK</button>
          }

          submit={
            <EFButton<"bank"> data={ data } method={ method } id={ id } to={ to }/>
          }
        >
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
          </div>
        </FormList>
      </FormBody>
    </>
  )
}
