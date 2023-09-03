import { NextRequest, NextResponse } from 'next/server'
import Control from '@/server/controller/travel';
import { extractData } from '@/server/service/extractForm';
import { setData } from '@/lib/utils/formatData';
import { newError } from '@/server/exeption/errorHandler';
import { validImage } from '@/lib/validation/image';
import type { Textract } from '@/entity/server/image';
import { getReq, getRes } from '@/server/service/GetRes';

export async function GET( request: NextRequest, ) {
  const { id } = await getReq( request );
  if( id ) {
    return await getRes( "GET", Control.findById, id )
  }
  if( !id ) {
    return await getRes( "GET", Control.find )
  }
}

export async function POST( request: Request ) {
  try {
    const data: Textract = await extractData( request )
    if( !data ) {
      return new newError( "Fail Create", )
    }

    const json: TTravel = setData( data.dataImage.file, data.json, "/img/travel/" )
    const dataControl   = await Control.create( data.json )
    if( !dataControl ) {
      return new newError( "Fail Create DataBase", )
    }
    console.log( dataControl )
    await validImage( data.dataImage.buffer, "public/img/travel",
      json.img ??
      "", "POST", data )

    return NextResponse.json( { msg: "Success Create", data: dataControl } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}

export async function DELETE( request: NextRequest ) {
  const { id } = await getReq( request );
  if( id ) {
    return await getRes( "DELETE", Control.destroy, id )
  }
  if( !id ) {
    return NextResponse.json( {
      msg    : `Bad A Value`,
      success: false,
      data   : `Please Input a ID  `,
    } );
  }
}

export async function PUT( request: NextRequest ) {
  const { id } = await getReq( request );

  try {
    const data: Textract = await extractData( request )
    if( !data ) {
      return new newError( "Fail Create", )
    }
    // console.log( data )
    const json: TTravel = setData( data.dataImage.file, data.json, "/img/travel/" )

    const dataControl = await Control.edit( data.json, id )
    if( !dataControl ) {
      return new newError( "Fail Create DataBase" )
    }

    await validImage(
      data.dataImage.buffer,
      "public/img/travel",
      json.img ?? "", "PUT", data )
    return NextResponse.json( {
      msg : "Success EDIT",
      data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error EDIT", error: e } )
  }
}
