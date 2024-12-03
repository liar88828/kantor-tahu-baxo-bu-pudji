import { getKirim, setHours, setTanggal, statusKirim } from '@/lib/utils/formatDate';
import { formatPhone } from '@/lib/utils/formatPhone';
import { Rupiah } from '@/lib/utils/rupiah';
import OrderanButton from '@/app/(pages)/dashboard/card/OrderanButton';
import { StatusButton } from '@/app/(pages)/dashboard/card/StatusButton';
import React from 'react';
import { TListCard } from '../../../../../asset/constants/model/TListCard';
import DataEmpty from '@/app/components/template/handling/DataEmpty';
import { types } from 'util';

function truncateString( str: string ) {
  return str.length > 10 ? str.slice( 0, 10 ) + '...' : str;
}

// Example usage:
// let inputString = "Unmbtktahua";
// let truncated = truncateString(inputString);
// console.log(truncated);

export default function CardDashboard( { data, success }: { data: TListCard[], success: boolean } ) {

  //
  // if( !res.ok ) {
  //   return <DataEmpty/>
  // }
  // const { data }: { data: TListCard[] } = await res.json()
  //

  if( !success ) {
    return <DataEmpty/>
  }
  // if( data.length === 0 ) {
  //   return <DataEmpty/>
  // }

  // console.log(data,status)
  return (
    <ul>
      { data
      .sort( ( a, b ) => getKirim( a.waktuKirim ).getTime()
        - getKirim( b.waktuKirim ).getTime() )
      .map( ( d, i ) => ( <li
        key={ d.id }
        className={ " my-1 static card card-compact lg:card-side w-[100%] h-[18%] bg-neural shadow-xl border-4 " +
          " border-green-200" }>
        <div className="card-body ">
          <div className="flex flex-row sm:flex-col lg:flex-row items-start justify-between gap-1 md:gap-2">
            <h1 className="card-title text-lg sm:text-md capitalize mr-10 sm:mr-0">
              { truncateString( i + 1 + '.' + d.penerima ) }</h1>
            <div className="flex flex-wrap gap-1 sm:gap-2  ">
              <StatusButton status={ d.status } id={ d.id }/>
              <OrderanButton semuaProduct={ d.semuaProduct } id={ d.id }/>
              <p className={ `btn-sm sm:btn-md btn font-bold text-white ${ ( statusKirim( d ) ) }` }>
                { setTanggal( d.waktuKirim as Date, "hari" ) }
              </p>
            </div>
          </div>

          <div className=" flex flex-row sm:flex-col md:flex-col lg:flex-row  gap-1 justify-between">
            <div className="">
              <p>{ d.alamatPenerima }</p>
              <p>{ formatPhone( d.hpPenerima ) } </p>
            </div>
            <div>
              <p
                className={ " text-right sm:text-left lg:text-right " }>{ setTanggal( d.waktuKirim as Date, "angka" ) }</p>
              <p className={ " text-right sm:text-left lg:text-right " }>{ setHours( d.waktuKirim as Date ) }</p>
            </div>
          </div>

          <div className="  flex flex-row sm:flex-col md:flex-col lg:flex-row  gap-2 justify-between">
            <div className="">
              <p className={ "font-bold text-lg sm:text-md underline" }>
                { Rupiah( d.totalBayar ) }
              </p>
            </div>
            <div className="card-actions content-end  flex flex-col">

            </div>

          </div>
        </div>
      </li> ) )
      }

    </ul>
  )
}
