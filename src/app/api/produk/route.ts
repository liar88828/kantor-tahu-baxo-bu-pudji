import { NextRequest, NextResponse } from 'next/server'
import Control                       from '@/server/controller/produk';
import { saveFile }                  from '@/server/service/image';
import { formatData }                from '@/lib/utils/formatData';

export async function GET() {

  try {
    const dataControl = await Control.find()
    return NextResponse.json( { msg: "Success GET", data: dataControl } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

export async function POST( request: NextRequest, ) {
  try {

    const json        = await saveFile( request, "produk/" )
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

