import { NextRequest, NextResponse } from 'next/server'
import Control from '@/server/controller/orderan';
import { dataOrderan } from '@/app/utils/example/data/dataOrderan';

// const seed = new Seed()

export async function GET() {
  // const dataOrderan = await Control.find()// repo
  // await seed.ShowOrderan()//seed

  try {
    return NextResponse.json( {
      msg: "Success GET",
      // test: "test",
      // msg: "error GET",
      data: dataOrderan
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

export async function POST( request: NextRequest, ) {
  const data = await Control.create( await request.json() )
  // console.log( data )
  try {
    return NextResponse.json( {
      msg    : typeof data === "object" ? "Success Create" : "Success Create",
      success: typeof data === "object",
      data   : data,

    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}

export async function PATCH( request: NextRequest, ) {
  const url          = new URL( request.url );
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  const option       = searchParams.get( "option" ) as string
  const value        = searchParams.get( "value" ) as string | number
  try {
    // console.log(id)
    const data = await Control.updateOneOnly( id, option, value )
    // const dataControl = await Control.edit( json, id )
    return NextResponse.json( {
      msg    : typeof data === "object" ? "Success Create" : "Success Create",
      success: typeof data === "object",
      // data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error EDIT", error: e } )
  }
}

export async function PUT( request: NextRequest, ) {
  const url          = new URL( request.url );
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  const option       = searchParams.get( "option" ) as string
  const value        = searchParams.get( "value" ) as string | number
  try {
    // console.log(id)
    const dataControl = await Control.updateOneOnly( id, option, value )
    // const dataControl = await Control.edit( json, id )
    return NextResponse.json( {
      msg: "Success EDIT",
      // data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error EDIT", error: e } )
  }
}

export async function DELETE(
  request: NextRequest,
  route: { params: { id: string } }
) {
  const formData            = await request.formData();
  const formDataEntryValues = Array.from( formData.values() );

  // console.log( request )
  const arrays = () => {
    for( const formDataEntryValue of formDataEntryValues ) {
      return JSON.parse( <string>formDataEntryValue )
    }
  }
  // console.log( arrays() )
  // const data ="asdasd"
  const data = await Control.deleteMany( arrays() )
  // console.log(data)

  try {
    return NextResponse.json( {
      success: typeof data === "object",
      msg    : typeof data === "object" ? "Success Delete" : "Fail Delete",
      data
    } );
  }
  catch ( err ) {
    console.log( err );
    return NextResponse.json( { message: err, success: false } );
  }

}
