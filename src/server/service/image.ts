import { checkFolder, makeFolder }              from '@/lib/utils/deleteFile';
import {
  newError
}                                               from '@/server/exeption/errorHandler';
import { validateExtension, validateFileImage } from '@/lib/validation/image';

function addDot( extensionData: string, nama: string ) {
  return ( extensionData === "webp" || extensionData === "jpeg" )
         ? nama + "." + extensionData
         : nama + extensionData;
}

export async function saveFile( req: Request, image: string = "images/" ) {
  const formData   = await req.formData();
  const folderName = "public/" + image

  if( !checkFolder( folderName ) ) {
    console.log( 'folder create' );
    makeFolder( folderName )
  }

  let dataArray: any        = []
  const formDataEntryValues = Array.from( formData.values() );
  for( const formDataEntryValue of formDataEntryValues ) {
    if( typeof formDataEntryValue === "object" && "arrayBuffer" in
      formDataEntryValue ) {
      const file = formDataEntryValue as unknown as Blob;
      // const dataImage = { type: file.type, name: file.name, size: file.size }

      const dataku        = Object.assign( JSON.parse( <string>formDataEntryValues[ 0 ] ) )
      const extensionData = file.name.slice( -4 )

      if( validateExtension( extensionData ) ) {
        console.log( "format data is true" )

        const name = addDot( extensionData, dataku.nama )
        console.log( name )
        const filePath = folderName + name
        dataArray.push( formDataEntryValues[ 0 ] )
        const oData = JSON.parse( dataArray )

        oData.img = image + name
        const buffer = Buffer.from( await file.arrayBuffer() );

        return validateFileImage( filePath, buffer, oData )
      }
      else {
        console.log( "format data is false" )
        throw new newError( "format data is false", "format data is false" )
      }
    }
  }
}

