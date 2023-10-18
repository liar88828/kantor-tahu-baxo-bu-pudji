"use client"
import React from 'react';
import { Row } from '@tanstack/table-core';
import { useRouter } from 'next/navigation';

export default function PrintButton(
  { title, color, table }:
    {
      title: string,
      color: string,
      table: Row<TOrderServer>[]
    } ) {
  const router = useRouter()
  // console.log( table[ 0 ].original )
  return (
    <button onClick={ () => {

      if( sessionStorage.getItem( title.toLowerCase() ) ) {
        sessionStorage.removeItem( title.toLowerCase() )
      }
      sessionStorage.setItem( title.toLowerCase(),
        JSON.stringify( table.map( d => d.original ) )
      )

      router.replace( `/print/${ title.toLowerCase() }` )

    } } className={ ` btn btn-sm sm:btn-md text-white ${ color }` }>
      { title }
    </button>
  );
}

