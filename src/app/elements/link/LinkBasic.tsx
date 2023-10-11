"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavBody } from '@/app/elements/link/NavBody';

export default function LinkBasic() {
  const pathname = usePathname()
  const path     = pathname.split( "/" )
  return (

    <NavBody>
      <Link href={ `/${ path[ 1 ] }/list` }
            className={ `btn  ${ path.includes( "list" ) ? "info btn-disabled text-black"
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
    </NavBody>
  )
}


