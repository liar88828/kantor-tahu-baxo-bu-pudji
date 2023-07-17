import { NextResponse } from 'next/server'

export async function POST( request: Request ) {

  try {
    const json = await request.json();

    // const data: ReadableStream<Uint8Array> | null = request.body
    // if( !data ) {
    //   return NextResponse.json( { msg: "Wrong data" } )
    // }
    //
    // JSON.parse( { data } )
    console.log( json )
    return NextResponse.json( { msg: "Success Create" } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}

// export async function GET(request: NextApiRequest):Promise<Response> {
//   return new Response('GET, Next.js!')
// }