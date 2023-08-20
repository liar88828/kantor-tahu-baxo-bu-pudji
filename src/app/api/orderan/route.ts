import { NextRequest } from 'next/server'
import Control from '@/server/controller/orderan';
import { tryCatch } from '@/lib/tryCatch';

export async function GET( request: NextRequest, ) {
  const url          = new URL( request.url );
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  const option       = searchParams.get( "option" ) as string
  const value        = searchParams.get( "value" ) as string | number

  if( option === "table" ) {
    return tryCatch( "GET", Control.findByStatus, id )
  }
  if( id && !option && !value ) {
    return tryCatch( "GET", Control.findOne, id )
  }

  if( url.pathname === "/api/orderan" && !id ) {
    return tryCatch( "GET", Control.find, )
  }
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

export async function DELETE( request: NextRequest, ) {
  const url          = new URL( request.url );
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  console.log( id )
  if( id ) {
    return tryCatch( "DELETE", Control.destroy, id )
  }
  if( !id ) {
    const formData            = await request.formData();
    const formDataEntryValues = Array.from( formData.values() );
    let array: string[]       = JSON.parse( <string>formDataEntryValues[ 0 ] )
    return tryCatch( "DELETE", Control.deleteMany, array );
  }
}
