"use client"
import { usePathname } from 'next/navigation';

function Title() {
  let path = usePathname().split( "/" )[ 1 ].toUpperCase()
  // console.log(path)
  path     = path === 'TRAVEL' ? 'DELIVERY' : path

  return ( <a className="btn btn-ghost normal-case text-xl">{ path || "DASHBOARD" }</a> );
}

export default Title;