import { defaultValues } from '@/app/utils/format/orderan';
import { LinkTable } from '@/app/elements/link/LinkTable';
import { SComponent } from '@/app/components/form/Orderan/SComponent';
import { Suspense } from 'react';

export const revalidate = 10
export const runtime    = 'nodejs'

// default component
export default function Page() {
  return (
    <main className="flex p-3 sm:p-6  z-50 bg-green-50 gap-3 flex-col">
      <LinkTable slug={ "orderan" }/>
      <Suspense fallback={ <div>Loading...</div> }>
        <SComponent id={ "" }
                    defaultDataOrder={ defaultValues }
                    method={ "POST" }/>
      </Suspense>
    </main>
  )
}

