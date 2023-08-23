import { NextRequest } from 'next/server'
import Control from '@/server/controller/orderan';
import { tryCatch } from '@/lib/tryCatch';

export async function GET( request: NextRequest, ) {
  const url          = new URL( request.url );
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  const option       = searchParams.get( "option" ) as string
  const value        = searchParams.get( "value" ) as string | number

  if( url.pathname === "/api/dashboard" && !id ) {
    return tryCatch( "GET", Control.findDashboard, )
  }
}
