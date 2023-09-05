import { getReq, getRes } from '@/server/service/GetRes';
import { prisma } from '@/server/models/prisma/config';
import Service from '@/lib/validation/validation';
import { NextRequest } from 'next/server'
import RepoSemuaProduk from '@/server/repository/SemuaProduk';
import SemuaProdukController from '@/server/controller/SemuaProduk';
import Validation from '@/lib/validation/schema';
import type { IControlSemuaProduk } from '@/interface/controller/SemuaProduk';

const c: IControlSemuaProduk = new SemuaProdukController(
  new RepoSemuaProduk( prisma.semuaProduct ),
  new Validation(),
  Service )

export async function GET( request: NextRequest ) {
  const { id, option } = await getReq( request );
  if( option.includes( "dashboard" ) ) {
    return await getRes( "GET", () => c.dashboard() )
  }
  if( id.includes( "all" ) ) {
    return await getRes( "GET", () => c.find() )
  }
  if( id ) {
    return await getRes( "GET", () => c.findById( id ), )
  }
}

export async function POST( request: NextRequest, ) {
  const { json, option, id } = await getReq( request );
  if( option === "text" ) {
    const res = () => c.createText( json, id )
    return await getRes( "POST", res, )
  }
  const res = () => c.create( json, id )
  return await getRes( "POST", res, )
}

export async function DELETE( request: NextRequest ) {
  // console.log("test")
  const { id } = await getReq( request );
  const res    = () => c.destroy( id )
  return await getRes( "DELETE", res )
}

export async function PUT( request: NextRequest ) {
  const { json, id } = await getReq( request );
  const res          = () => c.edit( json, id )
  return await getRes( "PUT", res )
}
