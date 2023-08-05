import { checkFile, createFile } from '@/lib/utils/fileSystem';

export const validateFileImage = ( filePath: string, buffer: Buffer, data: any ) => {
  if( checkFile( filePath ) ) {
    console.log( 'file exists' );
  }
  else {
    console.log( 'file not found!' );
    // const filePath = folderName + file.name
    createFile( filePath, buffer )
    // console.log( data )
    return data
  }
}

export const validateExtension = ( extensionData: string ) => {
  return ( extensionData === ".jpg" ||
    extensionData === ".png" ||
    extensionData === ".bmp" ||
    extensionData === ".gif" ||
    extensionData === "webp" ||
    extensionData === "jpeg" )
}

