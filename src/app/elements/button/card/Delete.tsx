"use client"
import { useRouter } from 'next/navigation';
import { notifyData } from '@/app/utils/notif/toash';
import { GateWay } from '@/app/utils/ress/GateWay';
import { ToModel, TRes } from '@/entity/Utils';

export function DeleteCard( { id, to, css = "btn-xs" }: { to: ToModel, id: string, css?: string } ) {
  const router = useRouter()
  console.log( id )
  return (
    <button className={ ` btn sm:btn-sm btn-error text-white ${ css } ` }
            type={ "button" }
            onClick={ async () => {
              const res: TRes<TBank> = await GateWay<TBank>( 'DELETE', to, id, {}, )
              notifyData( res.msg )
              if( res.msg.includes( "cess" ) ) {
                router.refresh()
              }
            } }
    >Delete
    </button>

  )
}