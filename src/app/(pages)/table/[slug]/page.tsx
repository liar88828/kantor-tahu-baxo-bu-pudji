import { GateWay } from '@/lib/utils/ress/GateWay';
import { TableOrder } from '@/app/components/table/Table';

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

  const data: TDataRes<TOrderServer[]> = await GateWay( 'GET', "table", id, "", "table", "cache" )
  return ( <TableOrder dataOrderan={ data }/>
  )
}
