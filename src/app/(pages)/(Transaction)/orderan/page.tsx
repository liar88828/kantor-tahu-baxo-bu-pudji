import { defaultValues } from '@/lib/utils/example/orderan';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { getDataForOrderan } from '@/servers/data-source/interface/prisma/Client';
import dynamic from 'next/dynamic';

const Orderan = dynamic( () => import('@/app/components/organisme/form/Orderan'), {
  loading: () => <SkeletonCard/>,
  ssr    : false
} )

// export const dynamic    = 'force-dynamic'
export const revalidate = 10

export default async function Page() {
  const data = await getDataForOrderan()

  return (
    <Orderan id={ "" } method={ "POST" }
             defaultDataOrder={ defaultValues }
             travel={ data[ 0 ] }
             product={ data[ 1 ] }
             bank={ data[ 2 ] }
    />
  )
}

