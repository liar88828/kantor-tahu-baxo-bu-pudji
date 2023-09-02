import { getData } from '@/app/utils/ress/table';
import React from 'react';
import { HorizontalCard } from '@/app/components/dashboard/card';
import { Lines } from '@/lib/chart/line';
import { Donat } from '@/lib/chart/donat';
import { BarVertical } from '@/lib/chart/Bar';
import { CardList, TListCard } from '@/app/dashboard/CardList';

// export const dynamic = 'auto'
// export const dynamicParams = true
export const revalidate = 100
// export const fetchCache = 'auto'
export const runtime    = 'nodejs'
// export const preferredRegion = 'auto'

export type TDonat = {
  _count: {
    nama: number
  },
  nama: string
}

export type TStatus = {
  _count: {
    status: number
  },
  status: string,
}

export type TLines = {
  year: number,
  month: string,
  jumlah_pesanan: number
};

export async function ServerComponent() {
  const r: {
    msg: string,
    success: boolean,
    data: {
      semuaOrderTahun: TLines[],
      semuaStatus: TStatus[]
      semuaProductNow: TDonat[]
      semuaProductLast: TDonat[]
      notifyMonth: TListCard[]
      aggregate: any
    }
  } = await getData()

  return ( <>
      <ClientComponent

        line={ r.data.semuaOrderTahun }
        donat={ r.data.semuaProductNow }
        donatLast={ r.data.semuaProductLast }
        status={ r.data.semuaStatus }
        notifyMonth={ r.data.notifyMonth }
        aggregate={ r.data.aggregate }
      />
    </>
  )
}

const ClientComponent = ( {
  line, donat, status, notifyMonth, donatLast, aggregate
}: {
  line: TLines[],
  status: TStatus[]
  donat: TDonat[],
  donatLast: TDonat[],
  notifyMonth: TListCard[]
  aggregate: any
} ) => {
  const product = [
    { nama: "Tahu Bakso Rebus", harga: 42.000 },
    { nama: "Tahu Bakso Vakum", harga: 46.000 },
    { nama: "Tahu Bakso Special", harga: 50.000 },
    { nama: "Tahu Bakso Goreng", harga: 45.000 },
    { nama: "Bandeng Presto", harga: 60.000 },
    { nama: "Otak-Otak Bandeng", harga: 70.000 },
    { nama: "Bakso Sapi 20", harga: 40.000 },
    { nama: "Bakso Sapi 12", harga: 25.000 },
    { nama: "Bakso Aneka", harga: 29.000 },
    { nama: "Nugget", harga: 27.000 },
    { nama: "Rolade Tahu", harga: 19.000 },
    { nama: "Rolade Singkong", harga: 19.000 },
  ]

  // console.log("-----------")
  // console.log(aggregate)
  // console.log("-----------")

  return ( <>
      <div className={ " flex gap-2 flex-col p-2 sm:p-4" }>
        <div
          className="flex flex-wrap my-5 p-2 md:p-5  gap-2 sm:gap-3 justify-between bg-slate-50  rounded-2xl shadow-xl
shadow-slate-200">
          <HorizontalCard datas={ status }/>
        </div>
        <div className="flex gap-2  sm:flex-row  flex-col w-[100%]">

          <div className=" sm:w-[70%] gap-2 flex flex-col">
            <div className="border border-black bg-white rounded-3xl  h-[20rem] sm:h-[100%] ">
              <Lines datas={ line }/>
            </div>
            <div className="border border-black bg-white rounded-3xl  h-[20rem] sm:h-[100%] ">
              <BarVertical aggregate={ aggregate }/>
            </div>
          </div>

          <div
            className=" sm:w-[30%] h-[50vh]  sm:h-[30rem]  overflow-y-auto    border border-black bg-white rounded-3xl p-2">
            <CardList product={ product } notifyMonth={ notifyMonth }/>
          </div>
        </div>

        <div className="flex sm:flex-row  flex-col gap-2">
          <div className=" w-[100%]  border border-black bg-white rounded-3xl p-2">
            <Donat
              datas={ donat }/>
          </div>
          {/*<div className="sm:w-[50%] w-[100%]  border  border-black bg-white rounded-3xl  p-2">*/ }
          {/*  <Donat datas={ donat }/>*/ }
          {/*</div>*/ }
        </div>
      </div>
    </>
  )
}

const data = [
  { status: "di pesan", nama: 'Tahu Bakso Rebus', harga: 42000, tanggal: '2023-07-26' },
  { status: "di pesan", nama: 'Tahu Bakso Vakum', harga: 46000, tanggal: '2023-06-26' },
  { status: "di pesan", nama: 'Tahu Bakso Special', harga: 50000, tanggal: '2023-04-26' },
  { status: "di kirim", nama: 'Tahu Bakso Goreng', harga: 45000, tanggal: '2023-08-26' },
  { status: "di kirim", nama: 'Bandeng Presto', harga: 60000, tanggal: '2023-02-26' },
  { status: "di kirim", nama: 'Otak-Otak Bandeng', harga: 70000, tanggal: '2024-08-26' },
  { status: "di kirim", nama: 'Bakso Sapi 20', harga: 40000, tanggal: '2023-02-26' },
  { status: "di kirim", nama: 'Bakso Sapi 12', harga: 25000, tanggal: '2023-08-26' },
  { status: "di pesan", nama: 'Bakso Aneka', harga: 29000, tanggal: '2023-08-26' },
  { status: "di pesan", nama: 'Nugget', harga: 27000, tanggal: '2023-08-26' },
  { status: "di pesan", nama: 'Rolade Tahu', harga: 19000, tanggal: '2023-08-26' },
  { status: "di pesan", nama: 'Rolade Singkong', harga: 19000, tanggal: '2023-08-26' }
]

const datas: TListCard[] = [
  {
    id            : "12312",
    penerima      : 'Arla uguanu rh',
    hpPenerima    : '0114',
    alamatPenerima: 'Hanita',
    pengirim      : 'Fe hKKhAsn wl',
    namaPengiriman: 'Delivery update',
    kirim         : '2023-08-18T00:00:00.000Z',
    pesan         : '2023-08-31T00:00:00.000Z',
    status        : 'Di terima',
    typePembayaran: 'Cash',
    totalBayar    : 181044
  }

]