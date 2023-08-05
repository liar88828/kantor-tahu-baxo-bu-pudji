import { NextRequest, NextResponse } from 'next/server';
import Control                       from '@/server/controller/produk';
import { revalidateTag }             from 'next/cache';

export async function GET( _: NextRequest, route: {
  params: { id: string }
}, ) {
  const id: string = route.params.id
  try {
    const dataControl = await Control.findById( id )

    return NextResponse.json( {
      msg: `Success GET by id  ${ id }`, data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error GET by id", error: e, } )
  }
}

export async function PUT( request: NextRequest, route: {
  params: { id: string }
} ) {
  const json       = await request.json()
  const id: string = route.params.id
  json.id          = id

  try {
    const dataControl = await Control.edit( json, id )
    return NextResponse.json( {
      msg: "Success EDIT",
      data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error EDIT", error: e } )
  }
}

export async function DELETE( request: NextRequest, route: {
    params: { id: string }
  },
) {
  const id: string = route.params.id
  // const tag = request.nextUrl.searchParams
  // console.log(tag)
  // revalidateTag("product/list/"+id)
  revalidateTag( 'product/[id]' );
  try {
    await Control.destroy( id )
    return NextResponse.json( {
      msg: "Success DELETE",
      // revalidated: true,

    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error DELETE", error: e } )
  }
}