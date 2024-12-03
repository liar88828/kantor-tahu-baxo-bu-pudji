import { CellContext, HeaderContext } from '@tanstack/table-core';
import { Rupiah } from '@/lib/utils/rupiah';
import React from 'react';
import { TOrderanData, TOrderServer } from '@/interface/orderan';

export function getOrderan(
  header: string,
  lokasi: [ "semarang", "ungaran" ],
  jenis: [ "orderan", "item" ]
) {

  function cellData(
    info: CellContext<{
      semuaProduct: TProOrderan[];
      pesan: Date | string;
      // kirim: Date | string;
      waktuKirim: Date | string
    } & TOrderanData, any>,
    lok: string
  ) {
    return info.getValue()
               .filter( ( j: TProduct ) => {
                 const namas   = j.nama.includes( header )
                 const jeniss  = j.jenis.toLowerCase().includes( jenis[ 0 ] )
                 const lokasis = j.lokasi.toLowerCase().includes( lok )
                 return namas && jeniss && lokasis
               } )
               .map( ( d: TProduct ) => ( <p key={ d.id }>{ d.jumlah }</p> ) );
  }

  function footerData(
    props: HeaderContext<TOrderServer, any>,
    lok: string,
    parent: string = ""
  ) {
    function getNumber(
      m: {
        semuaProduct: TProOrderan[];
        pesan: Date | string;
        // kirim: Date | string;
        waktuKirim: Date | string
      } & TOrderanData,
      option: "harga" | "jumlah"
    ) {
      return m.semuaProduct
              .filter( ( f ) => {
                const namas   = f.nama.includes( header )
                const jeniss  = f.jenis.toLowerCase().includes( jenis[ 0 ] )
                const lokasis = f.lokasi.toLowerCase().includes( lok )
                if( parent === "parent" ) {
                  return jeniss && namas
                }

                return jeniss && namas && lokasis
              } )
              .map( m => {
                if( option === "jumlah" ) return m.jumlah
                if( option === "harga" ) return m.harga
                return 0
              } )
              .reduce( ( a, d ) => a + d, 0 );
    }

    const jumlah = props.table.getRowModel().rows
                        .map( m => m.original )
                        .map( m => getNumber( m, "jumlah" )
                        ).reduce( ( a, d ) => a + d, 0 )

    if( parent === "parent" ) {
      const harga = props.table.getRowModel().rows
                         .map( m => m.original )
                         .map( m => getNumber( m, "harga" )
                         ).reduce( ( a, d ) => a + d, 0 )
      return ` ${ Rupiah( harga * jumlah ) }`
    }
    return jumlah

  }

  return {
    header: header,
    footer: ( props: HeaderContext<TOrderServer, any> ) => footerData( props, lokasi[ 1 ], "parent" ),

    columns:
      [
        {
          accessorKey: 'semuaProduct',
          header     : 'UNG',
          cell       : ( info: CellContext<TOrderServer, any> ) => cellData( info, lokasi[ 1 ] ),
          footer     : ( props: HeaderContext<TOrderServer, any> ) => footerData( props, lokasi[ 1 ], "" ),

        },
        {
          accessorKey: 'semuaProduct',
          header     : 'SMG',
          cell       : ( info: CellContext<TOrderServer, any> ) => cellData( info, lokasi[ 0 ] ),
          footer     : ( props: HeaderContext<TOrderServer, any> ) => footerData( props, lokasi[ 0 ] ),
        }
      ],
  };
}