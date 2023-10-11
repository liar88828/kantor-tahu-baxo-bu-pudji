import { errorDataZod } from '@/lib/exeption/errorResponse';
import { _test_ } from '../../../config.dev';

export function getExtensionData( name?: string ) {
  console.log( "get extension data" )
  if( typeof name === "string" ) {
    console.log( name )
    if( name.length >= 4 ) {
      return "." + name.split( "." ).pop()
      // return name.slice( -4 );
    }
  }
  if( _test_ ) {
    console.error( "error " )
    return errorDataZod( { name: name }, )
  }
  console.error( "error getExtensionData" )
  throw errorDataZod( { name: name }, )
}

export function addDot( name?: string, extensionData?: string, ) {
  console.error( "add ." )
  console.error( typeof name === 'string' && typeof extensionData === 'string' )
  if( typeof name === 'string' && typeof extensionData === 'string' ) {
    return ( extensionData === "webp" || extensionData === "jpeg" )
           ? name + "." + extensionData
           : name + extensionData;
  }
  if( _test_ ) {
    return errorDataZod( { name: name, extension: extensionData } )
  }
  console.error( "error addDot" )
  throw errorDataZod( { name: name, extension: extensionData } )
}

export const validateExtension = ( extensionData?: string ) => {
  if( typeof extensionData !== "string" ) {
    console.error( "error validate extension" );
    if( _test_ ) {
      console.error( `return error ${ extensionData }` );
      return errorDataZod( { extension: extensionData } );
    }
    console.error( "error validateExtension" );
    throw errorDataZod( { extension: extensionData } );
  }

  const allowedExtensions = [ ".jpg", ".png", ".bmp", ".gif", "webp", "jpeg", ".webp", ".jpeg" ];
  const isValidExtension  = allowedExtensions.includes( extensionData );

  console.log( "validate extension", isValidExtension );
  console.log( extensionData );

  return isValidExtension;
};