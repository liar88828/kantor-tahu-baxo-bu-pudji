import { checkFile, createFile } from '@/lib/utils/fileSystem';
import { newError }              from '@/server/exeption/errorHandler';
import fs                        from 'fs';

const saveFile   = ( filePath: string, buffer: Buffer, data: any, ) => {
  if( checkFile( filePath ) ) {
    console.log( 'file exists' );
  }
  else {
    console.log( 'file not found!' );
    createFile( filePath, buffer )
    console.log( data )
    return data
  }
}
const deleteFile = async (
  img: string
) => {
  return fs.unlink( "public/" + img, err => {
    if( err ) {
      console.log( "Delete error" )
      return "Delete error"
    }
    console.log( "Delete Success" )
    return "Delete file Success"
  } )
}

export const validateFileImage = async ( filePath: string, buffer: Buffer, data: any, image: string, newImage: string, option: string = "create", ) => {
  if( option === "create" ) {
    console.log( "create" )
    return saveFile( filePath, buffer, data )
  }
  else if( option === "edit" ) {
    const find = checkFile( "public/" + image )
    if( find ) {
      await deleteFile( image )
      .then( () => {
        createFile( "public/" + newImage, buffer )
        // console.log( data.img)
        data.img = newImage
        // console.log(  data.img)
        return data
      } )

    }
    else {
      createFile( "public/" + newImage, buffer )
      // console.log( data.img)
      data.img = newImage
      // console.log(  data.img)
      return data
    }
  }
  return new newError( "error option " )
}

export const validateExtension = ( extensionData: string ) => {
  return ( extensionData === ".jpg" ||
    extensionData === ".png" ||
    extensionData === ".bmp" ||
    extensionData === ".gif" ||
    extensionData === "webp" ||
    extensionData === "jpeg" )
}

