"use client"

import { deleteDataMany, deleteDataOne } from '@/app/utils/ress/orderan';
import { notifyData } from '@/app/utils/notif/toash';
import { useRouter } from 'next/navigation';

export const DeleteTable = ( { ids }: { ids: string[], } ) => {
  const router = useRouter()

  async function deleteTable( id: string[] ) {
    if( ids.length === 1 ) {
      const res = await deleteDataOne( id );
      notifyData( res.msg )

    }
    if( id.length > 1 ) {
      // console.log( "test2" )
      const res = await deleteDataMany( id );
      notifyData( res.msg )
    }
    router.refresh()

  }

  return ( <button
      className=" btn btn-sm sm:btn-md text-white btn-error "
      onClick={ () => deleteTable( ids ) }
    >
      DELETE
    </button>
  )
}
