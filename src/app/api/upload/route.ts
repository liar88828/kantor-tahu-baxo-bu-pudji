import fs from "fs";
import { NextResponse } from "next/server";

export async function POST( req: Request ) {
  const formData = await req.formData();

  const folderName = 'public/product/';

  if( !fs.existsSync( folderName ) ) {
    console.log( 'folder create' );
    fs.mkdirSync( folderName );
  }
  let dataArray = []
  const formDataEntryValues = Array.from( formData.values() );
  for( const formDataEntryValue of formDataEntryValues ) {
    if( typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue ) {
      const file = formDataEntryValue as unknown as Blob;

      // console.log(formDataEntryValues[0])
      dataArray.push( formDataEntryValues[ 0 ] )
      const buffer = Buffer.from( await file.arrayBuffer() );
      if( fs.existsSync( folderName + file.name ) ) {
        console.info( 'file exists' );
      }
      else {
        console.error( 'file not found!' );
        fs.writeFileSync( folderName + file.name, buffer );

      }
    }
  }
  console.log( dataArray )
  return NextResponse.json( { success: true } );
}

// const folderName = 'public/product/';
// try {
//   if( !fs.existsSync( folderName ) ) {
//     fs.mkdirSync( folderName );
//   }
//   const formDataEntryValues = Array.from( formData.values() );
//   for( const formDataEntryValue of formDataEntryValues ) {
//     if( typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue ) {
//       const file = formDataEntryValue as unknown as Blob;
//       const buffer = Buffer.from( await file.arrayBuffer() );
//
//       fs.writeFileSync( `public/product/${ file.name }`, buffer );
//     }
//   }
// }
// } catch ( err ) {
//   console.error( err );
// }
// return NextResponse.json( { success: true } );
// }
