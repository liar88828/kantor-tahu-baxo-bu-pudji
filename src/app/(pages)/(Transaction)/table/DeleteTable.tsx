"use client"

import { notifyData } from '@/lib/notif/toash';
import { useRouter } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';

export const DeleteTable = ( { ids }: { ids: string[], } ) => {
  const router = useRouter()

  async function deleteTable( id: string[] ) {
    if( confirm( `Apakah anda yakin untuk Menghapus data ini ?` ) ) {

      // if( ids.length === 1 ) {
      //   // console.log( "one" )
      //   // console.log( ids )
      //   // const res = await Fetch( { to: "table", method: "DELETE", id } )
      //
      //   const res = await fetch( `http://localhost:3000/api/orderan?id=${ ids }`, {
      //     method : 'DELETE',
      //     headers: { 'Content-Type': "application/json" }
      //   } )
      //   console.log( res )
      //   if( !res.ok ) {
      //
      //     notifyData( 'fail delete data' )
      //   }
      //   else {
      //     notifyData( 'success delete data' )
      //   }
      //
      // }

      // if( id.length > 1 ) {
      // console.log( "many" )
      // console.log( ids )
      // console.log(ids)
      const res = await fetch( `http://localhost:3000/api/table`, {
        method : 'DELETE',
        body   : JSON.stringify( ids ),
        headers: { 'Content-Type': "application/json" }
      } )

      // console.log( res )
      if( !res.ok ) {
        throw new Error( 'fail delete data' )
      }
      const data = await res.json()

      // console.log(data)
      if( data.success ) {
        notifyData( 'success delete data' )
        // revalidatePath('/','page')
        router.refresh()

      }
      else notifyData( 'fail delete data' )
      // }
    }
  }

  return ( <button
      data-test={ 'button-delete' }
      className=" btn btn-sm sm:btn-md text-white btn-error "
      onClick={ () => deleteTable( ids ) }>
      DELETE
    </button>
  )
}
