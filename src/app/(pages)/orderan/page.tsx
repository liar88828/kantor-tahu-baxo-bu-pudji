import { defaultValues } from '@/app/utils/format/orderan';
import { SComponent } from '@/app/components/form/Orderan/SComponent';
import { Layout } from '@/app/elements/layout/Layout';

export const dynamic    = 'force-dynamic'
export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

// default component
export default function Page() {
  return (
    <Layout navs={ "complex" }>
      <SComponent id={ "" }
                  defaultDataOrder={ defaultValues }
                  method={ "POST" }/>
    </Layout>
  )
}

