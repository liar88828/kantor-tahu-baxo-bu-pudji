"use client"; // Make this component a client component
import React, { FormEvent, useState } from "react";
import CustomFileSelector from "./CustomFileSelector";
import ImagePreview from "../element/ImagePreview";
import axios from "axios";
import classNames from "classnames";

const FileUploadForm = () => {
  const [ images, setImages ] = useState<File[]>( [] );
  const [ uploading, setUploading ] = useState( false );

  const handleFileSelected = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    if( e.target.files ) {
      const _files = Array.from( e.target.files );
      setImages( _files );
    }
  };

  const handleSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach( ( image ) => {
      formData.append( image.name, image );
      formData.append( 'description', "description" );
    } );
    setUploading( true );
    await axios.post( "/api/upload", formData );
    setUploading( false );
  };
  return (
    <form className="w-full flex flex-col" onSubmit={ handleSubmit }>
      <div className="flex justify-between">
        <CustomFileSelector
          accept="image/png, image/jpeg"
          onChange={ handleFileSelected }
        />
        <button
          type="submit"
          className={
            classNames( {
              " bg-green-100 text-black hover:bg-green-200 px-4 py-2 rounded ": true,
              "disabled pointer-events-none opacity-40 ": uploading,
            } ) }
          disabled={ uploading }
        >
          Upload
        </button>

        {/*<button type="submit" className="bg-blue-500 p-2 rounded-md text-white">Simpan</button>*/ }

      </div>


      <ImagePreview images={ images }/>
    </form>
  );
};

export default FileUploadForm;