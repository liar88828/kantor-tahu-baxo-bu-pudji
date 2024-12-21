import { prisma } from "@/config/prisma";
import OrderRepository, { MonthlyTotal } from "@/server/repository/order.repo";
import { faker } from "@faker-js/faker";


class TestRepo {
	async getMonthlyTotals(year: number) {
		const startDate = new Date(year, 0, 1); // January 1st
		const endDate = new Date(year + 1, 0, 1); // Next year January 1st

		const result = await prisma.orders.groupBy({
			by: [
				'orderTime',
			],
			_sum: {
				totalAll: true,
			},
			where: {
				orderTime: {
					gte: startDate,
					lt: endDate,
				},
			},
		});

		const months = [
			'January', 'February', 'March', 'April',
			'May', 'June', 'July', 'August',
			'September', 'October', 'November', 'December'
		];

		// Initialize all months with 0
		const monthlyTotals = months.reduce((acc, month) => {
			// @ts-ignore
			acc[month] = 0;
			return acc;
		}, {});

		// Fill in actual values
		result.forEach((entry) => {
			const date = new Date(entry.orderTime);
			const monthName = months[date.getMonth()];
			// @ts-ignore
			monthlyTotals[monthName] = entry._sum.totalAll || 0;
		});

		return monthlyTotals;
	}

	async getMonthlyTotal() {
		const monthlyTotals = await prisma.orders.groupBy({
			by: [ 'orderTime' ],
			_sum: {
				totalAll: true,
			},
			where: {
				orderTime: {
					gte: new Date('2023-01-01'),
					lt: new Date('2024-01-01'),
				},
			},
		});

// Sanitize the data to group by month
		const dataMonth: MonthlyTotal[] = monthlyTotals.reduce<MonthlyTotal[]>((acc, { _sum, orderTime }) => {
			// Extract the month name from the orderTime
			const monthName = new Date(orderTime).toLocaleString('default', { month: 'long' });

			// Find the existing entry for this month or create a new one
			const existingMonth = acc.find(item => item.month === monthName);
			if (existingMonth) {
				// @ts-ignore
				existingMonth.total += _sum.totalAll;
			} else {
				// @ts-ignore
				acc.push({ month: monthName, total: _sum.totalAll });
			}

			return acc;
		}, []);

		console.log(dataMonth);
		return dataMonth;
	}

	async newGetMonthlyTotal() {
		return await prisma.orders.groupBy({
			by: [ 'orderTime' ],
			_sum: {
				totalAll: true
			},
			where: {
				orderTime: {
					gte: new Date('2023-01-01'),
					lt: new Date('2024-01-01')
				}
			},
		}).then(results =>
			results.map(result => ({
				month: new Date(result.orderTime).toLocaleString('en-US', { month: 'long' }),
				total_all: result._sum.totalAll || 0
			}))
		);
	}

	async createManySeed() {
		const orderRepository = new OrderRepository()

		for (let i = 0; i < 200; i++) {
			await orderRepository.createOne({
				"order": {
					"address": faker.person.firstName(),
					"desc": "Order of electronics including headphones and chargers.",
					"id_delivery": "9576b826-da1c-4763-9207-4bd9903609bf",
					"id_payment": "e143b314-0cb6-47a2-9fb6-2b6e66d6d6bd",
					"nameCs": faker.person.fullName(),
					"nameDelivery": faker.person.fullName(),
					"orderTime": faker.date.between({ from: '2023-01-01', to: '2025-01-01', }),
					"sendTime": faker.date.between({ from: '2023-01-01', to: '2025-01-01', }),
					"phoneDelivery": faker.phone.number(),
					"priceDelivery": faker.number.int(10000),
					"status": faker.helpers.fake([ 'Pending', 'Fail', 'Complete' ]),
					"totalAll": faker.number.int(10000),
					"totalPayment": faker.number.int(10000)
				}, "orderTrolley":
					[ {
						"qty_at_buy": faker.number.int(10000),
						"price_at_buy": faker.number.int(10000),
						"id_user": "ce2d9fac-7ab6-4b66-9e3a-8ef979b16dbe",
						"id_product": "e3d0ed2d-1ea2-4347-846d-cd24f443389e"
					} ], "orderReceiver":
					{
						"name": faker.finance.accountName(),
						"address": "456 Elm Street, Springfield, USA",
						"phone": faker.phone.number()
					}
			})
		}
		return 'success'
	}

}

export const testRepositories = new TestRepo()