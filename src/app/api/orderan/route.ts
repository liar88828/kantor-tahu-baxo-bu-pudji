import { NextResponse } from 'next/server'
import { TOrder } from '@/entity/orderan';
import { post } from '@/server/controller/orderan';
import { TOrderSuccess } from '@/entity/server/orderan';

const orderan: TOrder["orang"] = {
  penerima: "asda",
  hpPenerima: "sadadsa",
  alamatPenerima: "dasdas",
  pengirim: "sadsad",
  hpPengirim: "asdads"
}

export async function POST( request: Request ) {
  const json = await request.json();
  try {

    // const data = get( json )
    const data: TOrderSuccess = await post( orderan )
    return NextResponse.json( { msg: "Success Create", valid: data.valid, success: data.success } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}

export async function GET( request: Request ) {
  const json = await request.json();
  try {
    return NextResponse.json( { msg: "Success Create" } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}

export async function EDIT( request: Request ) {
  const json = await request.json();
  try {
    return NextResponse.json( { msg: "Success Create" } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}

export async function DELETE( request: Request ) {
  const json = await request.json();
  try {

    console.log( json )
    return NextResponse.json( { msg: "Success Create" } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}

// export async function GET(request: NextApiRequest):Promise<Response> {
//   return new Response('GET, Next.js!')
// }