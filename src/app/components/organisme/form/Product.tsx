"use client"
import React, { ChangeEvent, useState } from 'react';
import { SendData } from '@/app/components/organisme/upload/SendData';
import { handleUpload } from '@/app/components/organisme/upload/HandleUpload';
import { FormBody, FormButton, FormLayout, FormPrev } from '@/app/components/template/layout/Form';
import { UploadDescription } from '@/app/components/organisme/upload/Upload';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { InputForm } from '@/app/components/Atom/input/InputNew';
import { notifyData } from '@/lib/notif/toash';
import { setIdProduct } from '@/lib/utils/formatId';
import { TRes } from '@/entity/Utils';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { Fetch } from '@/lib/ress/SendApi';
import { OpenButton, SubmitButton } from '@/app/components/Atom/Button/form/SubmitButton';
import { formProduct } from '../../../../../asset/constants/model/product';
import { CreateZod } from '@/lib/validation/zod/createZod';
import { img } from '@/app/(pages)/bank/Form';

type TYPE = TProduct;

export function Product(
  { defaultData, method, id, to }:
    {
      defaultData: TYPE,
      method: "POST" | "PUT",
      id: string
      to: "travel" | "product"
    }, ) {

  const router                            = useRouter()
  const [ selectedFile, setSelectedFile ] = useState<File | null>();
  const [ previewURL, setPreviewURL ]     = useState<string | null>( null );
  const [ message, setMessage ]           = useState<string>( '' );
  const [ open, setOpen ]                 = useState<boolean>( false );

  const { register, handleSubmit, formState: { errors } } = useForm<TYPE>( {
    defaultValues: defaultData,
    mode         : "onChange",
    resolver: zodResolver( CreateZod.ProductSchema )
  } );

  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData(
      event,
      setSelectedFile,
      setPreviewURL );
  };

  async function handleSave( data: TYPE ) {
    console.log( "run" )
    const text = method === "POST" ? "SIMPAN" : "EDIT"
    if( confirm( `Apakah anda yakin untuk ${ text } data ini ?` ) ) {
      if( !open ) {
        data.img              = method === "POST" ? img : data.img
        data.id               = method === "POST" ? setIdProduct( data ) : data.id
        const res: TRes<TYPE> = await Fetch( { to, method, id, json: data } )

        if( res.msg.includes( "cess" ) ) {
          notifyData( res.msg )
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
                     reg={ register( "keterangan" ) }
          />

          <FormButton>
            <OpenButton method={ method } fun={ () => setOpen( !open ) } states={ open }/>
            <SubmitButton method={ method }/>
          </FormButton>
        </FormBody>
        {/*<div className={ `${ open ? "block" : "hidden fixed" }` }>*/ }
        <FormPrev>


          { open
            && ( <UploadDescription previewURL={ previewURL }
                                    onChange={ handleFileChange }
                                    message={ message }
                                    title={ to }
              />

            ) }
        </FormPrev>
        {/*</div>*/ }

      </FormLayout>
    </form>

  )
}