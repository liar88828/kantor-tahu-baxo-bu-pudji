import { TMethod } from '@/entity/Utils';
import { TEntity } from '@/interface/repository/AbstractRepository';
import { TFrom } from '@/app/components/form/Form';

import { GateWay } from '@/app/utils/ress/GateWay';
import { notifyData } from '@/app/utils/notif/toash';
import { useRouter } from 'next/navigation';

export function EFButton<T extends TEntity>( { method, to, id, data, }: {
  method: TMethod,
  to: "travel" | "product" | "bank",
  id: string,
  data: TFrom<T>
} ) {
  const router = useRouter()

  const sendData = async () => {
    const res = await GateWay( method, to, id, data, )
    if( res ) {
      notifyData<TFrom<T>>( res.msg )
      if( res.msg.toString().includes( "cess" ) ) {
        router.prefetch( "/bank/list" )
        router.replace( "/bank/list" )
      }
      else {
        notifyData<TFrom<T>>( res.msg )
      }
    }
  }

  return (
    <button type="submit" onClick={ () => sendData() }
            className={ `bg-${ !open ? "success" : "warning" } p-2 rounded-md text-white` }>
      { method === "POST" ? "SIMPAN" : "EDIT" }
    </button>
  );
}

