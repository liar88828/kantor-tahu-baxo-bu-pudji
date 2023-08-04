import { NextRequest, NextResponse } from 'next/server'
import Control                       from '@/server/controller/produk';
import { saveFile }                  from '@/server/service/image';
import { formatData }                from '@/lib/utils/formatData';
import { revalidatePath }            from 'next/cache'

export async function GET( request: NextRequest ) {

  try {
    const path = request.nextUrl.searchParams
    console.log( path, "path" )
    // revalidatePath( path )
    const dataControl = await Control.find()
    return NextResponse.json( {
      msg        : "Success GET",
      data       : dataControl,
      revalidated: true,
      now        : Date.now()
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e, } )
  }
}

export async function POST( request: NextRequest, ) {
  try {

    const json = await saveFile( request, "img/produk/" )
    const formatJson  = formatData( json, "produk" )
    const dataControl = await Control.create( formatJson )
    return NextResponse.json( {
      msg: "Success Create",
      // data: json
      data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}

