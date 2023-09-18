import { Input, Output } from '@/server/service/GateWay';

import { prisma, TPProduct } from '@/server/models/prisma/config';

import { NextRequest, NextResponse } from 'next/server'
import ProductController2 from '@/server/controller/Produk';
import RepoProduk from '@/server/repository/Product';
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';

import { IControlProduct2 } from '@/interface/controller/Product';

const c: IControlProduct2 = new ProductController2(
  new RepoProduk( prisma.product ),
  new ValidationService<TPProduct>( new ValidationSchema().ProductSchema ),
)

export async function GET( request: NextRequest ) {
  const { id, } = await Input( request )

  if( id === "all" ) {
    return await Output( "GET", () => c.find() )
  }

  if( id.length > 10 ) {
    return await Output( "GET", () => c.findById( id ), )
  }
  return NextResponse.json( { msg: "Error EDIT", error: "cannot empty ID" } )
}

export async function POST( request: NextRequest, ) {
  try {
    const { json } = await Input( request );
    console.info( "api POST product" )
    return await Output( "POST", () => c.create( json ) )
  }
  catch ( e ) {
    return NextResponse.json( { msg: `Error POST`, error: e } )
  }
}

export async function DELETE( request: NextRequest ) {
  const { id, method } = await Input( request )

  if( id.length > 10 ) {
    return await Output( "DELETE", () => c.destroy( id ), )
  }
  return NextResponse.json( { msg: `Error ${ method }`, error: "cannot empty ID" } )
}

export async function PUT( request: NextRequest, ) {
  try {

    const { json, id, method } = await Input( request, );
    if( id.length > 3 ) {
      return await Output( "PUT", () => c.edit( json, id ) )
    }
    return NextResponse.json( { msg: `Error ${ method }`, error: "cannot empty ID" } )

  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }

}

