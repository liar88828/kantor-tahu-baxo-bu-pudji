import { defaultValues } from '@/app/utils/format/orderan';
import { ServerComponent } from '@/app/components/form/ServerComponent';

export default function Page() {
  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <ServerComponent id={ "" } defaultDataOrder={ defaultValues } method={ "POST" }/>
    </main>
  )
}
