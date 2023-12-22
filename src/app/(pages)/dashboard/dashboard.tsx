import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import dynamic from 'next/dynamic';
import { getPrisma, statusNotify } from '@/servers/domain/action/dashboard';
import { ListDashboard } from '@/app/components/molecules/list/ListDashboard';
import { TListCard } from '@/app/components/organisme/card/Dashboard';

// const HorizontalCard = dynamic( () => import('@/app/components/card/HorizontalCard'), {
//   loading: () => <SkeletonLine/>
// } )
const Lines = dynamic( () => import('@/app/components/organisme/chart/line'), {
  loading: () => <SkeletonCard/>, ssr: false
} )
const Donat = dynamic( () => import('@/app/components/organisme/chart/donat'), {
  loading: () => <SkeletonCard/>, ssr: false
} )
const BarVertical = dynamic( () => import('@/app/components/organisme/chart/Bar'), {
  loading: () => <SkeletonCard/>, ssr: false
} )
const CardDashboard = dynamic( () => import('@/app/components/organisme/card/Dashboard'), {
  loading: () => <SkeletonCard/>,
  ssr    : true
} )

// export const dynamic    = 'force-dynamic'
export const revalidate = 10
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

export async function ServerComponent( { dataPesanan }: { dataPesanan: TListCard[] } ) {
  const data = await getPrisma()

  const dataStatus = await statusNotify()

  return ( <div className={ " flex gap-2 flex-col p-2 sm:p-4 " }>
      <ListDashboard data={ dataStatus }/>
      <div className="flex gap-2 sm:flex-row flex-col w-[100%]">
        <div className=" sm:w-[70%] gap-2 flex flex-col">
          <div className="border border-black bg-white rounded-3xl h-[20rem] sm:h-[100%] ">
            <Lines dataKu={ data.semuaOrderTahun }/>
          </div>
          <div className="border border-black bg-white rounded-3xl h-[20rem] sm:h-[100%] ">
            <BarVertical aggregate={ data.aggregate }/>
          </div>
        </div>

        <div className="flex flex-col sm:w-[30%] gap-2">
          <div
            className="h-[60vw] sm:h-[30vw] overflow-y-auto border border-black bg-white rounded-3xl p-2">
            <CardDashboard notifyMonth={ dataPesanan }/>
          </div>
          <div className="  sm:h-[30vw]   border border-black bg-white rounded-3xl p-2">
            <Donat dataKu={ data.semuaProductNow }/>
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
