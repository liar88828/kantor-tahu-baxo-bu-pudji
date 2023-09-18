import { NextRequest, NextResponse } from 'next/server';
import { extractData } from '@/server/service/extractForm';
import { setData, TraPro } from '@/lib/utils/formatData';
import { validImage } from '@/lib/validation/image';
import { newError } from '@/server/exeption/errorHandler';
import { debugs } from '../../../config.dev';
import { TMethod } from '@/entity/Utils';
import { fileSystem } from '@/lib/utils/fileSystem';

export type TSend = {
  method: TMethod;
  id: string;
  value: string;
  option: string;
  pathname: string
};

export async function Input( request: NextRequest ): Promise<TSend | any> {
  const url          = new URL( request.url );
  const method       = request.method as TMethod
  const pathname     = url.pathname
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  const option       = searchParams.get( "option" ) as string
  const value        = searchParams.get( "value" ) as string

  const send: TSend = { id, option, value, pathname, method }
  const withFile    = async (
    request: NextRequest,
    method: "POST" | "PUT",
    paths: string | TraPro
  ) => {

    const data: TExtract = await extractData( request )

    if( data ) {

      if( method === "PUT" ) {
        await fileSystem( data.json.img )
      }

      const jsonImage: any = setData(
        data.dataImage.file,
        data.json,
        `/img/${ paths }/`,
        paths )

      jsonImage.img = jsonImage.img?.replaceAll( "/api/", "" )
      const path    = jsonImage.img?.split( "/" )[ 2 ]

      await validImage( data.dataImage.buffer, `public/img/${ path }`, jsonImage.img || "", method, data )
      return data.json
    }
  }

  if( debugs ) {
    console.log( value, option, id )
  }

  if( method === "POST" && ( pathname.includes( "travel" ) || pathname.includes( "product" ) ) ) {
    console.info( "test POST input" )
    if( option.includes( "text" ) ) {
      return { ...send, json: await request.json() };
    }
    if( option.includes( "file" ) ) {
      const json = await withFile( request, "POST", pathname )
      return { ...send, json };

    }
  }

  // travel and product
  if( method === "PUT" && ( pathname.includes( "travel" ) || pathname.includes( "product" ) ) ) {
    console.info( "test PUT input" )
    if( option.includes( "text" ) ) {
      return { ...send, json: await request.json() };
    }

    if( option.includes( "file" ) ) {
      console.debug( "test" )
      const json = await withFile( request, "PUT", pathname )
      return { ...send, json };
    }
  }

  // table and orderan
  else if( method === "DELETE" && ( pathname.includes( "table" ) || pathname.includes( "orderan" ) ) ) {
    const json: string[] = await request.json()
    console.log( json )
    if( Array.isArray( json ) ) {
      return { ...send, json };
    }
    return { ...send };

  }

  const json = method !== "GET" ? await request.json() : {}
  return { ...send, json };
}

export async function Output( method: TMethod, control: any, ...data: any ) {
  const errorCodes: Record<string, number> = {
    "PrismaClientValidationError"  : 401,
    "PrismaClientKnownRequestError": 401,
  };

  try {
    if( debugs ) {
      console.debug( "debug : " + debugs )
      console.debug( typeof control === "object", "object" )
      console.debug( typeof control === "function", "function" )
    }
    if( typeof control === "object" ) {
      console.error( "Error must be function" )
      return new newError( "Error must be function " )
    }
    setTimeout( () => 2000 )

    const controls: any = await control( ...data )
    const status        = JSON.stringify( controls )
    const code          = errorCodes[ status ] || 200; //code error / prisma
    const success       = status.includes( "require" )
    const msg           = !success && String( code ).startsWith( "2" ) ? `Success ${ method }` : `Fail ${ method }`

    if( debugs ) {
      console.debug( success )
      console.debug( `Status: ${ status }` );
      console.debug( `Code: ${ code }` );

    }

    return NextResponse.json( {
      msg    : msg,
      success: !success,
      data   : controls,
      code   : code
    } );
  }

  catch ( err: unknown ) {
    const data = err instanceof Error ? err.name : err;

    return NextResponse.json( {
      msg    : `Error ${ method }`,
      error  : data,
      success: false,
      // code   : code,
    } );
  }
}
