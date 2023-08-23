"use client"
import React from 'react';
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TLine } from '@/app/dashboard/dashboard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Lines( { datas }: {
  datas: TLine[]
} ) {
  // console.log( datas )
  const options = {
    responsive: true,
    plugins   : {
      legend: {
        position: 'top' as const,
      },
      title : {
        display: true,
        text   : 'Per Tahun',
      },
    },
  };

  const monthName = datas.map( d => new Date( d.pesan ).toLocaleString( "id-ID", { month: "long" } ) )
  const count     = datas.map( d => d._count.pesan )
  // console.log( count )
  // console.log( monthName )
  // console.log(new Date("2023-08-23T16:15:00.554Z"))
  // console.log( datas )
  const currentYear = new Date().getFullYear();

  // ---------
  const data = {
    labels  : monthName,
    datasets: [
      {
        label: currentYear,
        data           : count,// monthName.map( () => faker.datatype.number( { min: -100, max: 100 } ) ),
        borderColor    : 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label          : '2023',
      //   data           : labels.map( () => faker.datatype.number( { min: -100, max: 100 } ) ),
      //   borderColor    : 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
      // {
      //   label          : '2024',
      //   data           : labels.map( () => faker.datatype.number( { min: -100, max: 100 } ) ),
      //   borderColor    : 'rgb(126,235,53)',
      //   backgroundColor: 'rgba(116,255,98,0.5)',
      // },
    ],
  };

  return <Line options={ options } data={ data }/>;
}
