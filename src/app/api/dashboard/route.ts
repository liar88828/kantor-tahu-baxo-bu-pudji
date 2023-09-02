import { NextRequest } from 'next/server'
import Control from '@/server/controller/orderan';
import { getReq, getRes } from '@/server/service/GetRes';

export async function GET( request: NextRequest, ) {
  const { id, pathname } = await getReq( request )
  if( pathname === "/api/dashboard" && !id ) {
    return getRes( "GET", Control.findDashboard, )
  }
}
