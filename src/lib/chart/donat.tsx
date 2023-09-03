"use client"
import React from 'react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { TDonat } from '@/app/dashboard/dashboard';

ChartJS.register( ArcElement, Tooltip, Legend );

export function Donat( { dataKu }: {
  dataKu: TDonat[]
} ) {

  const produk: string[] = [
    // 'Tahu Bakso Rebus',
    // 'Tahu Bakso Vakum',
    // 'Tahu Bakso Special',
    // 'Tahu Bakso Goreng',
    // 'Bandeng Presto',
    // 'Otak-Otak Bandeng',
    // 'Bakso Sapi 20',
    // 'Bakso Sapi 12',
    // 'Bakso Aneka',
    // 'Nugget',
    // 'Rolade Tahu',
    // 'Rolade Singkong',
  ]
  dataKu.forEach( nama => produk.push( nama.nama ) )
  const options = {
    scales: {},
    cutout: "30%",

    // responsive         : true,
    maintainAspectRatio: true,
    // dataset: {
    //   formatter: ( value, context ) => {
    //     console.log(value, context)
    //     return value
    //   }
    // },
    plugins: {

      datalabels: {
        // formatter: ( value ) => {
        //   return value + '%';
        // },
        labels: {
          index: {
            color: '#404040',
            font : {
              size: 10,
            },
          }
        }
      },

      // tooltip: {
      //   enabled: false
      // },
      legend: {
        position: 'top' as const,
      },
      title : {
        display: true,
        text   : 'Total Penjualan Produk Per Bulan',
      },
    },
  };

  const namaProduk = dataKu.map( d => d.nama )

  const data = {
    labels : namaProduk,
    // spacing: 1,
    // borderAlign: "inner",
    // clip: "objectMode",
    datasets: [
      {
        label          : 'Per Bulan',
        data           : dataKu.map( d => d._count.nama ),
        backgroundColor: produk.map( () => faker.color.rgb( { format: 'css' } ) ),
        borderColor    : [
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
        borderWidth    : 1,
      },
    ],
  };

  return <Pie data={ data }
              options={ options }
  />
}
