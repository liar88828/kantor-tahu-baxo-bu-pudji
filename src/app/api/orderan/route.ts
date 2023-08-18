import { NextRequest } from 'next/server'
import Control from '@/server/controller/orderan';
import { tryCatch } from '@/app/api/orderan/tryCatch';

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

export async function DELETE( request: NextRequest, route: {
    params: {
      id: string
    }
  }
) {
  const formData            = await request.formData();
  const formDataEntryValues = Array.from( formData.values() );
  let array: string[] = JSON.parse( <string>formDataEntryValues[ 0 ] )
  return tryCatch( "DELETE", Control.deleteMany, array );
}
