import { NextRequest, NextResponse } from 'next/server';
import Control from '@/server/controller/orderan';
import { tryCatch } from '@/app/api/orderan/route';

export async function GET( _: NextRequest, route: { params: { id: string[] } } ) {
  const id: string[] = route.params.id
  const getData      = await Control.findById( id[ 0 ] )
  // console.log( getData )
  try {
    if( id[ 0 ] !== "table" ) {
      return NextResponse.json( {
        msg : `Success GET ${ id }`,
        data: getData
      } )
    }
    else {
      return NextResponse.json( {
        msg : `Success GET ${ id }`,
        data: await Control.findByStatus( id[ 1 ] ),

      } )
    }
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

export async function PUT( request: NextRequest, route: { params: { id: string } } ) {
  const json       = await request.json()
  const id: string = route.params.id
  // console.log(json)
  // console.log(id)
  return tryCatch( "EDIT", Control.edit, json, id[ 0 ] )

}

export async function DELETE( _: NextRequest, route: { params: { id: string } },
) {
  const array: string = route.params.id
  const id            = array[ 0 ]
  return tryCatch( "DELETE", Control.destroy, id )
}