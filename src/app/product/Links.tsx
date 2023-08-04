import Link from 'next/link';

export function LinkList() {
  return (
    <div className={ "  flex  flex-row gap-5 pl-5" }>
      <Link href={ "/product/list" }
            className={ "btn btn-info text-white  " }>
        List
      </Link>

    </div>
  )
}

export function LinkCreate() {
  return (
    <div className={ "  flex  flex-row gap-5 pl-5" }>
      <Link href={ "/product" } replace={ false }
            className={ "btn btn-info text-white  " }>
        Create
      </Link>

    </div>
  )
}