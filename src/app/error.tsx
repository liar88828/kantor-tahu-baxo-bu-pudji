'use client'

export default function ErrorBoundary( {
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
} ) {
    return (
    <div>
      <h2 className={ 'font-bold' }>Something went wrong!</h2>
      <h3>{ error.message }</h3>
      <button onClick={ () => reset() }>Try again</button>
    </div>
  )
}