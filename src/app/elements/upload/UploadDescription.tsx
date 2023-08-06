import { styleLabelForm }                      from '@/app/style/form';
import { getExtensionData, validateExtension } from '@/lib/utils/fileExtension';
import React                                   from 'react';

export function SendData( event: React.ChangeEvent<HTMLInputElement>, setSelectedFile: ( value: ( ( ( prevState: ( File | null | undefined ) ) => ( File | null | undefined ) ) | File | null | undefined ) ) => void, setPreviewURL: ( value: ( ( ( prevState: ( string | null ) ) => ( string | null ) ) | string | null ) ) => void ) {
  const file = event.target.files && event.target.files[ 0 ];
  setSelectedFile( file || null );

  if( file ) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL( reader.result as string );
    };
    reader.readAsDataURL( file );
  }
  else {
    setPreviewURL( null );
  }
}

export async function handleUpload<T>(
  selectedFile: File | null | undefined,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  json: T,
  apiEndPoint: string,
  id: string     = "",
  method: string = 'POST'
) {
  // console.log(method,id,data,selectedFile)

  if( method === "PUT" ) {
    console.log( "true" )

    if( !selectedFile ) {
      console.log( "with out image" )
      setMessage( 'Update Text Success' );
    }
  }

  if( !selectedFile ) {
    setMessage( 'Please select a file' );
    return;
  }

  // if( method === "PUT" ) {
  const extensionData = getExtensionData( selectedFile.name )
  if( !validateExtension( extensionData ) ) {
    setMessage( 'Please insert a file with format' +
      ' ( jpg bmp png gif webp jpeg )' );
    return;
  }
  // }
  // else {
  //   const extensionData = getExtensionData( selectedFile.name )
  //   if( !validateExtension( extensionData ) ) {
  //     setMessage( 'Please insert a file with format' +
  //       ' ( jpg bmp png gif webp jpeg )' );
  //     return;
  //   }
  // }
  const dataku = JSON.stringify( json )
  const formData = new FormData();

  formData.append( 'file', selectedFile );
  // Assuming data is a JSON string
  formData.append( 'data', dataku );

  //----------------------send to
  try {
    const response = await fetch( '/api/' + apiEndPoint + "/" + id, {
      method: method,
      body  : formData,
    } )
    // const data     = await response.json()
    if( response.ok ) {
      setMessage( 'File uploaded successfully' );
    }
    else {
      setMessage( 'Error uploading file' );
    }
  }
  catch ( error ) {
    setMessage( 'Error uploading file' );
  }
}

export function UploadDescription( props: {
  previewURL: string | null,
  onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void,
  message: string
  title: string
} ) {
  return <div className={ 'flex flex-col gap-5' }>
    <label className={ styleLabelForm }>Masukan Gambar { props.title }</label>
    { !props.previewURL && <h1>Upload Image</h1> }
    { props.previewURL &&
	  <img src={ props.previewURL }
		   alt="Preview"
		   className={ 'w-[100%] h-auto border-2 border-gray-300  rounded-3xl' }/> }

    <input type="file"
           className="file-input file-input-bordered bg-gray-100 file-input-accent"
           onChange={ props.onChange }/>

    { props.message && <p>{ props.message }</p> }
  </div>;
}
