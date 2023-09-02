import { getDataByStatus } from '@/app/utils/ress/orderan';
import { TableOrder } from '@/app/components/table/Table';

export async function ServerComponent( { path }: {
  path: string
} ) {
  const data = await getDataByStatus( path )
  return ( <TableOrder dataOrderan={ data }/> )

}