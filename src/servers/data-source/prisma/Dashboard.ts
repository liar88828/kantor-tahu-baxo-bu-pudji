import prisma from '@/servers/data-source/prisma/config';
import { addDays, currentMonth, currentYear } from '@/lib/utils/formatDate';
import { TStatusProduk } from '@/app/style/status';
import { TAggregate, TLine, TLines } from '@/interface/Dashboard';

class DashboardData {
  async statusNotify() {
    return prisma.orderan.groupBy( {
      by    : [ "status" ],
      _count: { status: true, },
      where : {
        waktuKirim: {
          gte: addDays( -30 ),
        }
      }
    } )
  }

  async updateStatus( option: string, id: string, ) {
    return prisma.orderan.update( {
      where: { id: id },
      data : { status: option }
    } )
  }

  async statusPesanan( status: TStatusProduk = "irim" ) {
    return prisma.orderan.findMany( {
      where : {
        status: {
          contains: status
        },
        waktuKirim: {
          gte: addDays( -30 ),
        },
      },
      select: {
        id            : true,
        penerima      : true,
        hpPenerima    : true,
        alamatPenerima: true,
        pengirim      : true,
        namaPengiriman: true,
        pesan         : true,
        status        : true,
        typePembayaran: true,
        totalBayar    : true,
        waktuKirim    : true,
        semuaProduct  : true

      },
      take  : 100,
    } );
  }

  async semuaOrderTahun() {
    const monthlyUserCounts: TLine[] = await prisma.$queryRaw`
        SELECT EXTRACT(YEAR FROM pesan)  AS year,
               EXTRACT(MONTH FROM pesan) AS month,
               COUNT(*)                  AS jumlah_pesanan
        FROM "Orderans"
        WHERE EXTRACT(YEAR FROM pesan) BETWEEN EXTRACT(YEAR FROM CURRENT_DATE) - 3 AND EXTRACT(YEAR FROM CURRENT_DATE)
        GROUP BY EXTRACT(YEAR FROM pesan), EXTRACT(MONTH FROM pesan)
        ORDER BY EXTRACT(YEAR FROM pesan), EXTRACT(MONTH FROM pesan);
    `

    const semuaOrderTahun: TLines[] = monthlyUserCounts.map( ( item ) => ( {
      ...item,
      jumlah_pesanan: Number( item.jumlah_pesanan )
    } ) );
    return semuaOrderTahun
  }

  async semuaProductLast() {
    return prisma.semuaProduct.groupBy( {
        by    : [ "nama" ],
        _count: { nama: true, },
        where : {
          created_at: {
            gte: new Date( `${ currentYear }-${ currentMonth === 0 ? 12 : currentMonth - 1 }-01` ),
            lte: new Date( `${ currentYear }-${ currentMonth === 0 ? 12 : currentMonth - 1 }-30` ),
          }
        },
      }
    )
  }

  async semuaProductNow() {
    return prisma.semuaProduct.groupBy( {
        by    : [ "nama" ],
        _count: { nama: true, },
        where : {
          created_at: {
            gte: addDays( -30 ),
          }
        },
      }
    )
  }

  async aggregateProductPerMonth() {
    const aggregateProductPerMonth: TAggregate[] = await prisma.$queryRaw`
        SELECT nama,
               SUM(CASE
                       WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) THEN jumlah
                       ELSE 0 END)                                                                                    AS total_jumlah_current,
               SUM(CASE
                       WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) - 1 THEN jumlah
                       ELSE 0 END)                                                                                    AS total_jumlah_last,
               SUM(CASE
                       WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) - 2 THEN jumlah
                       ELSE 0 END)                                                                                    AS total_jumlah_last_two,
               SUM(CASE
                       WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) THEN harga
                       ELSE 0 END)                                                                                    AS total_harga_current,
               SUM(CASE
                       WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) - 1 THEN harga
                       ELSE 0 END)                                                                                    AS total_harga_last,
               SUM(CASE
                       WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) - 2 THEN harga
                       ELSE 0 END)                                                                                    AS total_harga_last_two
        FROM "SemuaProducts"
        WHERE EXTRACT(MONTH FROM created_at) BETWEEN EXTRACT(MONTH FROM CURRENT_DATE) - 2 AND EXTRACT(MONTH FROM CURRENT_DATE)
        GROUP BY nama;

    `
    const aggregate: TAggregate[]                = aggregateProductPerMonth.map( ( item ) => ( {
      ...item,
      total_harga_current : Number( item.total_harga_current ),
      total_harga_last    : Number( item.total_harga_last ),
      total_harga_last_two: Number( item.total_harga_last_two ),
      //
      total_jumlah_current : Number( item.total_jumlah_current ),
      total_jumlah_last_two: Number( item.total_jumlah_last_two ),
      total_jumlah_last    : Number( item.total_jumlah_last ),
    } ) );

    return aggregate
  }

}

export const dashboard = new DashboardData()