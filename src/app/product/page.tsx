"use client"
import React, { useState } from 'react';

type TProps = {
  value1: string
  value2: number
}

function Products() {

  const [ description, setDescription ] = useState( "" )
  const [ selectedFile, setSelectedFile ] = useState<File | null>( null );
  // FormEventHandler<HTMLFormElement>

  const handleFileInput = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const file = event.target.files ? event.target.files[ 0 ] : null;
    setSelectedFile( file );
  };

  const submit = async ( event:
      React.FormEvent<HTMLFormElement>
      | React.ChangeEvent<HTMLInputElement>
    // | FormEventHandler<HTMLFormElement>
  ): Promise<any> => {
    event.preventDefault()

    const formData = new FormData()
    if( selectedFile == null ) {
      return null
    }
    formData.append( "image", selectedFile )
    formData.append( "description", description )

    const result = await fetch( '/api/images', {
        method: "POST",
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    console.log( result )
  }

  return (

    <div>
      <div className="">

        <h1>Form Product</h1>
      </div>
      <div className="App">
        <form onSubmit={ submit }>
          <input
            // @ts-ignore
            filename={ selectedFile }
            onChange={ handleFileInput }
            type="file"
            accept="image/*"
          ></input>
          <input
            onChange={ e => setDescription( e.target.value ) }
            type="text"
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Products;