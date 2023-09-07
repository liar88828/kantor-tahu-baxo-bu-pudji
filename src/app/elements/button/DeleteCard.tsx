"use client"
import { useRouter } from 'next/navigation';
import { notifyData } from '@/app/utils/notif/toash';
import { GateWay } from '@/app/utils/ress/GateWay';

export function DeleteCard( { id }: { id: string } ) {
  const router = useRouter()
  return (
    <button className="btn btn-error text-white"
            type={ "button" }
            onClick={ async () => {
              const res = await GateWay<TBank>( 'DELETE', "bank", id, {}, )
              notifyData( res.msg )
              router.refresh()
            } }
    >Delete
    </button>

  )
}