import { NextRequest } from 'next/server'
import Control from '@/server/controller/Orderan';
import { getReq, getRes } from '@/server/service/GetRes';

export async function GET( request: NextRequest, ) {
  const { id, option, value, pathname } = await getReq( request )

  if( option === "table" ) {
    return getRes( "GET", Control.findByStatus, id )
  }
  if( id && !option && !value ) {
    return getRes( "GET", Control.findOne, id )
  }

  if( pathname === "/api/orderan" && !id ) {
    return getRes( "GET", Control.find, )
  }
}

export async function POST( request: NextRequest, ) {
  const json = await request.json()
  // console.log( json )
  return getRes( "CREATE", Control.create, json )
}

export async function PATCH( request: NextRequest, ) {
  const { id, option, value } = await getReq( request )

  return getRes( "EDIT", Control.updateOneOnly, [ id, option, value ] )
}

export async function PUT( request: NextRequest, ) {
  const { id, option, value } = await getReq( request )

  return getRes( "EDIT", Control.updateOneOnly, id, option, value )
}

export async function DELETE( request: NextRequest, ) {
  const { json } = await getReq( request )
  console.log( json )
  if( Array.isArray( json ) ) {
    if( json ) {
      return getRes( "DELETE", Control.destroy, json[ 0 ] )
    }
    if( json ) {
      // const formData            = await request.formData();
      // const formDataEntryValues = Array.from( formData.values() );
      // let array: string[]       = JSON.parse( <string>formDataEntryValues[ 0 ] )
      return getRes( "DELETE", Control.deleteMany, json );
    }
  }
}
