'use client'

import Link from 'next/link';
import { Status } from '@/app/style/status';

export function LinkNavigation( { path }: {
  path: string[]
} ) {
  // console.log(path)
  return (
    <div className={ "  flex  flex-row gap-5 pl-5" }>
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

export function LinkTable( { slug }: { slug: string } ) {
  return (
    <div className={ "flex flex-row gap-5 pl-5" }>

      <Link href={ "/orderan" }
            replace={ true }
            className={ `btn   ${ slug.toLowerCase() === "orderan"
                                  ? "info btn-disabled "
                                  : `  text-white  ` }  shadow-md shadow-slate-400 bg-green-400` }>
        Create
      </Link>

      <div className={ `btn   ${ slug.length === 1
                                 ? "info btn-disabled "
                                 : `  text-white  ` }  shadow-md shadow-slate-400 bg-cyan-300` }>
        Edit
      </div>

      <Link href={ "/table/Semua " }
            className={ `btn   ${ slug === "Semua"
                                  ? "info btn-disabled "
                                  : `  text-white  ` } btn-secondary shadow-md shadow-slate-400 ` }>
        Semua
      </Link>

      <Link href={ "/table/Di Terima " }
            className={ `btn  ${ slug === "Di Terima"
                                 ? "info btn-disabled "
                                 : `   text-white  ${ Status( "Di Terima" ) } }` }   ` }>
        Di Terima
      </Link>
      <Link href={ "/table/Di Proses" }
            className={ `btn ${ slug === "Di Proses"
                                ? " btn-disabled text-black"
                                : `  text-white   ${ Status( "Di Proses" ) } ` } ` }>
        Di Proses
      </Link>

      <Link href={ "/table/Di Kirim" }
            className={ `btn ${ slug === "Di Kirim"
                                ? " btn-disabled text-black"
                                : `  text-white ` }   ${ Status( "Di Kirim" ) } ` }>
        Di Kirim
      </Link>

      <Link href={ "/table/Selesai" } replace={ false }
            className={ `btn ${ slug === "Selesai"
                                ? " btn-disabled text-black"
                                : `  text-white  ` }  ${ Status( "Selesai" ) } ` }>
        Selesai
      </Link>

    </div>
  )
}


