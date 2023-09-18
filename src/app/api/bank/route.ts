import { Input, Output } from '@/server/service/GateWay';

import { prisma, TPBank } from '@/server/models/prisma/config';

import { NextRequest, NextResponse } from 'next/server';
import BankController from '@/server/controller/Bank';
import RepoBank from '@/server/repository/Bank';
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';
import { IControlBank2 } from '@/interface/controller/Bank';

const c: IControlBank2 = new BankController
(
  new RepoBank( prisma.bank ),
  new ValidationService<TPBank>( new ValidationSchema().BankSchema ),
)

export async function GET( request: NextRequest ) {
  const { id, method } = await Input( request );
  if( id.includes( "all" ) ) {
    return await Output( "GET", () => c.find() )
  }
  if( id.length > 10 ) {
    return await Output( "GET", () => c.findById( id ), )
  }
  return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty ID" } )

}

export async function POST( request: NextRequest ) {
  const { json } = await Input( request );
  // console.table(json)
  return await Output( "POST", () => c.create( json ) )
}

export async function DELETE( request: NextRequest ) {
  const { id, method } = await Input( request );
  // console.debug(id, method)
  if( id.length > 10 ) {
    return await Output( "DELETE", () => c.destroy( id ) )
  }
  return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty ID" } )

}

export async function PUT( request: NextRequest ) {
  const { json, id, method } = await Input( request );
  if( json === undefined ) {
    return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot data ID" } )
  }

  if( id.length > 10 ) {
    return await Output( "PUT", () => c.edit( json, id ) )
  }
  return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty ID" } )

}

