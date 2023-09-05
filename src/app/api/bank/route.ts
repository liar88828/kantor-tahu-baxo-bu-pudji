import BankController from '@/server/controller/Bank';

import Validation from '@/lib/validation/schema';
import { NextRequest } from 'next/server';
import { prisma } from '@/server/models/prisma/config';
import { getReq, getRes } from '@/server/service/GetRes';
import Service from '@/lib/validation/validation';
import { IControlBank } from '@/interface/controller/Bank';
import { BankRepository } from '@/server/repository/Bank';

const c: IControlBank = new BankController(
  new BankRepository( prisma.bank ),
  new Validation(),
  Service )

export async function GET( request: NextRequest ) {
  const { id } = await getReq( request );
  if( id.includes( "all" ) ) {
    return await getRes( "GET", () => c.find() )
  }
  if( id ) {
    return await getRes( "GET", () => c.findById( id ), )
  }
}

export async function POST( request: NextRequest ) {
  const { json } = await getReq( request );
  const res      = () => c.create( json )
  return await getRes( "POST", res, )
}

export async function DELETE( request: NextRequest ) {
  // console.log("test")
  const { id } = await getReq( request );
  const res    = () => c.destroy( id )
  return await getRes( "DELETE", res )
}

export async function PUT( request: NextRequest ) {
  const { json, id } = await getReq( request );
  const res          = () => c.edit( json, id )
  return await getRes( "PUT", res )
}
