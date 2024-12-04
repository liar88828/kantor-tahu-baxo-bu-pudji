import { ChangeEvent } from 'react';
import { ImagePrev } from '@/app/components/Atom/img/ImagePrev';
import { LayoutImagePrev } from '@/app/components/Atom/img/LayoutImagePrev';

export function UploadDescription( props: {
  previewURL: string | null,
  onChange: ( event: ChangeEvent<HTMLInputElement> ) => void,
  message: string
  title: string
  // children: ReactNode
} ) {
  return <LayoutImagePrev text={ props.title }>
    { !props.previewURL && <h1>Upload Image</h1> }
    { props.previewURL &&
      <ImagePrev src={ props.previewURL }/>
    }
    <input type="file"
           className="file-input file-input-bordered bg-gray-100 file-input-accent"
           onChange={ props.onChange }/>
    { props.message && <p>{ props.message }</p> }
  </LayoutImagePrev>

}
