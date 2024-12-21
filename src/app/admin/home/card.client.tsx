'use client'
import React from "react";
import {
	CategoryScale,
	Chart as ChartJS,
	type ChartData,
	type ChartOptions,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ResponseMonthData } from "@/server/repository/order.repo";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export function Earning({ year_new, year_old }: { year_new: ResponseMonthData, year_old: ResponseMonthData }) {

	const dataEarning = {
		date: year_new.dataMonth.map(d => d.month),
		year_new: year_new.dataMonth.map(d => d.total),
		year_old: year_old.dataMonth.map(d => d.total),
	}
	console.log(dataEarning)
	const data :ChartData<'line'>= {
		labels: dataEarning.date,
		datasets: [
			{
				label: String(year_new.year),
				data: dataEarning.year_new,
				borderColor: 'rgba(75, 192, 192, 1)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				tension: 0.4, // Smooth curves
				pointStyle:'line',

			},
			{
				label: String(year_old.year),
				data: dataEarning.year_old,
				borderColor: 'rgb(192,75,75)',
				backgroundColor: 'rgb(203,141,141)',
				tension: 0.4, // Smooth curves
				pointStyle: 'line',
			},
		],
	};
	const options: ChartOptions = {

		responsive: true,
		resizeDelay: 1000,
		aspectRatio: 100 / 40,
		// aspectRatio: 100 / 80,
		interaction: {
			mode: 'index',
			intersect: false
		},
		plugins: {

			legend: {
				align: "end",
				reverse: false,
				labels: {
					pointStyle: 'circle',
					useBorderRadius: true,
					boxWidth: 10,
					boxHeight: 10,
					usePointStyle: true,
				}
			},
			title: {
				display: true,
				text: 'Monthly Sales Data',
			},
		},
	};

	return <div className="card card-compact md:card-normal bg-base-200/30   ">
		<div className="card-body ">
			<h2 className="card-title">Earning</h2>
				<Line data={ data } options={ options }/>
		</div>
	</div>;
}

