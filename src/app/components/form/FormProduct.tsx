"use client"
import React, { ChangeEvent, useState } from 'react';
import { defaultFormProduct, formProduct } from '@/app/utils/format/product';
import { img } from '@/app/components/form/FormBank';
import { SendData } from '@/app/elements/upload/SendData';
import { handleUpload } from '@/app/elements/upload/HandleUpload';
import { Layout } from '@/app/elements/layout/Layout';
import { FormList } from '@/app/components/form/Form';
import { UploadDescription } from '@/app/elements/upload/Upload';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { InputForm } from '@/app/elements/input/InputNew';
import { GateWay } from '@/app/utils/ress/GateWay';
import { notifyData } from '@/app/utils/notif/toash';
import { setIdProduct } from '@/lib/utils/formatId';
import { TRes } from '@/entity/Utils';

type TYPE = TProduct;

export function FormProduct(
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

  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData(
      event,
      setSelectedFile,
      setPreviewURL );
  };

  const sendDataImage = async ( data: TYPE ) => {
    const text = method === "POST" ? "SIMPAN" : "EDIT"
    if( confirm( `Apakah anda yakin untuk ${ text } data ini ?` ) ) {

      if( !open ) {
        const id              = method === "POST" ? "" : data.id
        data.id               = method === "POST" ? setIdProduct( data ) : data.id
        data.img              = method === "POST" ? img : data.img
        const res: TRes<TYPE> = await GateWay( method, to, id, data, "text" )

        if( res.msg.includes( "cess" ) && !Array.isArray( res.data ) ) {
          notifyData( res.msg )
          router.prefetch( "/" + to + "/list" )
          router.replace( "/" + to + "/list" )
        }

        if( Array.isArray( res.data ) ) {
          const zod = res.data[ 0 ]
          notifyData( `error ${ zod.code } because ${ zod.message } in ${ zod.path[ 0 ] }` )
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

  const formUse = useForm<TYPE>( {
    defaultValues: defaultData,
    mode         : "onChange",
  } );

  return ( <>
      <Layout>
        <FormList<"product">
          formUse={ formUse }
          // data={ defaultData }
          handleSubmit={ sendDataImage }

          FormInput={ <>
            <InputForm title={ formProduct.nama }
                       type="text"
                       reg={ formUse.register( "nama" ) }
                       defaultValue={ defaultFormProduct.nama }/>
            <InputForm title={ formProduct.harga }
                       type="number"
                       reg={ formUse.register( "harga" ) }
                       defaultValue={ defaultFormProduct.harga }/>
            <InputForm title={ formProduct.lokasi }
                       type="text"
                       reg={ formUse.register( "lokasi" ) }
                       defaultValue={ defaultFormProduct.lokasi }/>
            <InputForm title={ formProduct.jenis }
                       type="text"
                       reg={ formUse.register( "jenis" ) }
                       defaultValue={ defaultFormProduct.jenis }/>
            <InputForm title={ formProduct.keterangan }
                       type="textarea"
                       reg={ formUse.register( "keterangan" ) }
                       defaultValue={ defaultFormProduct.keterangan }/>

          </> }

          button={
            <button type="button"
                    onClick={ () => setOpen( !open ) }
                    className={ `bg-${ !open ? "info" : "error" } p-2 rounded-md text-white` }>
              { !open ? "Tambah" : "Tutup" }
            </button> }

          submit={
            <button type="submit"
                    className="bg-blue-500 p-2 rounded-md text-white">
              { method === "POST" ? "Simpan" : "Edit" }
            </button>
          }
        >
          { open
            && ( <UploadDescription previewURL={ previewURL }
                                    onChange={ handleFileChange }
                                    message={ message }
                                    title={ to }
              />

            )
          }
        </FormList>
      </Layout>
    </>
  )
}

// export function data() {
//
//   const formUse = useForm<TTravel>( {
//     defaultValues: data,
//     mode         : "onChange",
//   } );
//
//   return (
//     <>
//       <InputForm title={ formTravel.namaPengiriman } type="text" reg={ formUse.register( "namaPengiriman" ) }/>
//       <InputForm title={ formTravel.noHpPerusahaan } type="tel" reg={ formUse.register( "noHpPerusahaan" ) }/>
//       <InputForm title={ formTravel.lokasi } type="text" reg={ formUse.register( "lokasi" ) }/>
//       <InputForm title={ formTravel.jenis } type="text" reg={ formUse.register( "jenis" ) }/>
//       <InputForm title={ formTravel.harga } type="text" reg={ formUse.register( "harga" ) }/>
//       <InputForm title={ formTravel.keterangan } type="textarea" reg={ formUse.register( "keterangan" ) }/>
//     </>
//   )
// }

