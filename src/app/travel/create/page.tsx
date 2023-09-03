"use client"
import { ChangeEvent, Suspense, useState } from 'react';
import { Form } from '@/app/components/form/Travel';
import { handleUpload, SendData, UploadDescription } from '@/app/elements/upload/Upload';
import { defaultFormTravel } from '@/app/utils/format/travel';
import { LinkNavbar } from '@/app/elements/link/LinksNavbar';

export default function Home() {

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

  return (
    <LinkNavbar>

      <div className="flex flex-row">
        <Form sendDataImage={ sendDataImage } data={ defaultFormTravel }>
          <Suspense fallback={ <p>Loading feed...</p> }>
            <UploadDescription previewURL={ previewURL }
                               onChange={ handleFileChange }
                               message={ message }
                               title={ "Travel" }

            />
          </Suspense>

        </Form>
      </div>
    </LinkNavbar>

  )
}

