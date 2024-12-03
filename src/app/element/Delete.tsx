'use client'
import { useRouter } from 'next/navigation';
import { notifyData } from '@/lib/notif/toash';
import { Fetch } from '@/lib/ress/SendApi';
import { ToModel, TRes } from '@/interface/Utils';

export function DeleteCard( {
  id,
  to,
  css = "btn-xs",
  name = ""
}: { to: ToModel, id: string, css?: string, name: string } ) {
  const router = useRouter()
  // console.log( id )
  return (
    <button
      data-test={ "delete-" + name }
      className={ ` btn sm:btn-sm btn-error text-white ${ css } ` }
      type={ "button" }
      onClick={ async () => {
        if( confirm( "Apakah anda yakin untuk menghapus data ini ?" ) ) {
          // console.log( id )
          const res: TRes<TBank> = await Fetch( {
            method: 'DELETE',
            to    : to,
            id,
          } )
          // console.log( res )
          notifyData( res.msg )
          if( res.msg.includes( "cess" ) ) {
            router.refresh()
          }
        }
        else {
          notifyData( "batal di ubah " )
        }
      } }
    >Delete
    </button>

  )
}