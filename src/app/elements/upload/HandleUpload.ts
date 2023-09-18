import { getExtensionData, validateExtension } from '@/lib/utils/fileExtension';
import { sendImage } from '@/app/utils/ress/SendApi';
import { notifyData } from '@/app/utils/notif/toash';
import { Dispatch, SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export async function handleUpload<T>(
  selectedFile: File | null | undefined,
  setMessage: Dispatch<SetStateAction<string>>,
  method: "PUT" | "POST",
  to: "travel" | "product"//|"bank"
  ,
  json: T,
  id: string = "",
  router: AppRouterInstance
) {

  if( method === "PUT" ) {
    if( !selectedFile ) {
      console.error( "with out image" )
      setMessage( 'Update Text Success' );
    }
  }

  if( !selectedFile ) {
    setMessage( 'Please select a file' );
    return;
  }

  const extensionData = getExtensionData( selectedFile.name )
  if( !validateExtension( extensionData ) ) {
    setMessage( 'Please an insert a file with format' +
      ' ( jpg bmp png gif webp jpeg )' );
    return;
  }

  const dataku   = JSON.stringify( json )
  const formData = new FormData();
  // console.log("form data")
  // console.log(formData)
  formData.append( 'file', selectedFile );
  // Assuming data is a JSON string
  formData.append( 'data', dataku );

  //----------------------send to
  try {
    const data: { msg: string } = await sendImage( to, id, method, formData );
    notifyData( "", data )
    if( data.msg.includes( "ccess" ) ) {
      setMessage( 'File uploaded successfully' );
      router.prefetch( `/${ to }/list` )
      router.replace( `/${ to }/list` )
    }
    else {
      setMessage( 'Error uploading file' );
    }
  }
  catch ( error ) {
    setMessage( 'Error uploading file data' );
  }
}
