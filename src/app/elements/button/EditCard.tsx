"use client"

import { useRouter } from 'next/navigation';

export function EditCard( { to, id }: { id: string, to: string } ) {
  const router = useRouter()
  return (
    <button className="btn btn-info  text-white"
            type={ "button" }
            onClick={ () => router.push( to + id ) }
    >Edit
    </button>

  )
}