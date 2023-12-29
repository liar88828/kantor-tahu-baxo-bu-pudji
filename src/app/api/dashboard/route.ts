import { NextRequest, NextResponse } from 'next/server'
import { errorEmptyID } from '@/lib/exeption/errorResponse';
import { dashboard } from '@/servers/data-source/prisma/Dashboard';
import { tryCatch } from '@/lib/exeption/tryCatch';
import { getResponse } from '@/lib/ress/getResponse';

export async function GET( request: NextRequest ) {
  const { method, option, id } = await getResponse( request )
  // console.log( option, method )

  return tryCatch( method, async () => {
    if( option ) {

      // All
      if( option === "all" ) {
        return {
          // ListDashboard   : await dashboard.statusNotify(),
          LineChart       : await dashboard.semuaOrderTahun(),
          DonatChart      : await dashboard.semuaProductLast(),
          BarVerticalChart: await dashboard.aggregateProductPerMonth(),
        }

      }

      // ListDashboard
      if( option === "notify" ) {
        return dashboard.statusNotify()
      }

      // Card Pembeli Status
      if( option === "pesanan" ) {
        // console.log( value )
        console.log( option, id )

        return dashboard.statusPesanan( id )
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
        // console.log( 'BarVerticalChart' )
        return dashboard.aggregateProductPerMonth()
      }
    }

    return NextResponse.json( errorEmptyID( method ), { status: 500 } )

  } )

}

export async function PATCH( request: NextRequest, ) {
  const { method, id, option } = await getResponse( request )
  // console.log( `route api ${ method } dashboard` )
  // console.log('')
  return tryCatch( method, async () => {
    if( typeof id !== 'string' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( typeof option === 'string' ) {

      if( id.length > 3 ) {
        console.log( 'change status' )
        return dashboard.updateStatus( option, id )
      }
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}