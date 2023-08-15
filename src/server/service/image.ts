import { checkFolder, makeFolder } from '@/lib/utils/fileSystem';
import {
  newError
}                                  from '@/server/exeption/errorHandler';
import { validateFileImage }       from '@/lib/validation/image';
import {
  addDot, getExtensionData, validateExtension
}                                  from '@/lib/utils/fileExtension';

export async function saveFile(
  req: Request,
  image: string  = "images/",
  option: string = "create"
) {
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
      const file          = formDataEntryValue as unknown as Blob;
      const dataku        = Object.assign( JSON.parse( <string>formDataEntryValues[ 0 ] ) )
      //get file extension
      const extensionData = getExtensionData( file.name )

      if( validateExtension( extensionData ) ) {
        console.log( "format data is true" )

        const name     = addDot( extensionData, dataku.nama )
        const filePath = folderName + Date.now() + "_" + name

        dataArray.push( formDataEntryValues[ 0 ] )

        const oData     = JSON.parse( dataArray )
        const dataImage = image + Date.now() + "_" + name
        // console.log( filePath )// with public
        // console.log( dataImage )//normal
        oData.img = oData.img ? oData.img : dataImage
        // console.log( oData.img )//old
        const buffer = Buffer.from( await file.arrayBuffer() );

        const valid = await validateFileImage( filePath,
          buffer,
          oData,
          oData.img,
          dataImage,
          option, )
        // console.log( valid ,"valid")
        return valid
      }
      else {
        console.log( "format data is false" )
        throw new newError( "format data is false" )
      }
    }
  }
}
