import { NextRequest, NextResponse } from 'next/server'
import Control from '@/server/controller/orderan';

export async function tryCatch( method: string, control: any, ...data: any ) {
  try {
    const controls: any = await control( ...data )
    // console.log( controls, )
    const status        = typeof controls === "object"
    return NextResponse.json( {
      msg    : status ? `Success ${ method }` : `Fail ${ method }`,
      success: status,
      data   : status
    } );
  }
  catch ( err ) {
    console.log( err );
    return NextResponse.json( {
      msg    : `Error ${ method }`,
      error  : err,
      success: false
    } );
  }
}

export async function GET() {
  return tryCatch( "GET", Control.find(), )
}

export async function POST( request: NextRequest, ) {
  return tryCatch( "CREATE", Control.create, await request.json() )
}

export async function PATCH( request: NextRequest, ) {
  const url          = new URL( request.url );
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  const option       = searchParams.get( "option" ) as string
  const value        = searchParams.get( "value" ) as string | number
  return tryCatch( "EDIT", Control.updateOneOnly, [ id, option, value ] )
}

export async function PUT( request: NextRequest, ) {
  const url          = new URL( request.url );
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  const option       = searchParams.get( "option" ) as string
  const value        = searchParams.get( "value" ) as string | number
  return tryCatch( "EDIT", Control.updateOneOnly, id, option, value )
}

export async function DELETE( request: NextRequest, route: { params: { id: string } }
) {
  const formData            = await request.formData();
  const formDataEntryValues = Array.from( formData.values() );
  let array: string[] = JSON.parse( <string>formDataEntryValues[ 0 ] )
  return tryCatch( "DELETE", Control.deleteMany, array );
}
