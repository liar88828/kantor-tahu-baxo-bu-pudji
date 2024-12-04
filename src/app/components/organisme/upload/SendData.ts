import { ChangeEvent } from 'react';

export function SendData(
  event: ChangeEvent<HTMLInputElement>,
  setSelectedFile: ( value: ( ( ( prevState: ( File | null | undefined ) ) => ( File | null | undefined ) ) | File | null | undefined ) ) => void,
  setPreviewURL: ( value: ( ( ( prevState: ( string | null ) ) => ( string | null ) ) | string | null ) ) => void
) {
  const file = event.target.files && event.target.files[ 0 ];
  setSelectedFile( file || null );

  if( file ) {
    const reader     = new FileReader();
    reader.onloadend = () => {
      setPreviewURL( reader.result as string );
    };
    reader.readAsDataURL( file );
  }
  else {
    setPreviewURL( null );
  }
}