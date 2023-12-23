import { NextRequest, NextResponse } from 'next/server'
import { errorEmptyID } from '@/lib/exeption/errorResponse';
import { ProductRepo } from '@/servers/data-source/repository/ProductRepo';
import { tryCatch } from '@/lib/exeption/tryCatch';
import { CreateZod } from '@/lib/validation/zod/createZod';
import { UpdateZod } from '@/lib/validation/zod/updateZod';
import { getResponse } from '@/servers/presentation/web/getResponse';

const c = new ProductRepo()

export async function GET( request: NextRequest ) {
  const { id, method, page, take } = await getResponse( request )
  console.log( `route api ${ method } product` )
  return tryCatch( method, async () => {
    if( page !== 0 && take !== 0 ) {
      return ProductRepo.findPaginate( page, take )
    }
    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id === "all" ) {
      return c.findAll()
    }
    if( id.length >= 5 ) {
      return c.findOne( id )
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )

}

export async function POST( request: NextRequest, ) {
  const { method, json } = await getResponse( request )
  console.log( `route api ${ method } product` )

  return tryCatch( method, async () => {

    if( json === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( json !== null && typeof json === 'object' ) {
      const data = CreateZod.ProductSchema.parse( json )
      return c.createOne( data )
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function DELETE( request: NextRequest ) {
  const { id, method } = await getResponse( request )
  console.log( `route api ${ method } product ${ id }` )

  return tryCatch( method, async () => {

    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id.length > 5 ) {
      return c.deleteOne( id )
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )
  } )
}

export async function PUT( request: NextRequest, ) {
  const { method, json, id } = await getResponse( request )
  console.log( `route api ${ method } product` )

  return tryCatch( method, async () => {

    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id.length > 5 ) {
      const data = UpdateZod.ProductSchema.parse( json )
      return c.updateOne( data, id )
    }

    return NextResponse.json( errorEmptyID( method ) )
  } )
}




