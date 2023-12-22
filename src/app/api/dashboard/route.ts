import { NextRequest, NextResponse } from 'next/server'
import { errorEmptyID } from '@/lib/exeption/errorResponse';
import { Input } from '@/servers/presentation/web/Input';
import { Output } from '@/servers/presentation/web/Output';
import { dashboard } from '@/servers/data-source/prisma/Dashboard';

export async function GET( request: NextRequest ) {
  const { method, option, value } = await Input( request )

  if( option === "notify" ) {
    return Output( "GET", () => dashboard.statusNotify() )
  }

  if( option === "pesanan" ) {
    return Output( "GET", () => dashboard.statusPesanan( value ) )
  }

  if( option === "orderTahun" ) {
    return Output( "GET", () => dashboard.semuaOrderTahun() )
  }

  if( option === "productLast" ) {
    return Output( "GET", () => dashboard.semuaProductLast() )
  }

  if( option === "productNow" ) {
    return Output( "GET", () => dashboard.semuaProductNow() )
  }

  if( option === "productPerMonth" ) {
    return Output( "GET", () => dashboard.aggregateProductPerMonth() )
  }

  return NextResponse.json( errorEmptyID( method ) )

}

