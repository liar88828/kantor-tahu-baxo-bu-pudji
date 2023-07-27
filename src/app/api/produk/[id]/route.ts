import { NextRequest, NextResponse } from 'next/server';
import Control from '@/server/controller/produk';
import Service from '@/server/service/produk';

export async function GET( _: NextRequest, route: { params: { id: string } }, ) {
  const id: string = route.params.id
  try {
    const SerId = Service.findById( id )
    const dataControl = await Control.findById( SerId )
    return NextResponse.json( { msg: `Success GET by id  ${ id }`, data: dataControl } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error GET by id", error: e, } )
  }
}

export async function PUT( request: NextRequest, route: { params: { id: string } } ) {
  const json = await request.json()
  const id: string = route.params.id
  json.id = id
  const serData = Service.create( json )
  const SerId = Service.findById( id )
  try {
    const dataControl = await Control.edit( serData, SerId )
    return NextResponse.json( {
      msg: "Success EDIT",
      data: dataControl
    } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error EDIT", error: e } )
  }
}

export async function DELETE( _: NextRequest, route: { params: { id: string } },
) {
  const id: string = route.params.id
  const SerId = Service.findById( id )
  try {
    const dataControl = await Control.destroy( SerId )
    return NextResponse.json( { msg: "Success DELETE", data: dataControl } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error DELETE", error: e } )
  }
}