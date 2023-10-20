"use client"

import { useRouter } from 'next/navigation';
import { ToModel } from '@/entity/Utils';

export function EditCard(
  { to, id, css = "btn-xs", name = "" }:
    { id: string, to: ToModel, css?: string, name: string }
) {
  const router = useRouter()
  return (
    <button
      data-test={ "edit-" + name }
      className={ ` btn sm:btn-sm btn-info text-white ${ css } ` }
      type={ "button" }
      onClick={ () => {
        // router.prefetch(`/${ to }/edit/` + id)
        router.replace( `/${ to }/edit/` + id )
        // router.push( `/${ to }/edit/` + id )
      } }
    >Edit
    </button>

  )
}