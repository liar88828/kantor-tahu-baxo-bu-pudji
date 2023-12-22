import { prisma, TPBank } from '@/servers/data-source/prisma/config';

import { NextRequest, NextResponse } from 'next/server';
import ValidationService from '@/lib/validation/zod/validationService';
import { vSchema } from '@/lib/validation/zod/validationSchema';
import { errorData, errorEmptyID } from '@/lib/exeption/errorResponse';
import BankData from '@/servers/data-source/prisma/Bank';
import { BankRepo } from '@/servers/data-source/repository/BankRepo';
import { Input } from '@/servers/presentation/web/Input';
import { Output } from '@/servers/presentation/web/Output';
import BankController from '@/servers/domain/controllers/Bank';
import { IControlBank } from '@/servers/domain/interface/controllers/Bank';

const c: IControlBank = new BankController
(
  new BankRepo( new BankData( prisma.bank ) ),
  new ValidationService<TPBank>( vSchema.BankSchema ),
)

export async function GET( request: NextRequest ) {

  const { id, method, } = await Input( request );
  console.log( `route api ${ method } bank` )
  if( id.includes( "all" ) ) {
    return await Output( "GET", () => c.find(), )
  }
  if( id.length > 10 ) {
    return await Output( "GET", () => c.findById( id ), )
  }
  return NextResponse.json( errorEmptyID( method ) )

}

export async function POST( request: NextRequest ) {
  const { json, method, } = await Input( request );
  console.log( `route api ${ method } bank` )
  return await Output( "POST", () => c.create( json ), )
}

export async function DELETE( request: NextRequest ) {
  const { id, method, } = await Input( request );
  console.log( `route api ${ method } bank` )
  if( id.length > 10 ) {
    return await Output( "DELETE", () => c.destroy( id ), )
  }
  return NextResponse.json( errorEmptyID( method ) )

}

export async function PUT( request: NextRequest ) {
  const { json, id, method, } = await Input( request );
  console.log( `route api ${ method } bank` )
  if( json === undefined ) {
    return NextResponse.json( errorData( method, json ), )
  }
  if( id.length > 10 ) {
    return await Output( "PUT", () => c.edit( json, id ), )
  }
  return NextResponse.json( errorEmptyID( method ) )

}

