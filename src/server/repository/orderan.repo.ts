import { TOrderTransactionCreate, TOrderTransactionUpdate } from "@/entity/transaction.model";
import { prisma } from "@/lib/prisma";
import { TStatus } from "@/interface/Dashboard";
import { TOptional } from "@/interface/types";
import { Orders } from "@prisma/client";

export const exampleSearch = {
	receiverName: "Alice",
	status: "Pending",
	dateRange: {start: new Date("2024-12-01"), end: new Date("2024-12-31")},
	productId: "prod-001",
}
type SearchOrder = {
	receiverName?: string;
	status?: string;
	dateRange?: { start: Date; end: Date };
	productId?: string;
};
export default class OrderRepository implements InterfaceRepository<TOrderTransactionCreate> {

	async search(criteria: SearchOrder) {
		return prisma.$transaction(async (tx) => {

			return tx.orders.findMany({
				where: {
					AND: [
						{

							...(criteria.receiverName ?
								{Receiver: {name: {contains: criteria.receiverName},}} : {}),

							...(criteria.status ?
								{status: {equals: criteria.status}} : {}),

							...(criteria.dateRange ?
								{
									orderTime: {
										gte: criteria.dateRange.start,
										lte: criteria.dateRange.end
									}
								} : {}),

							...(criteria.productId ? {
								OrderProduct: {
									some: {
										id_product: criteria.productId,
									}
								}
							} : {}),

						}
					]
				},
				include: {
					Receivers: true,
					Trolleys: {
						include: {
							Product: true
						}
					}
				},
			});
		});
	}

	async deleteOne(id_order: string) {
		return prisma.$transaction(async (tx) => {
			// Find the order to retrieve the associated receiver ID
			const order = await tx.orders.findUniqueOrThrow({
				where: {id: id_order},
			});

			// Delete related order products
			const orderProduct = await tx.trolleys.deleteMany({
				where: {id_order: id_order},
			});

			// Delete the order itself
			await tx.orders.delete({
				where: {id: id_order},
			});

			// Delete the associated receiver
			const orderReceiver = await tx.receivers.delete({
				where: {id: order.id_receiver},
			});

			return {
				order, orderProduct, orderReceiver

			};
		});
	}

// getAll data from database

	setOne() {
		// d.waktuKirim = !d.waktuKirim ? new Date() : d.waktuKirim
		// d.pesan      = !d.pesan ? new Date() : d.pesan
		// d.kirim      = !d.kirim ? new Date() : d.kirim

		// const time = ( d.waktuKirim.toString().length === 5 )
		//              ? d.waktuKirim + ":00"
		//              : d.waktuKirim
		// // console.log(new Date( d.pesan ),)
		// return {
		//   alamatPenerima: d.alamatPenerima,
		//   guna          : d.guna,
		//   hpPenerima    : d.hpPenerima,
		//   hpPengirim: d.hpPengirim,
		//   id            : d.id,
		//   lokasi        : d.lokasi.replaceAll( " ", "" ),
		//   namaPengiriman: d.namaPengiriman,
		//   ongkir        : d.ongkir,
		//   penerima      : d.penerima,
		//   pengirim      : d.pengirim,
		//   pesan         : new Date( d.pesan ),
		//   kirim         : new Date( d.kirim ),
		//   waktuKirim: new Date( d.kirim + "T" + time + ".000Z" ),
		//   status        : d.status,
		//   totalBayar    : d.totalBayar,
		//   totalPenjualan: d.totalPenjualan,
		//   typePembayaran: d.typePembayaran,
		// }
	}

	setMany() {
		return []
		// return data.semuaProduct.map( ( d: TProOrderan ) => (
		//     Object.assign( {
		//       harga     : d.harga,
		//       id        : method === "PUT" ? d.id : d.id + "_" + Date.now(),
		//       jenis     : d.jenis.replaceAll( " ", "" ),
		//       jumlah    : d.jumlah,
		//       keterangan: d.keterangan,
		//       lokasi    : d.lokasi.replaceAll( " ", "" ),
		//       img       : d.img,
		//       nama      : d.nama,
		//       orderanId : data.id
		//     } )
		//   )
		// );
	}

	async findAll(): Promise<Orders[]> {
		return prisma.orders.findMany({
			include: {
				Trolleys: {
					include: {
						Product: true
					}
				},
				Receivers: true,
				Deliverys: true,
				Payments: true
			},
			take: 100,
			orderBy: {
				created_at: "desc"
			},
		})
	}

