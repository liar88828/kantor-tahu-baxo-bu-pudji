import { NextRequest, NextResponse } from 'next/server';

export async function getReq( request: NextRequest ) {

  const url          = new URL( request.url );
  const pathname     = url.pathname
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  const option       = searchParams.get( "option" ) as string
  const value        = searchParams.get( "value" ) as string
  // travel and product
  if( request.method === "PUT" && ( pathname.includes( "travel" ) || pathname.includes( "product" ) ) ) {
    return { id, option, value, pathname }
  }
  else
    // table
  if( request.method === "DELETE" && ( pathname.includes( "table" ) ) ) {
    const json: string[] = await request.json()
    if( Array.isArray( json ) ) {
      return { id, option, value, pathname, json }
    }

  }
  const json = request.method !== "GET" ? await request.json() : {}
  return { id, option, value, json, pathname }
  // return console.log( "error" )
}

export async function getRes( method: string, control: any, ...data: any ) {
  try {
    const controls: any = await control( ...data )
    setInterval( () => 2000 )
    // console.log(controls)
    const status = !JSON.stringify( controls ).includes( "message" )
    // if()
    // const msg    = "Record to delete does not exist."
    return NextResponse.json( {
      msg    : status ? `Success ${ method }` : `Fail ${ method }`,
      success: status,
      data   : controls,
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


