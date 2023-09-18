import { Input, Output } from '@/server/service/GateWay';
import { isObjectEmpty } from '@/app/utils/ress/GateWay';
import { prisma, TPOrderan } from '@/server/models/prisma/config';

import { NextRequest, NextResponse } from 'next/server'
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';
import RepoOrderan from '@/server/repository/Orderan';
import OrderanController from '@/server/controller/Orderan';

import { IControlOrderan2 } from '@/interface/controller/Orderan';
import { TMethod } from '@/entity/Utils';

const c: IControlOrderan2 = new OrderanController(
  new RepoOrderan( prisma.orderan ),
  new ValidationService<TPOrderan>( new ValidationSchema().OrderanSchema ),
)

type TInput = {
  id: string;
  option: string;
  value: string;
  pathname: string;
  method: string;
}

export async function GET( request: NextRequest, ) {
  const { id, option, pathname, method }: TInput = await Input( request )

  if( !pathname.includes( "table" ) && id === "all" ) {
    return Output( "GET", () => c.find(), )
  }

  if( option === "table" ) {
    return Output( "GET", () => c.findByStatus( id ) )
  }

  if( id.includes( "_" ) ) {

    console.log( "--test-----" )
    console.log( id )
    console.log( "-------" )

    return Output( "GET", () => c.findById( id ) )
  }

  return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty ID" } )

}

export async function POST( request: NextRequest, ) {
  const { json } = await Input( request )
  return Output( "POST", () => c.create( json ), )
}

export async function PATCH( request: NextRequest, ) {
  const { id, method, json } = await Input( request )
  if( id.length > 10 ) {
    return Output( "PATCH", () => c.status( json, id ), )
  }
  return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty ID" } )
}

export async function PUT( request: NextRequest, ) {
  const { id, json, method } = await Input( request )
  if( json === undefined ) {
    return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty data" } )
  }

  if( id.length > 10 || !isObjectEmpty( json ) ) {
    return Output( "PUT", () => c.edit( json, id ), )
  }
  return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty ID" } )

}

export async function DELETE( request: NextRequest, ) {
  const { method, id, json: array }: { method: TMethod, id: string, json: string[] } = await Input( request )

  if( id.length > 10 ) {
    return Output( "DELETE", () => c.destroy( id ) )
  }

  if( array.length === 1 ) {
    return Output( "DELETE", () => c.destroy( array[ 0 ] ) )
  }

  if( array.length > 1 ) {
    return Output( "DELETE", () => c.deleteMany( array ) )
  }

  return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty ID" } )

}
