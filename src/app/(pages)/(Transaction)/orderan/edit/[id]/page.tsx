import { GateWay } from '@/lib/ress/GateWay';
import { TOrder } from '@/entity/client/orderan';
import Orderan from '@/app/components/organisme/form/Orderan';
import { getDataForOrderan } from '@/servers/data-source/interface/prisma/Client';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { Suspense } from 'react';

// export const dynamic    = 'force-dynamic'
export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'
export default async function Page( { params: { id } }: { params: { id: string } } ) {
  const orderan: { msg: string, data: TOrder, } = await GateWay( 'GET', "orderan", id, )
  const data                                    = await getDataForOrderan()

  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <Orderan id={ id } method={ "PUT" }
               defaultDataOrder={ orderan.data }
               travel={ data[ 0 ] }
               product={ data[ 1 ] }
               bank={ data[ 2 ] }
      />
    </Suspense>

  )
}

