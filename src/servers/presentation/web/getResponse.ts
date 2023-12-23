import { NextRequest } from 'next/server';
import { TMethod } from '@/entity/Utils';

export async function getResponse( request: NextRequest ): Promise<{
  json?: any,
  id: string,
  option: string,
  value: string,
  pathname: string,
  method: TMethod
}> {

  const url          = new URL( request.url );
  const method       = request.method as TMethod
  const pathname     = url.pathname
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  const option       = searchParams.get( "option" ) as string
  const value        = searchParams.get( "value" ) as string

  if( [ 'PATCH', 'PUT', 'POST' ].includes( method ) ) {
    const json = await request.json()
    return { id, option, value, pathname, method, json }
  }
  return { id, option, value, pathname, method }
}
