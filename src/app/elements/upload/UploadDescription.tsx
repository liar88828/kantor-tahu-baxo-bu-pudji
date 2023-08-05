import { styleLabelForm } from '@/app/style/form';

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
  data: T,
  apiEndPoint: string,
  id: string     = "",
  method: string = 'POST'
) {
  // console.log(method,id,data,selectedFile)
  if( !selectedFile ) {
    setMessage( 'Please select a file' );
    return;
  }
  const dataku = JSON.stringify( data )
  const formData = new FormData();
  formData.append( 'file', selectedFile );
  formData.append( 'data', dataku ); // Assuming data is a JSON string

  // -------------------------------------------------------------------send to
  // Api
  try {
    const response = await fetch( '/api/' + apiEndPoint + "/" + id, {
      method: method,
      body  : formData,
    } )
    const data     = await response.json()
    // console.log( data.msg )
    // console.log( data.data )
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
	  <img src={ props.previewURL } alt="Preview"
		   className={ 'w-[100%] h-auto border-2 border-gray-300    rounded-3xl' }/> }

    <input type="file"
           className="file-input file-input-bordered bg-gray-100 file-input-accent"
           onChange={ props.onChange }/>

    { props.message && <p>{ props.message }</p> }
  </div>;
}
