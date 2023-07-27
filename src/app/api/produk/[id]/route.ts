import { NextRequest, NextResponse } from 'next/server';
import Control from '@/server/controller/produk';

export async function GET(
  _: NextRequest,
  route: { params: { id: string } },
) {
  const id: string = route.params.id
  try {
    const dataControl = await Control.findById( id )
    return NextResponse.json( {
      msg: `Success GET by id  ${ route }`,
      data: dataControl
    } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error GET by id", error: e, } )
  }
}

export async function PUT(
  request: NextRequest,
  route: { params: { id: string } }
) {
  const json = await request.json()
  const id: string = route.params.id
  try {
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
  _: NextRequest,
  route: { params: { id: string } },
) {
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