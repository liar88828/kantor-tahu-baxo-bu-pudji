import { isObjectEmpty } from '@/lib/ress/GateWay';
import { NextRequest, NextResponse } from 'next/server'
import { errorEmptyID } from '@/lib/exeption/errorResponse';
import { OrderanRepo } from '@/servers/data-source/repository/OrderanRepo';
import { getResponse } from '@/servers/presentation/web/getResponse';
import { tryCatch } from '@/lib/exeption/tryCatch';
import { CreateZod } from '@/lib/validation/zod/createZod';
import { UpdateZod } from '@/lib/validation/zod/updateZod';

const c = new OrderanRepo()

export async function GET( request: NextRequest, ) {
  const { method, id, pathname, option } = await getResponse( request )
  console.log( `route api ${ method } orderan` )

  return tryCatch( method, async () => {

    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( !pathname.includes( "table" ) && id === "all" ) {
      return c.findAll()
    }
    if( id.includes( "_" ) ) {
      return c.findOne( id )
    }
    if( option === "table" ) {
      return c.findByStatus( id )
    }
    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function POST( request: NextRequest, ) {
  const { method, json } = await getResponse( request )
  // console.log( `route api ${ method } orderan` )
  console.log( json )

  return tryCatch( method, async () => {
    if( json === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( json !== null && typeof json === 'object' ) {
      const data = CreateZod.OrderanSchema.parse( json )
      return c.createOne( data )
    }
    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function PATCH( request: NextRequest, ) {
  const { method, json, id } = await getResponse( request )
  console.log( `route api ${ method } orderan` )

  return tryCatch( method, async () => {

    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( json === undefined ) {
      return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty data" } )
    }
    if( id.length > 5 ) {
      return c.updateStatus( json, id )
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function PUT( request: NextRequest, ) {
  const { method, json, id } = await getResponse( request )
  console.log( `route api ${ method } orderan` )

  return tryCatch( method, async () => {

    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }

    if( json === undefined ) {
      return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty data" } )
    }

    if( id.length > 5 || !isObjectEmpty( json ) ) {
      const data = UpdateZod.OrderanSchema.parse( json )
      return c.updateOne( data, id )
    }
    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function DELETE( request: NextRequest, ) {
  const { id, method, json: array } = await getResponse( request )
  console.log( `route api ${ method } product ${ id }` )

  return tryCatch( method, async () => {
    if( typeof id === "string" ) {
      if( id.length > 5 && id.includes( "_" ) ) {
        console.log( "is just string" )
        return c.deleteOne( id )
      }
    }

    if( typeof array === "object" ) {
      if( Array.isArray( array ) ) {
        if( array.length === 1 ) {
          console.log( "one" )
          return c.deleteOne( array[ 0 ] )
        }
        if( array.length > 1 ) {
          console.log( "many" )
          return c.destroyMany( array )
        }
      }
    }

    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}
