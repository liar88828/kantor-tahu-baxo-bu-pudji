'use client'

import { useEffect } from 'react';
import { notifyData } from '@/lib/notif/toash';

export default function ErrorBoundary( {
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
} ) {
  // console.log(error.message)

  useEffect( () => {
    notifyData( error.message )
  }, [ error ] )

  return (
    <div>
      <h2 className={ 'font-bold' }>Something went wrong!</h2>
      <h3>{ error.message }</h3>
      <button onClick={ () => reset() }>Try again</button>
    </div>
  )
}