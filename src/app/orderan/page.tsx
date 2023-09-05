import { defaultValues } from '@/app/utils/format/orderan';
import { LinkTable } from '@/app/elements/link/LinkTable';
import { SComponent } from '@/app/components/form/Orderan/SComponent';

export const revalidate = 10
export const runtime    = 'nodejs'

// default component
export default function Page() {
  return ( <main className="flex p-3 sm:p-6  z-50 bg-green-50 gap-3 flex-col">
      <div className=" overflow-x-auto pb-2">
        <LinkTable slug={ "orderan" }/>
        <SComponent id={ "" }
                    defaultDataOrder={ defaultValues }
                    method={ "POST" }/>
      </div>
    </main>
  )
}

