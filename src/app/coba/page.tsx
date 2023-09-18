"use client"
import React, { useState } from 'react';

function App() {
  const [ imageUrl, setImageUrl ]       = useState( 'https://dummyimage.com/200x200/000/fff.jpg&text=not+found' );
  const [ newImageUrl, setNewImageUrl ] = useState( '' );

  const handleImageUrlChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setNewImageUrl( e.target.value );
  };

  const updateImageUrl = () => {
    setImageUrl( newImageUrl );
  };

  return (
    <div>
      <h1>Image Updater</h1>
      <div>
        <img src={ imageUrl } alt="Image"/>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter new image URL"
          value={ newImageUrl }
          onChange={ handleImageUrlChange }
        />
        <button onClick={ updateImageUrl }>Update Image</button>
      </div>
    </div>
  );
}

export default App;
