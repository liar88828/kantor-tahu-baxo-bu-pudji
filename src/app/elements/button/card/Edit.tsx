"use client"

import { useRouter } from 'next/navigation';
import { ToModel } from '@/entity/Utils';


export function EditCard( { to, id, css = "btn-xs" }: { id: string, to: ToModel, css?: string } ) {
  const router = useRouter()
  return (
    <button className={ ` btn sm:btn-sm btn-info text-white ${ css } ` }
            type={ "button" }
            onClick={ () => router.push( `/${ to }/edit/` + id ) }
    >Edit
    </button>

  )
}