	async findById(id: string) {
		return prisma.orders.findUnique({
			where: {id},
			include: {
				Trolleys: {
					include: {
						Product: true
					}
				},
				Receivers: true,
				Deliverys: true,
				Payments: true
			},
		})
	}

	// ---------CREATE
	async createOne(data: TOrderTransactionCreate) {
		return prisma.$transaction(async (tx) => {

			const orderReceiver = await tx.receivers.create(
				{data: data.orderReceiver})

			const order = await tx.orders.create(
				{
					data: {
						id_receiver: orderReceiver.id,
						...data.order
					},
				})

			if (order) {
				const products = data.orderTrolley.map((product) => ({
					id_order: order.id,
					id_product: product.id_product,
					qty_at_buy: product.qty_at_buy,
					price_at_buy: product.price_at_buy
				}))

				const orderProduct = await tx.trolleys.createMany(
					{data: products})

				return {
					order,
					orderReceiver,
					orderProduct
				}
			}
		})
	}

	async updateOne(data: TOrderTransactionUpdate, orderId: string) {
		return prisma.$transaction(async (tx) => {
			const updatedOrder = data.order
				? await tx.orders.update({
					where: {id: orderId},
					data: data.order,
				})
				: null;

			let updatedReceiver = null;
			if (data.orderReceiver) {
				const order = await tx.orders.findUniqueOrThrow({
					where: {id: orderId},
				});
				updatedReceiver = await tx.receivers.update({
					where: {id: order.id_receiver},
					data: data.orderReceiver,
				});
			}

			let updatedProducts = null;

			if (data.orderOrder) {
				// Delete existing products for the order
				await tx.trolleys.deleteMany({
					where: {id_order: orderId},
				});

				// Insert updated product list
				const products = data.orderOrder.map((product) => ({
					id_order: orderId,
					id_product: product.id_product,
					qty_at_buy: product.qty_at_buy,
					price_at_buy: product.price_at_buy,

				}));

				updatedProducts = await tx.trolleys.createMany({
					data: products,
				});
			}

			return {
				updatedOrder,
				updatedReceiver,
				updatedProducts,
			};
		});
	}

//   async findDashboard( a: string ) {
//     if( a === "false" ) {
//       const falseFeature = (): void => {
//
//         const monthlyUserCounts = prisma.orders.groupBy({
//             by    : [ "pesan" ],
//             _count: { pesan: true, },
//             where : {
//               pesan: {
//                 gte: new Date( `${ currentYear }-01-01` ),
//                 lte: new Date( `${ currentYear }-12-30` ),
//               }
//             },
//           }
//         )
//         console.debug( monthlyUserCounts )
//
//         // const aggregatedData = prisma.semuaProduct.groupBy( {
//         //   by     : [ 'nama' ],
//         //   where  : {
//         //     AND: [
//         //       {
//         //         created_at: {
//         //           gte: new Date( new Date().getFullYear(), new Date().getMonth() - 1, 1 ),
//         //           lt : new Date( new Date().getFullYear(), new Date().getMonth(), 1 ),
//         //         },
//         //       },
//         //     ],
//         //   },
//         //   _sum   : {
//         //     jumlah: true,
//         //     harga : true,
//         //   },
//         //   orderBy: {
//         //     _sum: {
//         //       harga: 'desc',
//         //     },
//         //   },
//         // } );
//         // console.debug( aggregatedData )
//
//         //--------------get jumlah lokasi
//         const monthlyUserCounts1 = prisma.orders.groupBy({
//             by    : [ "lokasi" ],
//             _count: {
//               lokasi: true,
//             },
//           }
//         )
//         console.debug( monthlyUserCounts1 )
//
//         const tanggalSekarang = prisma.orders.findMany({
//             where: {
//               kirim: {
//                 gte: new Date( `${ currentYear }-${ currentMonth }-01` ),
//                 lte: new Date( `${ currentYear }-${ currentMonth }-30` ),
//               }
//             }
//           }
//         )
//         console.debug( tanggalSekarang )
//
//         //--------------get jumlah lokasi
//         const monthlyUserCounts2 = prisma.orders.count({
//           where: {
//             created_at: {
//               gte: new Date( `${ currentYear }-01-01` ),
//               lte: new Date( `${ currentYear }-12-30` ),
//             }
//           },
//         } )
//         console.debug( monthlyUserCounts2 )
//       }
//       console.debug( falseFeature )
//
//     }
//
//     // untuk list card
//     const semuaNotifyMonth = prisma.orders.findMany({
//       where : {
//         status: {
//           contains: "irim"
//         },
//         // status:"Di Kirim",  ,
//
//         sendTime: {
//           gte: addDays( -30 ),
//           // lte: new Date( `${ currentYear }-${ currentMonth }-30` ),
//         },
//       },
//       select: {
//         id: true,
//         //penerima
//         penerima      : true,
//         hpPenerima    : true,
//         alamatPenerima: true,
//         //
//         pengirim      : true,
//         namaPengiriman: true,
//
//         //
//         kirim         : true,
//         pesan         : true,
//         status        : true,
//         typePembayaran: true,
//         totalBayar    : true,
//
//       },
//       take  : 100,
//     } );
//
//     // untuk donat Now Month
//     // const semuaProductCountNow = prisma.semuaProduct.groupBy( {
//     //   by    : [ "nama" ],
//     //   _count: { nama: true, },
//     //   where : {
//     //     created_at: {
//     //       gte: addDays( -30 ),
//     //       // lte: new Date( `${ currentYear }-${ currentMonth }-30` ),
//     //       }
//     //     },
//     //   }
//     // )
//
//     // untuk donat Now Month Last
//     // const semuaProductCountLast = prisma.semuaProduct.groupBy( {
//     //     by    : [ "nama" ],
//     //     _count: { nama: true, },
//     //   where: {
//     //     created_at: {
//     //       gte: new Date( `${ currentYear }-${ currentMonth === 0 ? 12 : currentMonth - 1 }-01` ),
//     //       lte: new Date( `${ currentYear }-${ currentMonth === 0 ? 12 : currentMonth - 1 }-30` ),
//     //     }
//     //   },
//     //   }
//     // )
//
//     //untuk notify block status
//     const semuaStatusOrder = prisma.orders.groupBy({
//         by    : [ "status" ],
//         _count: { status: true, },
//         where : {
//           created_at: {
//             gte: addDays( -30 ),
//             // lte: new Date( `${ currentYear }-${ currentMonth }-30` ),
//           }
//         },
//       }
//     )
//
//     // return { data: monthlyUserCounts}.
//     const transaction = await prisma.$transaction([
//       // semuaProductCountNow,
//       semuaStatusOrder, semuaNotifyMonth,
//       // semuaProductCountLast,
//       //aggregatedData
//     ] )
//
//     const monthlyUserCounts: TLine[] = await prisma.$queryRaw`
//         SELECT YEAR(pesan)                AS year,
//                MONTHNAME(pesan)           AS month,
//                CAST(COUNT(*) AS UNSIGNED) AS jumlah_pesanan
//         FROM tahu_baxo_bupudji.orderans
//         WHERE YEAR(pesan) BETWEEN YEAR(CURRENT_DATE) - 3 AND YEAR(CURRENT_DATE)
//         GROUP BY YEAR(pesan), MONTH(pesan)
//         ORDER BY YEAR(pesan), MONTH(pesan);
//     `
//
//     const aggregate: TAggregate[] = await prisma.$queryRaw`
//         SELECT nama,
//                SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) THEN jumlah ELSE 0 END)     AS total_jumlah_current,
//                SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) - 1 THEN jumlah ELSE 0 END) AS total_jumlah_last,
//                SUM(IF(MONTH(created_at) = MONTH(CURRENT_DATE) - 2, jumlah,
//                       0))                                                                        AS total_jumlah_last_two,
//                SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) THEN harga ELSE 0 END)      AS total_harga_current,
//                SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) - 1 THEN harga ELSE 0 END)  AS total_harga_last,
//                SUM(IF(MONTH(created_at) = MONTH(CURRENT_DATE) - 2, harga, 0))                    AS total_harga_last_two
//         FROM tahu_baxo_bupudji.semuaproducts
//         WHERE MONTH(created_at) BETWEEN MONTH(CURRENT_DATE) - 2 AND MONTH(CURRENT_DATE)
//         GROUP BY nama;
//
//     `
//
// //untuk line
//     const semuaOrderTahun: TLines[] = monthlyUserCounts.map( ( item ) => ( {
//       ...item,
//       jumlah_pesanan: Number( item.jumlah_pesanan )
//     } ) );
//
//     // const semuaProductNow        = transaction[ 0 ]
//     // const semuaStatus: TStatus[] = transaction[ 1 ]
//     // const notifyMonth            = transaction[ 2 ]
//     // const semuaProductLast       = transaction[ 3 ]
//
//     // const send = {
//     //   semuaOrderTahun,//untuk line
//     //   semuaProductNow,// untuk donat Now
//     //   semuaProductLast,// untuk donat Last
//     //   semuaStatus,// untuk notify block status
//     //   notifyMonth,// untuk list card
//     //   aggregate
//     // }
//     // return send
//
//   }

