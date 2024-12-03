"use client"
import { useRouter } from 'next/navigation';
import { notifyData } from '@/app/utils/notif/toash';
import { ToModel, TRes } from '@/entity/Utils';
import { TPaymentDB } from "@/entity/Bank.model";

export function DeleteCard( { id, to, css = "btn-xs" }: { to: ToModel, id: string, css?: string } ) {
  const router = useRouter()
  console.log( id )
  return (
    <button className={ ` btn sm:btn-sm btn-error text-white ${ css } ` }
            type={ "button" }
            onClick={ async () => {
              if( confirm( "Apakah anda yakin untuk menghapus data ini ?" ) ) {
                // const res: TRes<TPaymentDB> = await GateWay<TBank>( 'DELETE', to, id, {}, )
                // notifyData( res.msg )
                // if( res.msg.includes( "cess" ) ) {
                //   router.refresh()
                // }
              }
              else {
                notifyData( "batal di ubah " )

              }
            } }
    >Delete
    </button>

  )
}