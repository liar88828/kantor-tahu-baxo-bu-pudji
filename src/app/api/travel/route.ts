import { Input, Output } from '@/server/service/GateWay';

import { prisma, TPTravel } from '@/server/models/prisma/config';

import { NextRequest, NextResponse } from 'next/server'
import TravelController from '@/server/controller/Travel';
import RepoTravel from '@/server/repository/Travel';
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';
import { IControlTravel } from '@/interface/controller/Travel';
import { errorEmptyID } from '@/lib/utils/errorResponse';
import { TSend } from '@/entity/service/TSend';

type TYPE = TPTravel

const c: IControlTravel = new TravelController(
  new RepoTravel( prisma.travel ),
  new ValidationService<TYPE>( new ValidationSchema().TravelSchema ),
)
export async function GET( request: NextRequest, ) {
  const { id, method } = await Input( request );
  console.log( `route api ${ method } travel` )

  if( id === "all" ) {
    return await Output( "GET", () => c.find() )
  }
  if( id.length > 10 ) {
    return await Output( "GET", () => c.findById( id ), )
  }
  return NextResponse.json( errorEmptyID( method ) )

}

export async function POST( request: NextRequest ) {
  try {
    const { json, method } = await Input( request, );
    console.log( `route api ${ method } travel` )

    return await Output( "POST", () => c.create( json ) )
  }
  catch ( e ) {
    return NextResponse.json( {
      msg    : `Error POST`,
      success: false,
      error  : e
    } )
  }
}

export async function DELETE( request: NextRequest ) {
  const { id, method }: TSend = await Input( request );
  console.log( `route api ${ method } travel` )

  if( id.length > 10 ) {

    return await Output( "DELETE", () => c.destroy( id ), )
  }
  return NextResponse.json( errorEmptyID( method ) )

}

export async function PUT( request: NextRequest ) {

  try {
    const { json, id, method } = await Input( request );
    console.log( `route api ${ method } travel` )

    if( id.length > 10 ) {
      return await Output( "PUT", () => c.edit( json, id ) )
    }
    console.log( "error ya" )
    return NextResponse.json( errorEmptyID( method ) )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error PUT", success: false, error: e } )
  }
}
