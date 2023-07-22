"use client"
import React from 'react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register( ArcElement, Tooltip, Legend );

const namaProdak = [
  'Tahu Bakso Rebus',
  'Tahu Bakso Vakum',
  'Tahu Bakso Special',
  'Tahu Bakso Goreng',
  'Bandeng Presto',
  'Otak-Otak Bandeng',
  'Bakso Sapi 20',
  'Bakso Sapi 12',
  'Bakso Aneka',
  'Nugget',
  'Rolade Tahu',
  'Rolade Singkong',
]

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Total Penjualan Produk Per Bulan',
    },
  },
};

const data = {
  labels: namaProdak,
  datasets: [
    {
      label: 'Per Bulan',
      data: namaProdak.map( () => faker.datatype.number( { min: 10, max: 1000 } ) ),
      backgroundColor: namaProdak.map( () => faker.color.rgb( { format: 'css' } ) ),
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',

        'rgb(255,189,203)',
        'rgb(159,217,255)',
        'rgb(255,227,157)',
        'rgb(166,255,255)',
        'rgb(189,154,255)',
        'rgb(255,206,155)',

      ],
      borderWidth: 1,
    },
  ],
};

export function Donat() {
  return <Doughnut data={ data } options={ options }/>;
}
