import { Status, TStatusProduk } from '@/app/style/status';
import Link from 'next/link';
import { NavBody } from '@/app/elements/link/NavBody';

export function LinkComplex( { slug }: { slug: TStatusProduk } ) {

  function getStatus( s: TStatusProduk ) {
    return s === slug ? " btn-disabled text-black" : ` ${ Status( s ) } `;}

  return (
   <NavBody>
        <Link href={ "/orderan" }
              replace={ true }
              className={ `btn   ${ slug.toLowerCase() === "orderan"
                                    ? "info btn-disabled "
                                    : "" } text-white shadow-md shadow-slate-400 bg-green-400` }>
          Create
        </Link>

        <div className={ `btn   ${ slug.length > 10
                                   ? "info btn-disabled "
                                   : "" } text-white shadow-md shadow-slate-400 bg-cyan-300` }>
          Edit
        </div>

        <Link href={ "/table/Semua " }
              className={ `btn   ${ slug === "Semua"
                                    ? "info btn-disabled "
                                    : "" } text-white btn-secondary shadow-md shadow-slate-400 ` }>
          Semua
        </Link>

        <Link href={ "/table/Di Terima " }
              className={ `btn  ${ getStatus( "Di Terima" ) }   ` }>
          Di Terima
        </Link>
        <Link href={ "/table/Di Proses" }
              className={ `btn ${ getStatus( "Di Proses" ) } ` }>
          Di Proses
        </Link>

        <Link href={ "/table/Di Kirim" }
              className={ `btn ${ getStatus( "Di Kirim" ) } ` }>
          Di Kirim
        </Link>

        <Link href={ "/table/Selesai" } replace={ false }
              className={ `btn ${ getStatus( "Selesai" ) } ` }>
          Selesai
        </Link>
   </NavBody>
  )
}