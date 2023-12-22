import { ServerComponent } from '@/app/(pages)/dashboard/dashboard';
import { statusPesanan } from '@/servers/domain/action/dashboard';

export default async function Page( { searchParams: { id } }: { searchParams: { id: string } } ) {
  console.log( id )
  const dataPesanan: any = await statusPesanan( id )
  return <div>
    <ServerComponent dataPesanan={ dataPesanan }/>
  </div>
}


