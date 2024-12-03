"use client"
import Link from 'next/link';
import { BodyMenu } from '@/app/components/template/slidebar/top/menu/BodyMenu';

export default function Basic( { pathname }: { pathname: string } ) {
  // const pathname       = usePathname()
  const path: string[] = pathname.split( "/" )
  // console.log( path )
  return (
    <BodyMenu>
      {/*<Link*/ }
      {/*  data-test={ "link-list" }*/ }
      {/*  href={ `/${ path[ 1 ] }/list?page=1&take=10` }*/ }
      {/*  className={ `btn  ${ path.includes( "list" ) ? "info btn-disabled text-black"*/ }
      {/*                                               : " btn-success text-white" }    ` }>*/ }
      {/*  List*/ }
      {/*</Link>*/ }
      {/*<Link*/ }
      {/*  data-test={ "link-create" }*/ }
      {/*  href={ `/${ path[ 1 ] }/create` } replace={ true }*/ }
      {/*  className={ `btn  ${ path.includes( "create" ) ? " btn-disabled text-black"*/ }
      {/*                                                 : " btn-info text-white" }   ` }>*/ }
      {/*  Create*/ }
      {/*</Link>*/ }
      {/*<p className={ `btn  ${ path.includes( "edit" ) ? "  btn-disabled text-black "*/ }
      {/*                                                : " btn-primary" } text-white  ` }>*/ }
      {/*  Edit*/ }
      {/*</p>*/ }
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a
              // data-test={ "link-list" }
              // href={  `/${ path[ 1 ] }/list?page=1&take=10`  }
            >{ path[ 1 ] }</a>
          </li>
          <li>
            <Link

              data-test={ "link-list" }
              href={ `/${ path[ 1 ] }/list?page=1&take=10` }
            >list
            </Link>
          </li>

          <li>
            <a
              // data-test={ "link-list" }
              // href={ `/${ path[ 1 ] }/list?page=1&take=10` }
            >{ path[ 2 ].includes( 'list' ) ? '' : path[ 2 ] }</a>
          </li>
        </ul>
      </div>

      <Link
        data-test={ "link-create" }
        className={ `btn btn-primary float-right ${ path.includes( 'create' ) && '  btn-disabled' }` }
        href={ `/${ path[ 1 ] }/create` }
      >Create
      </Link>
    </BodyMenu>
  )
}


