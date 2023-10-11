import { defaultValues } from '@/lib/utils/example/orderan';
import { SkeletonCard } from '@/app/components/handling/SkeletonCard';
import { Suspense } from 'react';
import { getDataForOrderan } from '@/servers/data-source/interface/prisma/Client';
import { Orderan } from '@/app/components/form/Orderan';

// export const dynamic    = 'force-dynamic'
export const revalidate = 10

export default async function Page() {
  const data = await getDataForOrderan()
  console.log( data[ 1 ] )
  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <Orderan id={ "" } method={ "POST" }
                  defaultDataOrder={ defaultValues }
               travel={ data[ 0 ] }
               product={ data[ 1 ] }
               bank={ data[ 2 ] }
      />
    </Suspense>
  )
}

