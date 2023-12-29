'use client'
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useRef } from 'react';
// @ts-ignore
import { toPng } from 'html-to-image';

export function PrintData() {
  const router   = useRouter()
  const pathname = usePathname()
  const dateNow  = new Date()
  const path     = pathname?.split( "/" )?.at( -1 )
  const nameFile = path + dateNow.toLocaleDateString( 'id-ID', {
    year  : 'numeric',
    month : 'long',
    day   : 'numeric',
    hour  : 'numeric',
    minute: 'numeric',
    second: 'numeric'
  } ) + '.png'

  const elementRef         = useRef<HTMLDivElement>( null );
  const htmlToImageConvert = useCallback( () => {
    // @ts-ignore
    toPng( elementRef.current, { cacheBust: false } )
    .then( ( dataUrl: any ) => {
      const link    = document.createElement( "a" );
      link.download = nameFile;
      link.href     = dataUrl;
      link.click();
    } )
    .catch( ( err: any ) => {
      console.log( err );
    } );
  }, [ elementRef ] )

  const PrintPng = <div className={ 'flex gap-2 m-2' }>

    <button
      className={ 'btn btn-primary' }
      onClick={ () => router.push( "/table/Semua" ) }>Back
    </button>

    <button
      className={ 'btn btn-primary' }
      onClick={ htmlToImageConvert }>Download Image
    </button>
  </div>
  return { elementRef, PrintPng };
}