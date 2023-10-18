import { Input, Output } from '@/servers/presentation/web/Apis';

import { prisma, TPTravel } from '@/servers/data-source/prisma/config';

import { NextRequest, NextResponse } from 'next/server'
import TravelController from '@/servers/presentation/controller/Travel';
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';
import { IControlTravel } from '@/servers/interface/controller/Travel';
import { errorEmptyID } from '@/lib/exeption/errorResponse';
import { TSend } from '@/entity/servers/service/TSend';
import TravelData from '@/servers/data-source/prisma/Travel';
import { DeliveryRepo } from '@/servers/repository/DeliveryRepo';

type TYPE = TPTravel

const c: IControlTravel = new TravelController(
  new DeliveryRepo( new TravelData( prisma.travel ) ),
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
