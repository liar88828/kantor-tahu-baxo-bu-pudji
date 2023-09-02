import { NextRequest } from 'next/server';
import { getReq, getRes } from '@/server/service/GetRes';
import { prisma } from '@/server/models/prisma/config';
import { BankRepository } from '@/server/repository/bank';

const bankPrisma = new BankRepository( prisma.bank )

export async function GET( request: NextRequest ) {
  const { id, option, value, pathname } = await getReq( request )
  // // const dataOrderan = await Control.find()// repo
  // // await seed.ShowOrderan()//seed
  //
  // const url          = new URL( request.url );
  // const searchParams = new URLSearchParams( url.search );
  // // console.log(searchParams.)
  // // const skip = searchParams.get("skip"); // Retrieves the value of the 'skip' parameter
  // // const limit = searchParams.get("limit"); // Retrieves the value of the 'limit' parameter
  //
  // console.log( url );
  // console.log( searchParams );
  // try {
  //   return NextResponse.json( {
  //     msg: "Success GET",
  //     // test: "test",
  //     // msg: "error GET",
  //     // data: dataOrderan
  //   } )
  // }
  // catch ( e ) {
  //   return NextResponse.json( { msg: "Error GET", error: e } )
  // }

  return await getRes( "GET", () => bankPrisma.findAll() )
}

export async function POST( request: NextRequest ) {
  const { json } = await getReq( request );
  return await getRes( "POST", () => bankPrisma.createOne( json ) )
}

