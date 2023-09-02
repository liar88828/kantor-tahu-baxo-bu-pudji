"use client"
import React from 'react';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

export type TAggregate = {
  nama: string,
  total_jumlah_current: number,
  total_jumlah_last: number,
  total_harga_current: number,
  total_harga_last: number
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = ( title: string ) => {
  return {
    responsive         : true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'top' as const,
      },
      title : {
        display: true,
        text   : title,
      },
    },
  };
}
const setData        = ( a: TAggregate[] ) => {
  // console.log( d )
  return {
    labels  : a.map( ( nama ) => nama.nama ),
    datasets: [
      {
        label          : 'Jumlah Penjualan Produk Bulan Sekarang',
        data           : a.map( ( nama ) => nama.total_jumlah_current ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label          : 'Jumlah Penjualan Produk Bulan Kemarin',
        data           : a.map( ( nama ) => nama.total_jumlah_last ),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

}
const getData        = ( aggregate: TAggregate[] ) => {
  return { o: options( "Data Produk Per Bulan" ), d: setData( aggregate ) }
}

export function BarVertical( { aggregate }: { aggregate: TAggregate[] } ) {
  const { o, d } = getData( aggregate )
  return <Bar options={ o } data={ d }/>;
}
