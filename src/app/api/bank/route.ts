import { NextRequest, NextResponse } from 'next/server';
import { errorEmptyID } from '@/lib/exeption/errorResponse';
import { BankRepo } from '@/servers/data-source/repository/BankRepo';
import { tryCatch } from '@/lib/exeption/tryCatch';
import { CreateZod } from '@/lib/validation/zod/createZod';
import { UpdateZod } from '@/lib/validation/zod/updateZod';
import { getResponse } from '@/lib/ress/getResponse';

const c = new BankRepo()

export async function GET( request: NextRequest ) {
  const { id, method, page, take } = await getResponse( request )
  // console.log( `route api ${ method } bank` )

  // console.table( { page, take } )
  return await tryCatch( method, async () => {

    if( page !== 0 && take !== 0 ) {
      // console.log( 'pagenate' )
      // console.log( page, take )

      return BankRepo.findPaginate( page, take )
    }
    if( id.includes( "all" ) ) {
      console.log( 'find all' )
      return c.findAll()
    }
    if( id.length > 5 ) {
      console.log( `one ${ id }` )
      return c.findOne( id )
    }
    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )
  } )
}

export async function POST( request: NextRequest ) {
  const { method, json } = await getResponse( request )
  console.log( `route api ${ method } bank` )

  return tryCatch( method, async () => {
    if( json === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( json !== null && typeof json === 'object' ) {

      const data = CreateZod.BankSchema.parse( json )
      return c.createOne( data )
    }
    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )

}

export async function DELETE( request: NextRequest ) {
  const { id, method } = await getResponse( request )
  console.log( `route api ${ method } bank` )

  return tryCatch( method, async () => {
    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id.length > 2 ) {
      return c.deleteOne( id )
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function PUT( request: NextRequest ) {
  const { id, method, json } = await getResponse( request )
  console.log( `route api ${ method } bank` )

  return tryCatch( method, async () => {

    if( id === '' || json === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }

    if( id.length > 5 ) {
      const data = UpdateZod.BankSchema.parse( json )
      return c.updateOne( data, id )
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}