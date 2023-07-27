import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import Control from '@/server/controller/travel';

export async function GET(
  request: NextRequest,
  route: { params: { id: string } }
) {
  try {
    const id: string = route.params.id
    const dataControl = await Control.findById( id )
    return NextResponse.json( {
      msg: `Success GET ${ id }`,
      data: dataControl
    } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

export async function PUT(
  request: NextRequest,
  route: { params: { id: string } }
) {
  const json = await request.json()
  const id: string = route.params.id
  // const url = new URL( request.url )

  try {
    // console.log( dataControl )
    // console.log( json )
    // console.log( id )
    const dataControl = await Control.edit( json, id )
    return NextResponse.json( {
      msg: "Success EDIT",
      data: dataControl
    } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error EDIT", error: e } )
  }
}

export async function DELETE(
  request: NextApiRequest,
  route: { params: { id: string } },
) {
  // const query = request.body
  // const url = request.url
  const id: string = route.params.id

  try {
    const dataControl = await Control.destroy( id )
    return NextResponse
    .json( {
      msg: "Success DELETE",
      data: dataControl
    } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error DELETE", error: e } )
  }
}