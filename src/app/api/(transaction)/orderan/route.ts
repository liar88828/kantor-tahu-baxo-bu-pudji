import { isObjectEmpty } from '@/lib/ress/GateWay';
import { prisma, TPOrderan } from '@/servers/data-source/prisma/config';

import { NextRequest, NextResponse } from 'next/server'
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';
import { TMethod } from '@/entity/Utils';
import { errorEmptyID } from '@/lib/exeption/errorResponse';
import OrderanData from '@/servers/data-source/prisma/Orderan';
import { Input } from '@/servers/presentation/web/Input';
import { Output } from '@/servers/presentation/web/Output';
import OrderanController from '@/servers/domain/controllers/Orderan';
import { IControlOrderan } from '@/servers/domain/interface/controllers/Orderan';

const c: IControlOrderan = new OrderanController(
  new OrderanData( prisma.orderan ),
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
    return Output( "GET", () => c.findByStatus( id ), )
  }

  if( id.includes( "_" ) ) {
    return Output( "GET", () => c.findById( id ), )
  }

  return NextResponse.json( errorEmptyID( method ) )

}

export async function POST( request: NextRequest, ) {
  const { json, method, } = await Input( request )
  console.log( json )
  console.log( `route api ${ method } orderan` )

  return Output( "POST", () => c.create( json ), )
}

export async function PATCH( request: NextRequest, ) {
  const { id, method, json, } = await Input( request )
  console.log( `route api ${ method } orderan` )

  if( id.length > 10 ) {
    return Output( "PATCH", () => c.updateStatus( json, id ), )
  }
  return NextResponse.json( errorEmptyID( method ) )
}

export async function PUT( request: NextRequest, ) {
  const { id, json, method, } = await Input( request )
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
    const { method, id, json: array, }: {
      method: TMethod,
      id: string,
      json: string[],
      pathname: string
    } = await Input( request )
    console.log( `route api ${ method } orderan` )

    if( typeof id === "string" ) {
      if( id.length > 10 && id.includes( "_" ) ) {
        console.log( "is just string" )
        return Output( "DELETE", () => c.destroy( id ), )
      }
    }

    if( typeof array === "object" ) {
      if( Array.isArray( array ) ) {
        console.log( "is array" )
        if( array.length === 1 ) {
          console.log( "one" )
          // console.log( array )
          return Output( "DELETE", () => c.destroyOne( array[ 0 ] ) )
        }
        if( array.length > 1 ) {
          console.log( "many" )
          // console.log( array )
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
