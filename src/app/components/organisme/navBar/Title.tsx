"use client"
import { usePathname } from 'next/navigation';

function Title() {
  const path = usePathname().split( "/" )[ 1 ].toUpperCase()
  return ( <a className="btn btn-ghost normal-case text-xl">{ path || "DASHBOARD" }</a> );
}

export default Title;