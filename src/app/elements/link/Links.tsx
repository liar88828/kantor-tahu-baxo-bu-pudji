"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LinkNavigation() {

  const pathname = usePathname()
  const path     = pathname.split( "/" )

  // console.log( path )
  return (
    <section className="overflow-x-auto mb-5 ">
      <div className={ "flex flex-row gap-5 z-50 " }>
        <Link href={ `/${ path[ 1 ] }/list` }
              className={ `btn  ${ path.includes( "list" ) ? "info btn-disabled "
                                                           : " btn-success text-white" }    ` }>
          List
        </Link>
        <Link href={ `/${ path[ 1 ] }/create` } replace={ true }
              className={ `btn  ${ path.includes( "create" ) ? " btn-disabled text-black"
                                                             : " btn-info text-white" }   ` }>
          Create
        </Link>
        <p className={ `btn  ${ path.includes( "edit" ) ? "  btn-disabled text-black "
                                                        : " btn-primary" } text-white  ` }>
          Edit
        </p>
        {/*<Link href={ `/${ path[ 1 ] }/print` } replace={ false }*/ }
        {/*      className={ `btn  ${ path.includes( "print" ) ? "  btn-disabled text-black "*/ }
        {/*                                                    : " btn-secondary" } text-white  ` }>*/ }
        {/*  Print*/ }
        {/*</Link>*/ }
      </div>
    </section>
  )
}


