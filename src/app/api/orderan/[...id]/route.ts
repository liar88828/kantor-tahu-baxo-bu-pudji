import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import Control from '@/server/controller/orderan';

export async function GET(
  _: NextRequest,
  route: { params: { id: string[] } }
) {
  // console.log( route )
  const id: string[] = route.params.id
  // console.log(route)
  try {
    if( id[ 0 ] !== "table" ) {
      return NextResponse.json( {
        msg : `Success GET ${ id }`,
        data       : await Control.findById( id[ 0 ] ),
        revalidated: true,

      } )
    }
    else {
      return NextResponse.json( {
        msg : `Success GET ${ id }`,
        data       : await Control.findByStatus( id[ 1 ] ),
        revalidated: true,

      } )
    }
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

export async function PUT(
  request: NextRequest,
  route: { params: { id: string } }
) {
  const json       = await request.json()
  const id: string = route.params.id
  try {
    // console.log(id)
    const dataControl = await Control.edit( json, id )
    return NextResponse.json( {
      msg        : "Success EDIT",
      data       : dataControl,
      revalidated: true,
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error EDIT", error: e } )
  }
}

export async function DELETE( _: NextRequest, route: { params: { id: string[] } },
) {
  const array: string[] = route.params.id
  // console.log(_.nextUrl.pathname)

  try {
    const id = array[ 0 ].replaceAll( "_", "/" )
    // const dataControl = "asdasd"
    // console.log("test")
    const dataControl = await Control.destroy( id )
    return NextResponse
    .json( {
      msg        : "Success DELETE",
      revalidated: true,

      // data: dataControl,
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error DELETE", error: e } )
  }
}