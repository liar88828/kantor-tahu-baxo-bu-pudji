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
  try {
    return NextResponse.json( {
      msg : "Success Create",
      data: await Control.create( await request.json() )
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}

export async function PATCH(
  request: NextRequest,
) {
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

export async function PUT(
  request: NextRequest,
) {
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
