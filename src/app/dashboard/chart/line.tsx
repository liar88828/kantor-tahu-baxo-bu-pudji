"use client"
import React from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = [ 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', "Agustus", "September", "Oktober", "November", "Desember" ];

const data = {
  labels,
  datasets: [
    {
      label: '2022',
      data: labels.map( () => faker.datatype.number( { min: -100, max: 100 } ) ),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '2023',
      data: labels.map( () => faker.datatype.number( { min: -100, max: 100 } ) ),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: '2024',
      data: labels.map( () => faker.datatype.number( { min: -100, max: 100 } ) ),
      borderColor: 'rgb(126,235,53)',
      backgroundColor: 'rgba(116,255,98,0.5)',
    },
  ],
};

export function Lines() {
  return <Line options={ options } data={ data }/>;
}
