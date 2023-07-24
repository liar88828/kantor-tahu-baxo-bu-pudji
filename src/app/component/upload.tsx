import { ChangeEvent, useState } from 'react';

export function Upload() {
  const [ selectedFile, setSelectedFile ] = useState<File | null>( null );
  const [ data, setData ] = useState<string>( '' ); // Assuming data is a JSON string
  const [ previewURL, setPreviewURL ] = useState<string | null>( null ); // State to store the preview image URL
  const [ message, setMessage ] = useState<string>( '' );

  const handleFileChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    const file = event.target.files && event.target.files[ 0 ];
    setSelectedFile( file || null );

    // Create a preview URL for the selected image
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
  };

  const handleDataChange = ( event: ChangeEvent<HTMLTextAreaElement> ) => {
    setData( event.target.value );
  };

  const handleUpload = async () => {
    if( !selectedFile ) {
      setMessage( 'Please select a file' );
      return;
    }

    const formData = new FormData();
    formData.append( 'file', selectedFile );
    formData.append( 'data', data ); // Assuming data is a JSON string

    try {
      const response = await fetch( '/api/upload', {
        method: 'POST',
        body: formData,
      } );
      if( response.ok ) {
        setMessage( 'File uploaded successfully' );
      }
      else {
        setMessage( 'Error uploading file' );
      }
    } catch ( error ) {
      setMessage( 'Error uploading file' );
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={ handleFileChange }/>
      { previewURL && <img src={ previewURL } alt="Preview" style={ { maxWidth: '300px' } }/> }
      <textarea placeholder="Enter data (JSON)" value={ data } onChange={ handleDataChange }/>
      <button onClick={ handleUpload }>Upload</button>
      { message && <p>{ message }</p> }
    </div>
  );
}
