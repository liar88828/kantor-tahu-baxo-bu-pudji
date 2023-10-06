"use client"
import Link from 'next/link'
import { useParams } from 'next/navigation';

export default function Custom404(errors:any) {
  console.log(errors)
  // @ts-ignore
  const { not_found }: { not_found: string } = useParams()

  const path = not_found.split( "/" )[ 1 ]
  return (
    <div className={ "  mt-10 ml-10  py-[10%]    items-center card card-compact w-[80%] bg-base-100 shadow-xl" }>
      <div className="card-body">
        <h2 className={ "card-title uppercase" }>The id
          <span className="btn bg-red-200">{ path } </span>
        </h2>
        <h2 className="card-title"> Not Found</h2>
        <p className={ "flex text-xl" }>Could not find requested resource</p>
        <div className="card-actions">
          <Link href="/" className={ "flex text-xl btn btn-error  text-white  " }>Return Home</Link>
        </div>
        {/*<button onClick={ () => reset() }>Try again</button>*/}

      </div>
    </div>
  )
}