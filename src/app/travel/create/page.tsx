"use client"
import React, { ChangeEvent, Suspense, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LinkNavigation } from '@/app/elements/link/Links';
import { Form } from '@/app/components/form/Travel';
import { handleUpload, SendData, UploadDescription } from '@/app/elements/upload/Upload';
import { defaultFormTravel } from '@/app/utils/format/travel';

export default function Home() {

  const pathname = usePathname()
  const path     = pathname.split( "/" )

  const handleFileChange                  = ( event: ChangeEvent<HTMLInputElement> ) => {
    SendData(
      event,
      setSelectedFile,
      setPreviewURL );
  };
  const [ selectedFile, setSelectedFile ] = useState<File | null>();
  const [ previewURL, setPreviewURL ]     = useState<string | null>( null );
  const [ message, setMessage ]           = useState<string>( '' );
  const sendDataImage                     = async ( data: TTravel ) => {
    await handleUpload(
      selectedFile,
      setMessage,
      data,
      "travel" )
  }

  const data = defaultFormTravel
  return (
    <main className="flex p-3 sm:p-6 flex-col z-50 bg-green-50 gap-3">
      <LinkNavigation path={ path }/>
      <div className="flex flex-row">
        <Form sendDataImage={ sendDataImage } data={ data }>
          <Suspense fallback={ <p>Loading feed...</p> }>
            <UploadDescription previewURL={ previewURL }
                               onChange={ handleFileChange }
                               message={ message }
                               title={ "Travel" }

            />
          </Suspense>

        </Form>
      </div>
    </main>
  )
}

