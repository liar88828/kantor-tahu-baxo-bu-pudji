'use client'
import { useParams, usePathname } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { LinkNavigation } from '@/app/elements/link/Links';
import { handleUpload, SendData, UploadDescription } from '@/app/elements/upload/Upload';
import { config } from '../../../../../dataEnv';
import { Form } from '@/app/components/form/Travel';
import { notifyData } from '@/app/utils/notif/toash';

export default function Page() {
  const { id }   = useParams()
  const pathname = usePathname()
  const path     = pathname.split( "/" )
  return ( <FormEdit id={ id } path={ path }/> )
}

export function FormEdit( { id, path }: {
  id: string,
  path: string[]
} ) {

  const [ selectedFile, setSelectedFile ] = useState<File | null>();
  const [ image, setImage ]               = useState<string | null>( null );
  const [ previewURL, setPreviewURL ]     = useState<string | null>( null );
  const [ message, setMessage ]           = useState<string>( '' );
  const [ isLoading, setIsLoading ] = useState<boolean>( false );

  // handle change
  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData( event, setSelectedFile, setPreviewURL );
  };
  const sendDataImage = async ( data: TTravel ) => {
    await handleUpload(
      selectedFile,
      setMessage,
      data,
      "travel",
      data.id,
      "PUT"
    )

  };

  const [ data, setData ] = useState<TTravel>( {
    id            : "id",
    namaPengiriman: "nama perusahaan",
    noHpPerusahaan: "012312312",
    jenis         : "truck, pesawat, kapal",
    img           : "https://picsum.photos/seed/picsum/200/300",
    harga         : 20_000,
    keterangan    : "perjalanaan jauh sekali",
    lokasi        : "semarang"

  } )
  useEffect( () => {
    fetch( config.url + "/api/travel/" + id )
    .then( res => res.json() )
    .then( d => {
      setData( prev => ( d.data ) )
      setImage( d.data.img ?? "tidak ada" )
      notifyData( "success " + d.data.namaPengiriman.toUpperCase() )
      setIsLoading( true )
    } )

  }, [] )

  return ( <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <LinkNavigation path={ path }/>
      <div className="flex flex-row">
        { !isLoading ? ( <h1>Loading</h1> ) : (
          <Form sendDataImage={ sendDataImage } data={ data }>
            <UploadDescription
              previewURL={ !previewURL ? config.url + "/" + image : previewURL }
              onChange={ handleFileChange }
              message={ message }
              title={ "Travel" }/>
          </Form>
        ) }
      </div>
    </main>
  )
}

