import { Input, Output } from '@/server/service/GateWay';

import { prisma, TPProduct } from '@/server/models/prisma/config';

import { NextRequest, NextResponse } from 'next/server'
import ProductController from '@/server/controller/Produk';
import RepoProduk from '@/server/repository/Product';
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';

import { IControlProduct } from '@/interface/controller/Product';
import { errorEmptyID } from '@/lib/utils/errorResponse';

const c: IControlProduct = new ProductController(
  new RepoProduk( prisma.product ),
  new ValidationService<TPProduct>( new ValidationSchema().ProductSchema ),
)
const to                 = "product"

export async function GET( request: NextRequest ) {
  const { id, method } = await Input( request )
  console.log( `route api ${ method } product` )

  if( id === "all" ) {
    return await Output( "GET", () => c.find() )
  }

  if( id.length > 10 ) {
    return await Output( "GET", () => c.findById( id ), )
  }
  return NextResponse.json( errorEmptyID( method ) )
}

export async function POST( request: NextRequest, ) {
  try {
    const { json, method } = await Input( request );
    console.log( `route api ${ method } product` )

    console.info( "api POST product" )
    return await Output( "POST", () => c.create( json ) )
  }
  catch ( e ) {
    return NextResponse.json( { msg: `Error POST`, success: false, error: e } )
  }
}

export async function DELETE( request: NextRequest ) {
  const { id, method } = await Input( request )
  console.log( `route api ${ method } product` )

  if( id.length > 10 ) {
    return await Output( "DELETE", () => c.destroy( id ), )
  }
  return NextResponse.json( errorEmptyID( method ) )
}

export async function PUT( request: NextRequest, ) {
  try {
    const { json, id, method } = await Input( request, );
    console.log( `route api ${ method } product` )

    if( id.length > 3 ) {
      return await Output( "PUT", () => c.edit( json, id ) )
    }
    return NextResponse.json( errorEmptyID( method ) )

  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error Create", success: false, error: e } )
  }

}

