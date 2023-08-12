import { NextRequest, NextResponse } from 'next/server';

export async function GET( request: NextRequest ) {
  // const dataOrderan = await Control.find()// repo
  // await seed.ShowOrderan()//seed

  const url          = new URL( request.url );
  const searchParams = new URLSearchParams( url.search );
  // console.log(searchParams.)
  // const skip = searchParams.get("skip"); // Retrieves the value of the 'skip' parameter
  // const limit = searchParams.get("limit"); // Retrieves the value of the 'limit' parameter

  // console.log(skip);
  // console.log(limit);
  try {
    return NextResponse.json( {
      msg: "Success GET",
      // test: "test",
      // msg: "error GET",
      // data: dataOrderan
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

