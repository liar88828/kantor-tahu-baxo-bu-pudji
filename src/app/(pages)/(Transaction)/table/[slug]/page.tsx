import { TableOrder } from '@/app/components/organisme/table/Table';
import { Fetch } from '@/lib/utils/ress/SendApi';

// export const dynamic    = 'force-dynamic'
export const revalidate = 0

// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

type TDataRes<T> = {
  msg: string,
  data: T
};
export default async function Page( { params: { slug } }: { params: { slug: string } } ) {
  // console.log(slug)
  const id = slug.replaceAll( "%20", " " )
  // console.table( { slug,id  })

  const data: TDataRes<TOrderServer[]> = await Fetch( "table", 'GET', id, "table", )
  return ( <TableOrder dataOrderan={ data }/>
  )
}
