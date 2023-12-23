import { NextRequest, NextResponse } from 'next/server'
import { errorEmptyID } from '@/lib/exeption/errorResponse';
import { dashboard } from '@/servers/data-source/prisma/Dashboard';
import { getResponse } from '@/servers/presentation/web/getResponse';
import { tryCatch } from '@/lib/exeption/tryCatch';

export async function GET( request: NextRequest ) {
  const { method, option, value } = await getResponse( request )
  console.log( option, method )

  return tryCatch( method, async () => {
    // console.log(option)
    // ListDashboard
    if( option === "notify" ) {
      return dashboard.statusNotify()
    }

    // Card Pembeli Status
    if( option === "pesanan" ) {
      console.log( value )
      return dashboard.statusPesanan( value )
    }
    // LineChart
    if( option === "orderTahun" ) {
      return dashboard.semuaOrderTahun()
    }
    //DonatChart
    if( option === "productLast" ) {
      return dashboard.semuaProductLast()
    }
    if( option === "productNow" ) {
      return dashboard.semuaProductNow()
    }

    // BarVerticalChart
    if( option === "productPerMonth" ) {
      console.log( 'BarVerticalChart' )
      return dashboard.aggregateProductPerMonth()
    }
    return NextResponse.json( errorEmptyID( method ), { status: 500 } )

  } )

}

