import { getExtensionData, validateExtension } from '@/lib/utils/fileExtension';
import { notifyData } from '@/app/utils/notif/toash';
import { Dispatch, SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { GateWay } from '@/app/utils/ress/GateWay';

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

  const extensionData = getExtensionData( selectedFile.name ) as string
  console.log( "client extensionData ", extensionData )
  console.log( "client validateExtension ", !validateExtension( extensionData ) )
  if( !validateExtension( extensionData ) ) {
    setMessage( 'Please an insert a file with format' +
      ' ( jpg bmp png gif webp jpeg )' );
    return;
  }
  console.log( "test2" )

  const dataku   = JSON.stringify( json )
  const formData = new FormData();
  // console.log("form data")
  // console.log(formData)
  formData.append( 'file', selectedFile );
  // Assuming data is a JSON string
  formData.append( 'data', dataku );

  //----------------------send to
  try {
    //   const data: { msg: string } = await sendImage( to, id, method, formData );
    console.log( "send data" )
    const data: { msg: string } = await GateWay( method, to, id, formData, "file" );
    console.log( "res data" )
    console.log( data )
    notifyData( data.msg )
    if( data.msg.includes( "ccess" ) ) {
      setMessage( 'File uploaded successfully' );
      // router.prefetch( `/${ to }/list` )
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
