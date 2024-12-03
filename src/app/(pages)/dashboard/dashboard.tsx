import React from 'react';
import CardDashboard from '@/app/(pages)/dashboard/card/Dashboard';
import { ListDashboard } from '@/app/(pages)/dashboard/ListDashboard';
import { TAggregate, TLines } from '@/interface/Dashboard';
import { DonatChart } from '@/interface/prisma';
import Lines from '@/app/components/chart/line/line';
import BarVerticalServer from '@/app/components/chart/barVertical/BarVerticalServer';
import DonatServer from '@/app/components/chart/donat/DonatServer';

type TDashboard = {
  // ListDashboard: TListDashboard[],
  LineChart: TLines[],
  DonatChart: DonatChart[],
  BarVerticalChart: TAggregate[]
}

const chart = async () => await fetch( 'http://localhost:3000/api/dashboard?option=all', {
    next: { revalidate: 10 }
  }
).then( data => data.json() )

const notify = async () => await fetch( 'http://localhost:3000/api/dashboard?option=notify',
  { cache: 'no-store' } )
.then( data => data.json() )

const pesanan = async ( status: string ) => await fetch( `http://localhost:3000/api/dashboard?option=pesanan&id=${ status }`
  , { cache: 'no-cache' } )
.then( data => data.json() )

// export const revalidate = 10
export default async function ServerComponent( { id }: { id: string } ) {
  // const { data: { BarVerticalChart, DonatChart, LineChart, } }:
  //         { data: TDashboard } = await Fetch<'GET'>(
  //   {
  //     method: 'GET', option: 'all', to: 'dashboard',
  //
  //     revalidate: true, time: 10, tags: false
  //   } )

  // if( !res.ok ) {
  //   // throw new Error( 'Failed to fetch data' )
  //   return <DataEmpty/>
  //
  // }
  //
  // const { data } = await res.json()

  const [ dataChart, dataNotify, dataPesanan ] = await Promise.all( [ chart(), notify(), pesanan( id ) ] )
  // console.log(  dataNotify.data )
  // console.log(  dataNotify.data)
  return ( <div>
      <ListDashboard data={ dataNotify.data }/>
      <div className="flex gap-2 sm:flex-row flex-col w-[100%] mt-5">
        <div className=" sm:w-[70%] gap-2 flex flex-col">
          <div className="shadows bg-white rounded-3xl h-[20rem] sm:h-[100%] p-5 ">
            <Lines dataKu={ dataChart.data.LineChart }/>
          </div>
          <div className="shadows bg-white rounded-3xl h-[20rem] sm:h-[100%] p-5">
            <BarVerticalServer data={ dataChart.data.BarVerticalChart }/>
          </div>
        </div>

        <div className="flex flex-col sm:w-[30%] gap-2">
          <div className="h-[60vw] sm:h-[30vw] overflow-y-auto shadows bg-white rounded-3xl p-5">
            < CardDashboard
              success={ dataPesanan.success }
              data={ dataPesanan.data }/>
          </div>
          <div className="  sm:h-[30vw]  shadows bg-white rounded-3xl p-2">
            <DonatServer data={ dataChart.data.DonatChart }/>
          </div>
        </div>
      </div>
    </div>

  )
}

// export const product  = [
//   { nama: "Tahu Bakso Rebus", harga: 42.000 },
//   { nama: "Tahu Bakso Vakum", harga: 46.000 },
//   { nama: "Tahu Bakso Special", harga: 50.000 },
//   { nama: "Tahu Bakso Goreng", harga: 45.000 },
//   { nama: "Bandeng Presto", harga: 60.000 },
//   { nama: "Otak-Otak Bandeng", harga: 70.000 },
//   { nama: "Bakso Sapi 20", harga: 40.000 },
//   { nama: "Bakso Sapi 12", harga: 25.000 },
//   { nama: "Bakso Aneka", harga: 29.000 },
//   { nama: "Nugget", harga: 27.000 },
//   { nama: "Rolade Tahu", harga: 19.000 },
//   { nama: "Rolade Singkong", harga: 19.000 },
// ]
