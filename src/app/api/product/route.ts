import { NextRequest, NextResponse } from 'next/server'
import Control from '@/server/controller/Produk';
import { saveFile } from '@/server/service/image';
import { formatData } from '@/lib/utils/formatData';
import { getReq, getRes } from '@/server/service/GetRes';

export async function GET( request: NextRequest ) {
  const { id, } = await getReq( request )

  if( id ) {
    return await getRes( "GET", Control.findById, id )
  }
  if( !id ) {
    return await getRes( "GET", Control.find )
  }
}

export async function POST( request: NextRequest, ) {
  const json       = await saveFile( request, "/img/produk/", "create" )
  const formatJson = formatData( json, "produk" )
  return await getRes( "POST", Control.create, formatJson )
}

export async function DELETE( request: NextRequest ) {
  const { id, } = await getReq( request )

  if( id ) {
    return await getRes( "DELETE", Control.destroy, id )
  }
  if( !id ) {
    return NextResponse.json( {
      msg    : `Bad A Value`,
      success: false,
      data: `Please Input an ID  `,
    } );
  }
}

export async function PUT( request: NextRequest, ) {
  const { id, } = await getReq( request )

  try {
    const json        = await saveFile( request, "/img/produk/", "edit" )
    const formatJson  = formatData( json, "produk" )
    const dataControl = await Control.edit( formatJson, id )

    return NextResponse.json( {
      msg : "Success EDIT",
      data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error EDIT", error: e } )
  }
}

