import {
  checkFile, checkFolder, createFile, makeFolder
}                                              from '@/lib/utils/fileSystem';
import {
  newError
}                                              from '@/server/exeption/errorHandler';
import fs                                      from 'fs';
import { getExtensionData, validateExtension } from '@/lib/utils/fileExtension';
import { NextResponse }                        from 'next/server';

const saveFile = (
  filePath: string,
  buffer: Buffer,
  data: any,
) => {
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
    // console.log( "create" )
    return saveFile( filePath, buffer, data )
  }
  else if( option === "edit" ) {
    const find = checkFile( "public/" + image )
    if( find ) {
      // console.log("find")
      createFile( "public/" + newImage, buffer )
      // console.log( data.img)

      data.img = newImage
      // console.log(  data.img)
      await deleteFile( image )
      .then( () => {} )
      return data

    }
    else {
      // console.log("not find")
      createFile( "public/" + newImage, buffer )
      // console.log( data.img)
      data.img = newImage
      // console.log(  data.img)
      return data
    }
  }
  return new newError( "error option " )
}

export const validImage = (
  buffer: Buffer,
  path: string,
  img: string
) => {

  //check directory
  if( !checkFolder( path ) ) {
    console.log( 'folder create' );
    makeFolder( path )
  }

  // //check extension
  // const extensionData = getExtensionData( file.name )
  // console.log()
  // if( !validateExtension( extensionData ) ) {
  //   return NextResponse.json( { msg: "The extension is not allowed", } )
  // }

  //check file exist
  console.log( checkFile( "public/" + img ) )
  if( checkFile( "public/" + img ) ) {
    throw new newError( "File is Exist", "Invalid file" )
  }

  //save image
  createFile( "public/" + img, buffer )
}