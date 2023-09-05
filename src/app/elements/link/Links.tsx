import Link from 'next/link';

export function LinkNavigation( { path }: {
  path: string[]
} ) {
  // console.log(path)
  return (
    <div className={ "flex flex-row gap-5 pl-5" }>
      <Link href={ `/${ path[ 1 ] }/list` }
            className={ `btn  ${ path.includes( "list" ) ? "info btn-disabled "
                                                         : " btn-info text-white" }    ` }>
        List
      </Link>
      <Link href={ `/${ path[ 1 ] }/create` } replace={ false }
            className={ `btn  ${ path.includes( "create" ) ? " btn-disabled text-black"
                                                           : " btn-info text-white" }   ` }>
        Create
      </Link>
      <p className={ `btn  ${ path.includes( "edit" ) ? "  btn-disabled text-black "
                                                      : " btn-info  " } text-white  ` }>
        Edit
      </p>
      <Link href={ `/${ path[ 1 ] }/print` } replace={ false }
            className={ `btn  ${ path.includes( "print" ) ? "  btn-disabled text-black "
                                                          : " btn-info  " } text-white  ` }>
        Print
      </Link>
    </div>
  )
}


