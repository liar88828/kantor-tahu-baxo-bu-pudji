import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '../../../prisma/data';

export async function tryCatch( method: string, fun: any ) {
  try {
    const data = await fun()
    console.log( 'success data' )
    return NextResponse.json( { msg: `Success ${ method }`, success: true, data: data }, { status: 200 } )
  }
  catch ( e: any ) {

    if( e instanceof ZodError ) {
      console.log( e.errors )
      return NextResponse.json( {
        msg    : `Error ${ method }`,
        success: false,
        error  : e.issues,
        data   : "Data Cannot be Empty"
      }, { status: 400 } )
    }
    if( e instanceof Prisma.PrismaClientKnownRequestError ) {
      // The .code property can be accessed in a type-safe manner
      if( e.code === 'P2002' ) {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )

        return NextResponse.json( {
          msg    : `Error ${ method }`,
          success: false,
          error  : e.message,
          data   : 'the data is exists'
        }, { status: 409 } )
      }

      if( e.code === 'P2025' ) {

        return NextResponse.json( {
          msg    : `Error ${ method }`,
          success: false,
          error  : e.message,
          data   : 'the data is not found'
        }, { status: 404 } )

      }
      return NextResponse.json( {
        msg       : `Error ${ method }`,
        success   : false,
        error     : e.message,
        codePrisma: e.code
      }, { status: 500 } )

    }
    if( e instanceof Error ) {
      return NextResponse.json( { msg: `Error ${ method }`, success: false, error: e.message } )
    }
    if( e.status === 400 ) {
      return NextResponse.json( {
          msg                  : `Error ${ method }`,
          success: false, error: e.message,
          data                 : 'must be added a data'
        },
        { status: 400 } )
    }
    return NextResponse.json( { msg: `Error ${ method }`, success: false, error: e }, { status: 500 } )
  }

}
