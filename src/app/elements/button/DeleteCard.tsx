"use client"
import { useRouter } from 'next/navigation';
import { notifyData } from '@/app/utils/notif/toash';
import { GateWay, ToModel } from '@/app/utils/ress/GateWay';

export function DeleteCard( { id, to, css = "btn-xs" }: { to: ToModel, id: string, css?: string } ) {
  const router = useRouter()
  return (
    <button className={ ` btn  sm:btn-sm btn-error text-white ${ css } ` }
            type={ "button" }
            onClick={ async () => {
              const res = await GateWay<TBank>( 'DELETE', to, id, {}, )
              notifyData( res.msg )
              router.refresh()
            } }
    >Delete
    </button>

  )
}