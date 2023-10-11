"use client"
import { ChangeEvent, useState } from 'react';
import { SendData } from '@/app/elements/upload/SendData';
import { handleUpload } from '@/app/elements/upload/HandleUpload';
import { FormLayout } from '@/app/components/layouts/Form';
import { UploadDescription } from '@/app/elements/upload/Upload';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { InputForm } from '@/app/elements/input/InputNew';
import { GateWay } from '@/lib/utils/ress/GateWay';
import { TRes } from '@/entity/Utils';
import { notifyData } from '@/lib/utils/notif/toash';
import { setIdTravel } from '@/lib/utils/formatId';
import { img } from '@/app/components/form/Bank';
import { formTravel } from '@/lib/utils/example/travel';

export function Travel(
  { defaultData, method, id, to }:
    {
      defaultData: TTravel,
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

  const sendData = async ( data: TTravel ) => {
    const text = method === "POST" ? "SIMPAN" : "EDIT"
    if( confirm( `Apakah anda yakin untuk ${ text } data ini ?` ) ) {

      if( !open ) {
        const id                 = method === "POST" ? "" : data.id
        data.id                  = method === "POST" ? setIdTravel( data ) : data.id
        data.img                 = method === "POST" ? img : data.img
        const res: TRes<TTravel> = await GateWay<TTravel>( method, to, id, data, "text" )
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

  const formUse = useForm<TTravel>( {
    defaultValues: defaultData,
    mode         : "onChange",
  } );

  return ( <FormLayout<"travel">
      formUse={ formUse }
      // data={ defaultData }
      handleSubmit={ sendData }

      FormInput={ <>
        <InputForm title={ formTravel.nama } type="text"
                   reg={ formUse.register( "nama" ) }/>
        <InputForm title={ formTravel.hp } type="tel"
                   reg={ formUse.register( "hp" ) }/>
        <InputForm title={ formTravel.lokasi } type="text" reg={ formUse.register( "lokasi" ) }/>
        <InputForm title={ formTravel.jenis } type="text" reg={ formUse.register( "jenis" ) }/>
        <InputForm title={ formTravel.harga } type="text" reg={ formUse.register( "harga" ) }/>
        <InputForm title={ formTravel.keterangan } type="textarea"
                   reg={ formUse.register( "keterangan" ) }/>
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
                                title={ "Travel" }
          />

        )
      }
    </FormLayout>
  )
}
