import React from 'react';
import { Rupiah } from '@/lib/utils/rupiah';

export function jumlah() {
  const Jumlah: React.FC<{ d: TProduct[] }> = ( { d } ) => {
    return (
      <>
        { d.map( ( o ) => (
          <span key={ o.harga + o.jenis }
                className={ "flex border-gray-200 border" }>
            { Rupiah( Number( o.harga ) *
              Number( o.jumlah ) ) }
            </span>
        ) ) }
      </>
    );
  };
}