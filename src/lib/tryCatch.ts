import { NextResponse } from 'next/server';

export async function tryCatch( method: string, control: any, ...data: any ) {
  try {
    const controls: any = await control( ...data )
    // console.log( controls, )
    setTimeout( () => 2000 )
    const status = typeof controls === "object"
    return NextResponse.json( {
      msg    : status ? `Success ${ method }` : `Fail ${ method }`,
      success: status,
      data   : controls,

    } );
  }
  catch ( err ) {
    console.log( err );
    return NextResponse.json( {
      msg    : `Error ${ method }`,
      error  : err,
      success: false
    } );
  }
}