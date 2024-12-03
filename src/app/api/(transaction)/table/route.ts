import { NextRequest, NextResponse } from 'next/server'
import { errorEmptyID } from '@/lib/exeption/errorResponse';
import { getResponse } from '@/lib/ress/getResponse';
import { tryCatch } from '@/lib/exeption/tryCatch';
import { TMethod } from '@/interface/Utils';
import { isObjectEmpty } from '@/lib/utils/IsObjectEmpty';
import { orderan } from '@/servers/data-source/repository/OrderanRepo';

type TInput = {
  id: string;
  option: string;
  value: string;
  pathname: string;
  method: TMethod;
}

export async function GET( request: NextRequest, ) {
  const { id, option, method } = await getResponse( request )
  // console.log( `route api ${ method } orderan` )

  return tryCatch( method, async () => {
    // return orderan.findAll()
    if( id !== undefined ) {

      if( id === "all" ) {
        return orderan.findAll()
      }

      if( option === "table" ) {
        return orderan.findByStatus( id )
      }

      if( id.includes( "_" ) ) {
        return orderan.findOne( id )
      }
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )
  } )

}

export async function PATCH( request: NextRequest, ) {
  const { id, method, json } = await getResponse( request )
  console.log( `route api ${ method } orderan` )
  if( id !== undefined ) {

    if( id.length > 10 ) {
      return orderan.updateStatus( json, id, )
    }
  }
  return NextResponse.json( errorEmptyID( method ), { status: 404 } )
}

export async function PUT( request: NextRequest, ) {
  const { id, json, method } = await getResponse( request )
  console.log( `route api ${ method } orderan` )

  if( json === undefined ) {
    return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty data" } )
  }
  if( id !== undefined ) {

    if( id.length > 10 || !isObjectEmpty( json ) ) {
      return orderan.updateOne( json, id )
    }
  }
  return NextResponse.json( errorEmptyID( method ), { status: 404 } )

}

export async function DELETE( request: NextRequest, ) {

  // try {
  const { method, json: array }: {
    json?: string[],
    method: TMethod,
    // id?: string | string[],
  } = await getResponse( request )

  console.log( array )
  return tryCatch( method, async () => {

    // console.log( `route api ${ method } orderan` )
    // if( id !== undefined ) {
    //   if( id.length > 10 && id.includes( "_" ) ) {
    //     console.log( "is just string" )
    //     return orderan.deleteOne( id )
    //   }
    // }

    if( typeof array === "object" ) {
      // if( Array.isArray( array ) ) {
      //   console.log( "is array" )
      //   if( array.length === 1 ) {
      //     console.log( "one" )
      //     console.info( array )
      //     return orderan.deleteOne( array[ 0 ] )
      //   }
      console.log( Array.isArray( array ) )
      if( Array.isArray( array ) ) {
        // console.log( "many" )
        // console.info( array )
        const data = await orderan.destroyMany( array )
        // console.log( data )
        return data
        // }
      }
    }

    return NextResponse.json( errorEmptyID( method ) )

  } )
  // }
  // catch ( e ) {
  //   NextResponse.json( { error: e } )
  // }
}