	async findByStatus(status: TStatus) {
		// let option = {
		//   include: { semuaProduct: true }
		// }
		//
		// if( status !== "Semua" ) {
		//   option = Object.assign( option, { where: { status } } )
		// }
		//
		// return prisma.orders.findMany(option)
	}

	async createNesting(data: any) {
		// return prisma.orders.create({
		//   data:
		//     Object.assign( this.setOne( data ),
		//       {
		//         semuaProduct: {
		//           createMany: {
		//             data: this.setMany( data, "POST" )
		//           }
		//         },
		//       }, ),
		//
		//   include: {
		//     semuaProduct: true, // Include all posts in the returned object
		//   },
		// } )

	}

	async paginate(data: {
		row: number,
		skip: number
	}) {
		const {row, skip} = data
		return prisma.orders.findMany({take: row, skip})
	}

	// -----DELETE
	async destroyMany(array: string []) {
		// const id            = array.map( d => d )
		// const deleteOrder = prisma.orders.deleteMany({ where: { id: { in: id } } })
		// const deleteProduct = prisma.semuaProduct.deleteMany( { where: { orderanId: { in: id } } } )
		// return await prisma.$transaction( [ deleteProduct, deleteOrder ] )
		throw new Error('not implemented')
	}

	// -----DELETE
	async destroyOne(id: string) {
		// console.log( id )
		// console.log( "one" )
		// const delete1 = prisma.orders.delete({
		//   where : { id: id },
		//   select: { semuaProduct: true }
		// } )
		//
		// const deleteMany = prisma.semuaProduct.deleteMany( {
		//   where: { orderanId: id },
		// } )
		// return prisma.$transaction( [ deleteMany, delete1 ] )
		throw new Error('not implemented')

	}

