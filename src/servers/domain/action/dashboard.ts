import { prisma } from '@/servers/data-source/prisma/config';
import { addDays, currentMonth, currentYear } from '@/lib/utils/formatDate';
import { TAggregate, TDonat, TLine, TLines } from '@/entity/Dashboard';
import { TStatusProduk } from '@/app/style/status';
import { dashboard } from '@/servers/data-source/prisma/Dashboard';

export const getPrisma = async () => {

  // untuk donat Now Month
  const semuaProductCountNow = prisma.semuaProduct.groupBy( {
      by    : [ "nama" ],
      _count: { nama: true, },
      where : {
        created_at: {
          gte: addDays( -30 ),
        }
      },
    }
  )

  // untuk donat Now Month Last
  const semuaProductCountLast = prisma.semuaProduct.groupBy( {
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

  const transaction = await prisma.$transaction( [ semuaProductCountNow, semuaProductCountLast, ] )

  // untuk Line/ jumlah pembeli perbulan
  const monthlyUserCounts: TLine[] = await prisma.$queryRaw`
      SELECT YEAR(pesan)                AS year,
             MONTHNAME(pesan)           AS month,
             CAST(COUNT(*) AS UNSIGNED) AS jumlah_pesanan
      FROM tahu_baxo_bupudji.orderans
      WHERE YEAR(pesan) BETWEEN YEAR(CURRENT_DATE) - 3 AND YEAR(CURRENT_DATE)
      GROUP BY YEAR(pesan), MONTH(pesan)
      ORDER BY YEAR(pesan), MONTH(pesan);
  `

  const aggregateProductPerMonth: TAggregate[] = await prisma.$queryRaw`
      SELECT nama,
             SUM(IF(MONTH(created_at) = MONTH(CURRENT_DATE), jumlah, 0))     AS total_jumlah_current,
             SUM(IF(MONTH(created_at) = MONTH(CURRENT_DATE) - 1, jumlah, 0)) AS total_jumlah_last,
             SUM(IF(MONTH(created_at) = MONTH(CURRENT_DATE) - 2, jumlah, 0)) AS total_jumlah_last_two,
             SUM(IF(MONTH(created_at) = MONTH(CURRENT_DATE), harga, 0))      AS total_harga_current,
             SUM(IF(MONTH(created_at) = MONTH(CURRENT_DATE) - 1, harga, 0))  AS total_harga_last,
             SUM(IF(MONTH(created_at) = MONTH(CURRENT_DATE) - 2, harga, 0))  AS total_harga_last_two
      FROM tahu_baxo_bupudji.semuaproducts
      WHERE MONTH(created_at) BETWEEN MONTH(CURRENT_DATE) - 2 AND MONTH(CURRENT_DATE)
      GROUP BY nama;

  `

//untuk line
  const semuaOrderTahun: TLines[] = monthlyUserCounts.map( ( item ) => ( {
    ...item,
    jumlah_pesanan: Number( item.jumlah_pesanan )
  } ) );

  const aggregate: TAggregate[] = aggregateProductPerMonth.map( ( item ) => ( {
    ...item,
    total_harga_current : Number( item.total_harga_current ),
    total_harga_last    : Number( item.total_harga_last ),
    total_harga_last_two: Number( item.total_harga_last_two ),
    //
    total_jumlah_current : Number( item.total_jumlah_current ),
    total_jumlah_last_two: Number( item.total_jumlah_last_two ),
    total_jumlah_last    : Number( item.total_jumlah_last ),
  } ) );

  const semuaProductNow: TDonat[] = transaction[ 0 ]
  // const semuaStatus      = transaction[ 1 ]
  // const notifyMonth: TListCard[]   = transaction[ 1 ]
  const semuaProductLast: TDonat[] = transaction[ 1 ]

  return {
    semuaOrderTahun,//untuk line
    semuaProductNow,// untuk donat Now
    semuaProductLast,// untuk donat Last
    aggregate
  }
}

export const statusNotify = () => dashboard.statusNotify()

export const statusPesanan = ( status: TStatusProduk = "irim" ) => dashboard.statusPesanan( status )

// export const semuaOrderTahun = () => dashboard.semuaOrderTahun()
//
// export const semuaProductLast = () => dashboard.semuaProductLast()
//
// export const semuaProductNow = () => dashboard.semuaProductNow()
//
// export const aggregateProductPerMonth = () => dashboard.aggregateProductPerMonth()

