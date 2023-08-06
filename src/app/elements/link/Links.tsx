import Link from 'next/link';

export function LinkProduct( { path }: { path: string } ) {
  // console.log(path)
  return (
    <div className={ "  flex  flex-row gap-5 pl-5" }>
      <Link href={ "/product/list" }
            className={ `btn  ${ path === "list" ? "info btn-disabled "
                                                 : " btn-info text-white" }    ` }>
        List
      </Link>
      <Link href={ "/product" } replace={ false }
            className={ `btn${ path === "product" ? " btn-disabled text-black"
                                                  : " btn-info text-white" }   ` }>
        Create
      </Link>
      <p className={ `btn  ${ path === "edit" ? "  btn-disabled text-black "
                                              : " btn-info  " } text-white  ` }>
        Edit
      </p>
    </div>
  )
}

export function LinkTravel( { path }: { path: string } ) {
  return (
    <div className={ "  flex  flex-row gap-5 pl-5" }>
      <Link href={ "/travel/list" }
            className={ `btn  ${ path === "list" ? "info btn-disabled "
                                                 : " btn-info text-white" }    ` }>
        List
      </Link>
      <Link href={ "/travel" } replace={ false }
            className={ `btn${ path === "travel" ? " btn-disabled text-black"
                                                 : " btn-info text-white" }   ` }>
        Create
      </Link>
      <p className={ `btn  ${ path === "edit" ? "  btn-disabled text-black "
                                              : " btn-info  " } text-white  ` }>
        Edit
      </p>
    </div>
  )
}

