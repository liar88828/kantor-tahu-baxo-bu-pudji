import { NextRequest } from 'next/server'
import { getReq, getRes } from '@/server/service/GetRes';
import { prisma } from '@/server/models/prisma/config';
//
import SemuaProdukController from '@/server/controller/SemuaProduk';
import RepoSemuaProduk from '@/server/repository/SemuaProduk';
import Validation from '@/lib/validation/schema';
import Service from '@/lib/validation/validation';
import Control from '@/server/controller/Orderan';

const c = new SemuaProdukController(
  new RepoSemuaProduk( prisma.semuaProduct ),
  new Validation(),
  Service )

export async function GET( request: NextRequest, ) {
  const { id, pathname } = await getReq( request )
  if( pathname === "/api/dashboard" && !id ) {

    return getRes( "GET", () => c.dashboard(), )
  }
}

export async function PUT( request: NextRequest, ) {
  const { json } = await getReq( request )
  return getRes( "GET", Control.status, json )
}
