import { addDays, currentMonth, currentYear, setHours, setTanggal, today } from '@/lib/utils/formatDate';
import { formatPhone } from '@/lib/utils/formatPhone';
import { Rupiah } from '@/lib/utils/rupiah';
import { StatusButton } from '@/app/components/Atom/Button/handle/StatusButton';
import { OrderanButton } from '@/app/components/Atom/Button/button/OrderanButton';
import React from 'react';

export default async function CardDashboard( { notifyMonth }: { notifyMonth: TListCard[] } ) {

  // const notifyMonth = await dashboard.statusPesanan( 'Kirim' )

  const getKirim = ( waktuKirim: string | Date ) => {
    return new Date( waktuKirim )
  }

  function statusKirim( d: TListCard ) {
    const tanggal = addDays( 0 ).getDate()

    // console.info( tanggal )
    if( tanggal >= 4 && tanggal <= 6 ) {
      return " bg-green-300 ";
    }
    if( tanggal >= 0 && tanggal <= 3 ) {
      return " bg-yellow-300 ";
    }
    if( tanggal < 0 ) {
      return " bg-red-300 ";
    }
  }

  // if( notifyMonth.length === 0 ) {
  //   notifyMonth.push( exampleTLIst )
  // }
  return (
    <ul>
      { notifyMonth
      .sort( ( a, b ) => {
        return getKirim( a.waktuKirim ).getTime() - getKirim( b.waktuKirim ).getTime();
      } )
      .map( ( d, i ) => ( <li
        key={ d.id }
        className={ " my-1 static card card-compact lg:card-side w-[100%] h-[18%] bg-base-100 shadow-xl border-4 " +
          " border-green-200" }>
        <div className="card-body ">
          <div className="flex flex-row sm:flex-col lg:flex-row items-start justify-between gap-1 md:gap-2">
            <h1 className="card-title text-lg sm:text-2xl capitalize mr-10 sm:mr-0"> { i + 1 }. { d.penerima }</h1>
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
            <div className="">
              <p
                className={ " text-right sm:text-left lg:text-right " }>{ setTanggal( d.waktuKirim as Date, "angka" ) }</p>
              <p className={ " text-right sm:text-left lg:text-right " }>{ setHours( d.waktuKirim as Date ) }</p>
            </div>
          </div>

          <div className="  flex flex-row sm:flex-col md:flex-col lg:flex-row  gap-2 justify-between">
            <div className="">
              <p className={ "font-bold text-lg" }>{ Rupiah( d.totalBayar ) }</p>
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

export type   TListCard = {
  id: string
  hpPenerima: string;
  penerima: string;
  alamatPenerima: string;
  //
  pesan: Date | string;
  waktuKirim: Date | string;
  pengirim: string;
  totalBayar: number;
  namaPengiriman: string;
  typePembayaran: string;
  status: string
  semuaProduct: TProduct[]
}

export const exampleTLIst: TListCard = {
  id            : "Kosong",
  hpPenerima    : "Kosong",
  penerima      : "Kosong",
  alamatPenerima: "Kosong",
  pesan         : `${ currentYear }-${ currentMonth }-${ today }`,
  // kirim         : `${ currentYear }-${ currentMonth }-${ today }`,
  waktuKirim    : `${ currentYear }-${ currentMonth }-${ today } 00:00:00.000`,
  pengirim      : "Kosong",
  totalBayar    : 0,
  namaPengiriman: "Kosong",
  typePembayaran: "Kosong",
  status        : "Kosong",
  semuaProduct  : [
    {
      id        : "Kosong",
      nama      : "Kosong",
      lokasi    : "Kosong",
      harga     : 0,
      jumlah    : 0,
      jenis     : "Kosong",
      keterangan: "Kosong",
      img       : "Kosong"
    }
  ]
}