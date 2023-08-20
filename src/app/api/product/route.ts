import { NextRequest } from 'next/server'
import Control from '@/server/controller/produk';
import { saveFile } from '@/server/service/image';
import { formatData } from '@/lib/utils/formatData';

import { tryCatch } from '@/lib/tryCatch';

// import { revalidatePath }            from 'next/cache'

export async function GET( _: NextRequest ) {
  const data = await tryCatch( "GET", Control.find )
  // console.log(data)
  return data
}

export async function POST( request: NextRequest, ) {
  // try {

  const json       = await saveFile( request, "/img/produk/", "create" )
  const formatJson = formatData( json, "produk" )
  //   const dataControl = await Control.create( formatJson )
  //   return NextResponse.json( {
  //     msg: "Success Create",
  //     // data: json
  //     data: dataControl
  //   } )
  // }
  // catch ( e ) {
  //   return NextResponse.json( { msg: "Error Create", error: e } )
  // }

  return await tryCatch( "POST", Control.create, formatJson )

}

