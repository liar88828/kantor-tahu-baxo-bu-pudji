import { Input, Output } from '@/server/service/GateWay';
import { isObjectEmpty } from '@/app/utils/ress/GateWay';
import { prisma, TPOrderan } from '@/server/models/prisma/config';

import { NextRequest, NextResponse } from 'next/server'
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';
import RepoOrderan from '@/server/repository/Orderan';
import OrderanController from '@/server/controller/Orderan';

import { IControlOrderan } from '@/interface/controller/Orderan';
import { TMethod } from '@/entity/Utils';
import { errorEmptyID } from '@/lib/utils/errorResponse';

const c: IControlOrderan = new OrderanController(
  new RepoOrderan( prisma.orderan ),
  new ValidationService<TPOrderan>( new ValidationSchema().OrderanSchema ),
)

type TInput = {
  id: string;
  option: string;
  value: string;
  pathname: string;
  method: TMethod;
}

const to = "orderan"

export async function GET( request: NextRequest, ) {
  const { id, option, pathname, method }: TInput = await Input( request )
  console.log( `route api ${ method } orderan` )

  if( !pathname.includes( "table" ) && id === "all" ) {
    return Output( "GET", () => c.find(), )
  }

  if( option === "table" ) {
    return Output( "GET", () => c.findByStatus( id ) )
  }

  if( id.includes( "_" ) ) {
    return Output( "GET", () => c.findById( id ) )
  }

  return NextResponse.json( errorEmptyID( method ) )

}

export async function PATCH( request: NextRequest, ) {
  const { id, method, json } = await Input( request )
  console.log( `route api ${ method } orderan` )

  if( id.length > 10 ) {
    return Output( "PATCH", () => c.updateStatus( json, id ), )
  }
  return NextResponse.json( errorEmptyID( method ) )
}

export async function PUT( request: NextRequest, ) {
  const { id, json, method } = await Input( request )
  console.log( `route api ${ method } orderan` )

  if( json === undefined ) {
    return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty data" } )
  }

  if( id.length > 10 || !isObjectEmpty( json ) ) {
    return Output( "PUT", () => c.edit( json, id ), )
  }
  return NextResponse.json( errorEmptyID( method ) )

}

export async function DELETE( request: NextRequest, ) {

  try {
    const { method, id, json: array }: { method: TMethod, id: string, json: string[] } = await Input( request )
    console.log( `route api ${ method } orderan` )

    if( typeof id === "string" ) {
      if( id.length > 10 && id.includes( "_" ) ) {
        console.log( "is just string" )
        return Output( "DELETE", () => c.destroy( id ) )
      }
    }

    if( typeof array === "object" ) {
      if( Array.isArray( array ) ) {
        console.log( "is array" )
        if( array.length === 1 ) {
          console.log( "one" )
          console.log( array )
          return Output( "DELETE", () => c.destroyOne( array[ 0 ] ) )
        }
        if( array.length > 1 ) {
          console.log( "many" )
          console.log( array )
          return Output( "DELETE", () => c.deleteMany( array ) )
        }
      }
    }

    return NextResponse.json( errorEmptyID( method ) )

  }
  catch ( e ) {
    NextResponse.json( { error: e } )
  }
}
