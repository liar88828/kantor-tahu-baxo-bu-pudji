"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BodyMenu } from '@/app/components/molecules/menu/BodyMenu';

export default function Basic() {
  const pathname       = usePathname()
  const path: string[] = pathname.split( "/" )
  return (
    <BodyMenu>
      <Link
        data-test={ "link-list" }
        href={ `/${ path[ 1 ] }/list` }
        className={ `btn  ${ path.includes( "list" ) ? "info btn-disabled text-black"
                                                     : " btn-success text-white" }    ` }>
        List
      </Link>
      <Link
        data-test={ "link-create" }
        href={ `/${ path[ 1 ] }/create` } replace={ true }
        className={ `btn  ${ path.includes( "create" ) ? " btn-disabled text-black"
                                                       : " btn-info text-white" }   ` }>
        Create
      </Link>
      <p className={ `btn  ${ path.includes( "edit" ) ? "  btn-disabled text-black "
                                                      : " btn-primary" } text-white  ` }>
        Edit
      </p>
      {/*      className={ `btn  ${ path.includes( "print" ) ? "  btn-disabled text-black "*/ }
      {/*                                                    : " btn-secondary" } text-white  ` }>*/ }
      {/*  Print*/ }
      {/*</Link>*/ }
    </BodyMenu>
  )
}