	async updateMany(data: any, id: string,) {

		// const updateData = prisma.orders.update({
		//   where: { id },
		//   data: this.setOne( data )
		// } );
		//
		// const createMany = prisma.semuaProduct.createMany( {
		//   data: this.setMany( data, "POST" )
		// } )
		//
		// const deleteProduct = prisma.semuaProduct.deleteMany( { where: { orderanId: id } } )
		// return await prisma.$transaction( [ deleteProduct, createMany, updateData ] )
		throw new Error('not implemented')

	}

	async updateOneOnly(data: Partial<TOptional>, id: string,) {
		// return prisma.orderan.update( { where: { id: id }, data },
		// )
	}

	async UpdateOneEx(data: any, id: string,) {
		// data.waktuKirim = !data.waktuKirim ? new Date() : data.waktuKirim
		// data.pesan      = !data.pesan ? new Date() : data.pesan
		// data.kirim      = !data.kirim ? new Date() : data.kirim
		// const time      = ( data.waktuKirim.toString().length === 5 )
		//                   ? data.waktuKirim + ":00"
		//                   : data.waktuKirim
		//
		// return await prisma.$transaction( [
		//   ...data.semuaProduct.map( d =>
		//     prisma.semuaProduct.updateMany( {
		//       where: { id: d.id },
		//       data : {
		//         harga     : d.harga,
		//         jenis     : d.jenis,
		//         jumlah    : d.jumlah,
		//         keterangan: d.keterangan,
		//         lokasi    : d.lokasi,
		//         nama      : d.nama,
		//         orderanId : id
		//       },
		//     } )
		//   ),
		//   prisma.orderan.update( {
		//     where: { id: data.id },
		//     data : {
		//       alamatPenerima: data.alamatPenerima,
		//       guna          : data.guna,
		//       hpPenerima    : data.hpPenerima,
		//       hpPengirim    : data.hpPenerima,
		//       id            : data.id,
		//       lokasi        : data.lokasi,
		//       namaPengiriman: data.namaPengiriman,
		//       ongkir        : data.ongkir,
		//       penerima      : data.penerima,
		//       pengirim      : data.pengirim,
		//       pesan         : new Date( data.pesan ),
		//       kirim         : new Date( data.kirim ),
		//       waktuKirim    : new Date( data.pesan + "T" + time + ".000Z" ),
		//       status        : data.status,
		//       totalBayar    : data.totalBayar,
		//       totalPenjualan: data.totalPenjualan,
		//       typePembayaran: data.typePembayaran,
		//     },
		//   } ),
		// ] );
	}

	async updateStatus(data: string, id: string,) {
		return prisma.orders.update({
			where: {id: id},
			data: {status: data}
		})
	}

}
