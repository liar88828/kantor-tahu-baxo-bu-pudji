import { NextRequest, NextResponse } from 'next/server'
import { errorEmptyID } from '@/lib/exeption/errorResponse';
import { DeliveryRepo } from '@/servers/data-source/repository/DeliveryRepo';
import { tryCatch } from '@/lib/exeption/tryCatch';
import { CreateZod } from '@/lib/validation/zod/createZod';
import { UpdateZod } from '@/lib/validation/zod/updateZod';
import { getResponse } from '@/lib/ress/getResponse';

const c = new DeliveryRepo()

export async function GET( request: NextRequest, ) {
  const { id, method, take, page } = await getResponse( request )
  console.log( `route api ${ method } delivery ${ id }` )
  return tryCatch( method, async () => {
    if( page !== 0 && take !== 0 ) {
      return DeliveryRepo.findPaginate( page, take )
    }
    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id === "all" ) {
      return c.findAll()
    }
    if( id.length > 5 ) {
      return c.findOne( id )
    }
    return NextResponse.json( errorEmptyID( method ) )

  } )
}

export async function POST( request: NextRequest ) {
  const { method, json } = await getResponse( request )
  console.log( `route api ${ method } travel` )
  console.log( json )

  return tryCatch( method, async () => {
    if( json === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( json !== null && typeof json === 'object' ) {
      const data = CreateZod.DeliverySchema.parse( json )
      return c.createOne( data )
    }
  } )
}

export async function DELETE( request: NextRequest ) {
  const { id, method } = await getResponse( request );
  console.log( `route api ${ method } travel` )

  return tryCatch( method, async () => {

    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id.length > 5 ) {
      return c.deleteOne( id )
    }
    return NextResponse.json( errorEmptyID( method ) )

  } )
}

export async function PUT( request: NextRequest ) {
  const { id, method, json } = await getResponse( request )
  console.log( `route api ${ method } travel` )

  return tryCatch( method, async () => {

    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id.length > 5 ) {
      const data = UpdateZod.DeliverySchema.parse( json )
      return c.updateOne( data, id )
    }
    console.log( "error ya" )
    return NextResponse.json( errorEmptyID( method ) )

  } )
}
