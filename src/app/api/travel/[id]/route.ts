import { NextRequest, NextResponse } from 'next/server';
import Control                       from '@/server/controller/travel';
import { extractData }               from '@/server/service/extractForm';
import { newError }                  from '@/server/exeption/errorHandler';
import { setData }                   from '@/lib/utils/formatData';
import { validImage }                from '@/lib/validation/image';
import type { Textract }             from '@/entity/server/image';
import { revalidateTag }             from 'next/cache';
import { fileSystem }                from '@/lib/utils/fileSystem';

export async function GET(
  _: NextRequest,
  route: { params: { id: string } }
) {
  try {
    const id: string = route.params.id
    const dataControl = await Control.findById( id )
    return NextResponse.json( {
      msg: `Success GET ${ id }`,
      data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

export async function PUT( request: NextRequest, route: { params: { id: string } } ) {
  // const json       = await request.json()
  const id: string = route.params.id

  try {
    const data: Textract = await extractData( request )
    if( !data ) {
      throw new newError( "Fail Create", )
    }
    // console.log( data )
    const json: TTravel = setData( data.dataImage.file, data.json, "img/travel/" )

    const dataControl = await Control.edit( data.json, id )
    if( !dataControl ) {
      throw new newError( "Fail Create DataBase" )
    }
    // console.log( data )

    await validImage( data.dataImage.buffer, "public/img/travel", json.img ||
      "", "PUT", data )
    // console.log("test")

    // console.log( dataControl );
    // const dataControl = await Control.edit( json, id )
    return NextResponse.json( {
      msg: "Success EDIT",
      data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error EDIT", error: e } )
  }
}

export async function DELETE( _: NextRequest, route: { params: { id: string } }, ) {

  const id: string = route.params.id
  revalidateTag( 'travel/[id]' );
  try {

    const dataControl = await Control.destroy( id )
    await fileSystem( dataControl.img )
    return NextResponse
    .json( {
      msg: "Success DELETE",
      // data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error DELETE", error: e } )
  }
}