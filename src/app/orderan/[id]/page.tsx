"use client"
import React, { Suspense, use } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { TOrder } from '@/entity/client/orderan';
import { defaultData } from '@/app/utils/ress/orderan';
import { FormOrder } from '@/app/components/form/Orderan';
import { globalQueryClient } from '@/lib/utils/queryClient';

export default function Page() {
  const { id }   = useParams()
  const pathname = usePathname()
  const path     = pathname.split( "/" ).pop() as string
  const slug     = id && path ? path : ""
  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <Suspense fallback={ <div>Loading...</div> }>
        <ServerComponents id={ slug }/>
      </Suspense>
    </main>
  )
}
const queryClient = globalQueryClient()

export function ServerComponents( { id }: { id: string } ) {
  const data: TOrder = use( queryClient(
    "Orderan",
    () => defaultData( id ) as Promise<TOrder>
  ) )

  return <FormOrder id={ id } method={ "PUT" } defaultDataOrder={ data }/>
}

// "use client"
// import React, { Suspense, use } from 'react';
// import { useParams, usePathname } from 'next/navigation';
// import { defaultData } from '@/app/utils/ress/orderan';
// import { FormOrder } from '@/app/components/form/Orderan';
//
// export default function Page() {
//   const { id }   = useParams()
//   const pathname = usePathname()
//   const path     = pathname.split( "/" ).pop() as string
//   const slug     = id && path ? path : ""
//   const data     = use( defaultData( id ) )
//   console.log( data )
//   return (
//     <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
//       <Suspense fallback={ <div>Loading...</div> }>
//         <FormOrder id={ id } method={ "PUT" } defaultDataOrder={ data }/>
//       </Suspense>
//     </main>
//   )
// }
//
