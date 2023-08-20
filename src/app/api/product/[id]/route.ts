import { NextRequest, NextResponse } from 'next/server';
import Control from '@/server/controller/produk';
import { saveFile } from '@/server/service/image';
import { formatData } from '@/lib/utils/formatData';
import { tryCatch } from '@/lib/tryCatch';

export async function GET( _: NextRequest, route: {
  params: { id: string }
  },
) {
  const id: string = route.params.id

  return tryCatch( "GET", Control.findById, id )
}

export async function PUT( request: NextRequest, route: {
  params: { id: string }
} ) {
  const id: string = route.params.id
  try {
    const json        = await saveFile( request, "/img/produk/", "edit" )
    const formatJson  = formatData( json, "produk" )
    console.log( formatJson, id )

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

export async function DELETE( _: NextRequest, route: {
    params: { id: string }
  },
) {
  return tryCatch( "DELETE", Control.destroy, route.params.id )

}