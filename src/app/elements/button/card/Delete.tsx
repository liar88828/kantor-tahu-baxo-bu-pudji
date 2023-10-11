"use client"
import { useRouter } from 'next/navigation';
import { notifyData } from '@/lib/utils/notif/toash';
import { GateWay } from '@/lib/utils/ress/GateWay';
import { ToModel, TRes } from '@/entity/Utils';

export function DeleteCard( { id, to, css = "btn-xs" }: { to: ToModel, id: string, css?: string } ) {
  const router = useRouter()
  // console.log( id )
  return (
    <button className={ ` btn sm:btn-sm btn-error text-white ${ css } ` }
            type={ "button" }
            onClick={ async () => {
              if( confirm( "Apakah anda yakin untuk menghapus data ini ?" ) ) {
                console.log( id )
                const res: TRes<TBank> = await GateWay<TBank>( 'DELETE', to, id, {}, )
                console.log( res )
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