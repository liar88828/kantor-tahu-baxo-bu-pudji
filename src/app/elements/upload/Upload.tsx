import { styleLabelForm } from '@/app/style/form';
import { ChangeEvent } from 'react';
import { Cshadow } from '@/app/style/shadow';

export function UploadDescription( props: {
  previewURL: string | null,
  onChange: ( event: ChangeEvent<HTMLInputElement> ) => void,
  message: string
  title: string
  // children: ReactNode
} ) {
  return <>
    <div className={ " bg-white rounded-lg p-5 flex flex-col gap-5 " + Cshadow }>
      <div className={ 'flex flex-col gap-5 ' }>
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
        {/*<>*/ }
        {/*  { props.children }*/ }
        {/*</>*/ }
      </div>
    </div>
  </>

}
