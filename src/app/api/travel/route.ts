import { Input, Output, TSend } from '@/server/service/GateWay';

import { prisma, TPTravel } from '@/server/models/prisma/config';

import { NextRequest, NextResponse } from 'next/server'
import TravelController2 from '@/server/controller/Travel';
import RepoTravel from '@/server/repository/Travel';
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';

import IANewController from '@/interface/controller/IANewController';

type TYPE = TPTravel

const c: IANewController<"travel", TYPE> = new TravelController2(
  new RepoTravel( prisma.travel ),
  new ValidationService<TYPE>( new ValidationSchema().TravelSchema ),
)

export async function GET( request: NextRequest, ) {
  // console.log(headersList,"header")
  const { id, method } = await Input( request );
  if( id === "all" ) {
    return await Output( "GET", () => c.find() )
  }
  if( id.length > 10 ) {
    return await Output( "GET", () => c.findById( id ), )
  }
  return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty ID" } )

}

export async function POST( request: NextRequest ) {
  try {
    const { json } = await Input( request, );
    console.log( "post api" )
    console.log( json )
    return await Output( "POST", () => c.create( json ) )
  }
  catch ( e ) {
    return NextResponse.json( { msg: `Error POST`, error: e } )
  }
}

export async function DELETE( request: NextRequest ) {
  const { id, method }: TSend = await Input( request );
  if( id.length > 10 ) {

    return await Output( "DELETE", () => c.destroy( id ), )
  }
  return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty ID" } )

}

export async function PUT( request: NextRequest ) {

  try {
    const { json, id, method } = await Input( request );
    if( id.length > 10 ) {
      return await Output( "PUT", () => c.edit( json, id ) )
    }
    return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty ID" } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error PUT", error: e } )
  }
}
