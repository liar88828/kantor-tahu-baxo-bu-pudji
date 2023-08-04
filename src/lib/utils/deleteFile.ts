import fs from 'fs';

export const deleteFile = ( filePath: string ) => {
  return fs.unlinkSync( filePath )
}

export const checkFolder = ( folderName: string ) => {
  return fs.existsSync( folderName )
}

export const makeFolder = ( folderName: string ) => {
  fs.mkdirSync( folderName );
}
export const checkFile  = ( filePath: string ) => {
  return fs.existsSync( filePath )
}
export const createFile = ( filePath: string, buffer: Buffer ) => {
  fs.writeFileSync( filePath, buffer );
}