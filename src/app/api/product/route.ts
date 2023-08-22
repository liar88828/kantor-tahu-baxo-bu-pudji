import { NextRequest, NextResponse } from 'next/server'
import Control from '@/server/controller/produk';
import { saveFile } from '@/server/service/image';
import { formatData } from '@/lib/utils/formatData';
import { tryCatch } from '@/lib/tryCatch';

export async function GET( request: NextRequest ) {
  const url          = new URL( request.url );
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  if( id ) {
    return await tryCatch( "GET", Control.findById, id )
  }
  if( !id ) {
    return await tryCatch( "GET", Control.find )
  }
}

export async function POST( request: NextRequest, ) {
  const json       = await saveFile( request, "/img/produk/", "create" )
  const formatJson = formatData( json, "produk" )
  return await tryCatch( "POST", Control.create, formatJson )
}

export async function DELETE( request: NextRequest ) {

  const url          = new URL( request.url );
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  if( id ) {
    return await tryCatch( "DELETE", Control.destroy, id )
  }
  if( !id ) {
    return NextResponse.json( {
      msg    : `Bad A Value`,
      success: false,
      data   : `Please Input a ID  `,
    } );
  }
}

export async function PUT( request: NextRequest, ) {
  const url          = new URL( request.url );
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  try {
    const json        = await saveFile( request, "/img/produk/", "edit" )
    const formatJson  = formatData( json, "produk" )
    const dataControl = await Control.edit( formatJson, id )

    return NextResponse.json( {
      msg : "Success EDIT",
      data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error EDIT", error: e } )
  }
}

