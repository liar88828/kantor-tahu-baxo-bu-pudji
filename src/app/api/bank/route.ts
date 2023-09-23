import { Input, Output } from '@/server/service/GateWay';

import { prisma, TPBank } from '@/server/models/prisma/config';

import { NextRequest, NextResponse } from 'next/server';
import BankController from '@/server/controller/Bank';
import RepoBank from '@/server/repository/Bank';
import ValidationService from '@/lib/validation/zod/validationService';
import { vSchema } from '@/lib/validation/zod/validationSchema';
import { IControlBank } from '@/interface/controller/Bank';
import { errorData, errorEmptyID } from '@/lib/utils/errorResponse';

const c: IControlBank = new BankController
(
  new RepoBank( prisma.bank ),
  new ValidationService<TPBank>( vSchema.BankSchema ),
)
const to              = "bank"

export async function GET( request: NextRequest ) {

  const { id, method, } = await Input( request );
  console.log( `route api ${ method } bank` )
  if( id.includes( "all" ) ) {
    return await Output( "GET", () => c.find() )
  }
  if( id.length > 10 ) {
    return await Output( "GET", () => c.findById( id ), )
  }
  return NextResponse.json( errorEmptyID( method ) )

}

export async function POST( request: NextRequest ) {
  const { json, method } = await Input( request );
  console.log( `route api ${ method } bank` )
  return await Output( "POST", () => c.create( json ) )
}

export async function DELETE( request: NextRequest ) {
  const { id, method } = await Input( request );
  console.log( `route api ${ method } bank` )
  if( id.length > 10 ) {
    return await Output( "DELETE", () => c.destroy( id ) )
  }
  return NextResponse.json( errorEmptyID( method ) )

}

export async function PUT( request: NextRequest ) {
  const { json, id, method } = await Input( request );
  console.log( `route api ${ method } bank` )
  if( json === undefined ) {
    return NextResponse.json( errorData( method, json ) )
  }

  if( id.length > 10 ) {
    return await Output( "PUT", () => c.edit( json, id ) )
  }
  return NextResponse.json( errorEmptyID( method ) )

}

