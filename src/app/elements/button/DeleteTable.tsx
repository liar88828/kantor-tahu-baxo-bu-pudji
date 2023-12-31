"use client"

import { notifyData } from '@/app/utils/notif/toash';
import { useRouter } from 'next/navigation';
import { sendData } from '@/app/utils/ress/SendApi';

export const DeleteTable = ( { ids }: { ids: string[], } ) => {
  const router = useRouter()

  async function deleteTable( id: string[] ) {
    if( confirm( `Apakah anda yakin untuk Menghapus data ini ?` ) ) {

      if( ids.length === 1 ) {
        console.log( "one" )
        console.log( ids )
        const res = await sendData( "table", "DELETE", id[ 0 ] )
        notifyData( res.msg )

      }
      if( id.length > 1 ) {
        console.log( "many" )
        console.log( ids )
        const res = await sendData( "table", "DELETE", "", "", id, )
        notifyData( res.msg )
      }
      router.refresh()
    }
  }

  return ( <button
      className=" btn btn-sm sm:btn-md text-white btn-error "
      onClick={ () => deleteTable( ids ) }>
      DELETE
    </button>
  )
}
