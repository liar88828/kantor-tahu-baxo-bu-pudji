import { checkFile, checkFolder, createFile, makeFolder } from '@/lib/FileSystem/fileSystem';
import { newError } from '@/lib/exeption/errorHandler';
import fs from 'fs';
import { debugs } from '../../../config.dev';

export type TPathImg = "travel" | "produk" | string;

const saveFile = (
  filePath: string,
  buffer: Buffer,
  data: any,
) => {
  if( checkFile( filePath ) ) {
    console.info( 'file exists' );
  }
  else {
    console.error( 'file not found!' );
    createFile( filePath, buffer )
    console.error( data )
    return data
  }
}
const deleteFile = async (
  img: string
) => {
  return fs.unlink( "public/" + img, err => {
    if( err ) {
      console.error( "Delete error" )
      return "Delete error"
    }
    console.info( "Delete Success" )
    return "Delete file Success"
  } )
}

export const validateFileImage = async ( filePath: string, buffer: Buffer, data: any, image: string, newImage: string, option: string = "create", ) => {
  if( option === "create" ) {
    return saveFile( filePath, buffer, data )
  }
  else if( option === "edit" ) {
    const find = checkFile( "public/" + image )
    if( find ) {
      createFile( "public/" + newImage, buffer )

      data.img = newImage
      await deleteFile( image )
      .then( () => {} )
      return data

    }
    else {
      createFile( "public/" + newImage, buffer )
      data.img = newImage
      return data
    }
  }
  return new newError( "error option " )
}

export const validImage = async (
  buffer: Buffer,
  path: TPathImg,
  img: string,
  option: "POST" | "PUT",
  data: any
) => {
  if( debugs ) {
    console.info( img )
    console.info( option )
    console.info( data )
  }
  //check directory
  //checkFolder travel/product
  if( !checkFolder( path ) ) {
    console.info( 'folder create' );
    makeFolder( path )
  }

  // //check extension
  // const extensionData = getExtensionData( file.name )
  // console.log()
  // if( !validateExtension( extensionData ) ) {
  //   return NextResponse.json( { msg: "The extension is not allowed", } )
  // }

  if( option === "POST" ) {
    //check file exist
    console.info( checkFile( "public/" + img ) )
    if( checkFile( "public/" + img ) ) {
      throw new newError( "File is Exist" )
    }
  }

  if( option === "PUT" ) {
    if( checkFile( "public/" + img ) ) {
      createFile( "public/" + img, buffer )

      await deleteFile( img ).then( () => {} )
      return data

    }
    else {
      createFile( "public/" + img, buffer )
      return data
    }
  }

  //save image
  createFile( "public/" + img, buffer )
}
