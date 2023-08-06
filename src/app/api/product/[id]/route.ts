import { NextRequest, NextResponse } from 'next/server';
import Control                       from '@/server/controller/produk';
import { revalidateTag }             from 'next/cache';
import { saveFile }                  from '@/server/service/image';
import { formatData }                from '@/lib/utils/formatData';
import { log }                       from 'util';

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
  const id: string = route.params.id
  console.log( request.json() )
  try {
    const json        = await saveFile( request, "img/produk/", "edit" )
    // console.log(json)
    const formatJson  = formatData( json, "produk" )
    const dataControl = await Control.edit( formatJson, id )
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