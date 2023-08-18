'use client'

import Link from 'next/link';
import { Status } from '@/app/style/status';

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

export function LinkTable( { path, slug }: { path: string, slug: string } ) {

  return (
    <div className={ "flex flex-row gap-5 pl-5" }>

      <Link href={ "Semua " }
            className={ `btn   ${ slug === "Semua"
                                  ? "info btn-disabled "
                                  : `  text-white  ` } btn-secondary shadow-md shadow-slate-400 ` }>
        Semua
      </Link>

      <Link href={ "Di Terima " }
            className={ `btn  ${ slug === "Di Terima"
                                 ? "info btn-disabled "
                                 : `   text-white  ${ Status( "Di Terima" ) } }` }   ` }>
        Di Terima
      </Link>
      <Link href={ "Di Proses" }
            className={ `btn ${ slug === "Di Proses"
                                ? " btn-disabled text-black"
                                : `  text-white   ${ Status( "Di Proses" ) } ` } ` }>
        Di Proses
      </Link>

      <Link href={ "Di Kirim" }
            className={ `btn ${ slug === "Di Kirim"
                                ? " btn-disabled text-black"
                                : `  text-white ` }   ${ Status( "Di Kirim" ) } ` }>
        Di Kirim
      </Link>

      <Link href={ "Selesai" } replace={ false }
            className={ `btn ${ slug === "Selesai"
                                ? " btn-disabled text-black"
                                : `  text-white  ` }  ${ Status( "Selesai" ) } ` }>
        Selesai
      </Link>

    </div>
  )
}


