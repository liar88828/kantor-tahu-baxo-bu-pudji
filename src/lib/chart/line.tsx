"use client"
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip,
} from 'chart.js';
import { TLines } from '@/app/dashboard/dashboard';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IMonthOrder {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}

export function Lines( { dataKu }: {
  dataKu: TLines[]
} ) {

  const options = {
    responsive         : true,
    maintainAspectRatio: true,
    plugins            : {
      legend: {
        position: 'top' as const,
      },
      title : {
        display: true,
        text: 'Jumlah Pembeli Perbulan',
      },
    },
  };

  const monthOrder: IMonthOrder = {
    "January"  : 1,
    "February" : 2,
    "March"    : 3,
    "April"    : 4,
    "May"      : 5,
    "June"     : 6,
    "July"     : 7,
    "August"   : 8,
    "September": 9,
    "October"  : 10,
    "November" : 11,
    "December" : 12
  };

  const availableYears = Array.from( new Set( dataKu.map( order => order.year ) ) );
  const years          = availableYears.sort( ( a, b ) => a - b );

  function getPerAgeByValue( age: number ) {
    return dataKu.filter( ( ( f ) => f.year == age ) )
                 .map( d => d.jumlah_pesanan );
  }

  const setDate               = new Set( dataKu.map( order => order.month ) )
  const mapDate               = Array.from( setDate )
  // @ts-ignore
  const sortedAvailableMonths = mapDate.sort( ( a, b ) => monthOrder[ a ] - monthOrder[ b ] );

  const data = {
    labels  : sortedAvailableMonths,
    datasets: [
      {
        label: years[ 0 ].toString(),
        data : getPerAgeByValue( years[ 0 ] ),
        borderColor    : 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: years[ 1 ].toString(),
        data           : getPerAgeByValue( years[ 1 ] ),
        borderColor    : 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: years[ 2 ].toString(),
        data           : getPerAgeByValue( years[ 2 ] ),
        borderColor    : 'rgb(126,235,53)',
        backgroundColor: 'rgba(116,255,98,0.5)',
      },
    ],
  }

  return <Line options={ options } data={ data }/>;
}

