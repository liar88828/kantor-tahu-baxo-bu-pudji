"use client"
import React from 'react';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getDates } from '@/lib/utils/formatDate';
import { TAggregate } from '@/entity/Dashboard';

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
    maintainAspectRatio: true,

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
  return {
    labels  : a.map( ( nama ) => nama.nama ),
    datasets: [
      {
        label: `Bulan ${ getDates( 'month', 0 ) }`,
        data           : a.map( ( nama ) => nama.total_jumlah_current ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: `Bulan ${ getDates( 'month', -1 ) }`,
        data           : a.map( ( nama ) => nama.total_jumlah_last ),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label          : `Bulan ${ getDates( 'month', -2 ) }`,
        data           : a.map( ( nama ) => nama.total_jumlah_last_two ),
        backgroundColor: 'rgba(116,255,98,0.5)',
      },
    ],
  };

}
const getData        = ( aggregate: TAggregate[] ) => {
  // console.log(addDays(-1))
  return { o: options( "Data Penjualan Produk Per Bulan" ), d: setData( aggregate ) }
}

export function BarVertical( { aggregate }: { aggregate: TAggregate[] } ) {
  // console.log(aggregate)
  const { o, d } = getData( aggregate )
  return <Bar options={ o } data={ d }/>;
}
