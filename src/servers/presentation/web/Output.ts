import { TMethod } from '@/entity/Utils';
import { debugs } from '../../../../config.dev';
import { newError } from '@/lib/exeption/errorHandler';
import { TResponse } from '@/entity/client/ress/TResponse';
import { NextResponse } from 'next/server';

export async function Output( method: TMethod, control: any, ) {
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

    const controls: any = await control()
    const status        = JSON.stringify( controls )
    const code          = errorCodes[ status ] || 200; //code error / prisma
    const success       = status.includes( "require" )
    const msg           = !success && String( code ).startsWith( "2" ) ? `Success ${ method }` : `Fail ${ method }`

    if( debugs ) {
      console.debug( success )
      console.debug( `Status: ${ status }` );
      console.debug( `Code: ${ code }` );

    }

    const response: TResponse<any> = {
      msg    : msg,
      success: !success,
      data   : controls,
      code   : code,
    }
    return NextResponse.json( response );
  }

  catch ( err: unknown ) {
    const data = err instanceof Error ? err.name : err;

    if( typeof err === 'object' ) {
      console.log( "error object" )
      return NextResponse.json( err )
    }
    else {
      console.log( "error normal" )
      return NextResponse.json( {
        msg    : `Error on ${ method }`,
        error  : data,
        success: false,

      } );
    }
  }
}