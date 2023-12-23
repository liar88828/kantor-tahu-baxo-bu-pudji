import { statusWarna } from '@/app/style/status';
import Link from 'next/link';
import { ReactNode } from 'react';

export function LinkNavbar( { title, children, href, totalStatus }: {
  children: ReactNode,
  title: string,
  href: string,
  totalStatus: number
} ) {
  return <label htmlFor="my-drawer"
                className={ "static card card-compact flex text-white  w-[47%] sm:w-[31%]" +
                  " md:w-[22%] px-2" +
                  " sm:px-2" +
                  " md:px-4 h-[60%]" +
                  " my-[.2rem] " + statusWarna( title ) }>
    <div className="card-body flex-row justify-between flex flex-wrap">

      <div className={ " card-title " }>
        { children }
        <div>{ totalStatus }</div>
      </div>

      <div className={ " card-actions " }>
        <Link href={ href }>
          <button className={ " btn btn-sm flex flex-row items-center whitespace-nowrap" }>
            { title.replaceAll( "Di ", "" ) }
          </button>
        </Link>
      </div>
    </div>

  </label>;
}