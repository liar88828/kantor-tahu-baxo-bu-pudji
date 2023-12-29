import { NextRequest, NextResponse } from 'next/server'
import { errorEmptyID } from '@/lib/exeption/errorResponse';
import { orderan } from '@/servers/data-source/repository/OrderanRepo';
import { tryCatch } from '@/lib/exeption/tryCatch';
import { CreateZod } from '@/lib/validation/zod/createZod';
import { UpdateZod } from '@/lib/validation/zod/updateZod';
import { getResponse } from '@/lib/ress/getResponse';
import { isObjectEmpty } from '@/lib/utils/IsObjectEmpty';

export async function GET( request: NextRequest, ) {
  const { method, id, option } = await getResponse( request )
  // console.log( `route api ${ method } orderan` )
  // console.log( method, id, pathname, option )
  return tryCatch( method, async () => {

    if( id !== undefined && option !== undefined ) {
      if( option === "table" ) {
        return orderan.findByStatus( id )
      }
    }

    if( option !== undefined ) {
      if( option === "orderan" ) {
        console.log( 'orderan' )
        return orderan.getDataForOrderan()
      }
    }

    if( id !== undefined ) {
      if( id.includes( "_" ) ) {
        return orderan.findOne( id )
      }
    }

    if( option === "table" && id === "all" ) {
      return orderan.findAll()
    }

    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function POST( request: NextRequest, ) {
  const { method, json } = await getResponse( request )
  console.log( `route api ${ method } orderan` )

  return tryCatch( method, async () => {
    if( json === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( json !== null && typeof json === 'object' ) {
      const data = CreateZod.OrderanSchema.parse( json )
      return orderan.createOne( data )
    }
    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function PATCH( request: NextRequest, ) {
  const { method, json, id } = await getResponse( request )
  console.log( `route api ${ method } orderan` )

  return tryCatch( method, async () => {
    if( typeof id === 'string' ) {

      if( id === '' ) {
        throw { message: 'Bad Request', status: 400 }
      }

      // if( id.length > 4 ) {
      //   return orderan.updateStatus( option, id )
      // }

    }
    if( json === undefined ) {
      return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty data" } )
    }
    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function PUT( request: NextRequest, ) {
  const { method, json, id } = await getResponse( request )
  // console.log( `route api ${ method } orderan` )
  return tryCatch( method, async () => {

    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }

    if( json === undefined ) {
      return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty data" } )
    }
    if( id !== undefined ) {

      if( id.length > 5 || !isObjectEmpty( json ) ) {
        const data = UpdateZod.OrderanSchema.parse( json )
        const res  = await orderan.updateOne( data, id )
        // console.log( res )
        return res
      }
      return NextResponse.json( errorEmptyID( method ), { status: 400 } )
    }
  } )
}

export async function DELETE( request: NextRequest, ) {
  const {
          method,
          json: array
        } = await getResponse( request )
  // console.log( `route api ${ method } product ${ id }` )
  // console.log( array )
  // return array
  return tryCatch( method, async () => {
    // if( typeof id === "string" ) {
    //   if( id.includes( "_" ) ) {
    //     // console.log( "is just string" )
    //     return orderan.deleteOne( id )
    //   }
    // }
    if( Array.isArray( array ) ) {
      return { message: 'Bad Request', status: 400 }
    }
    // if( typeof array === "object" ) {
    //   if( Array.isArray( array ) ) {
    //     if( array.length === 1 ) {
    //       console.log( "one" )
    //       return orderan.deleteOne( array[ 0 ] )
    //     }
    if( array.length > 1 ) {
      // console.log( "many" )
      return orderan.destroyMany( array )
      // }
      // }
    }

    //
    // return () => ( errorEmptyID( method ), { status: 400 } )

  } )
}
