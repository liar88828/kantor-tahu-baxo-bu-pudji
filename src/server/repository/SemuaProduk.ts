import { prisma } from '../models/prisma/config';
import { Repository } from '@/server/repository/Abstract';
import type { TYPE } from '@/server/models/dataAccess/semuaProduk';
import type { IRepoSemuaProduk } from '@/interface/repository/SemuaProduk';
import { addDays, currentMonth, currentYear } from '@/lib/utils/formatDate';
import { TLines } from '@/entity/Dashboard';

export default class RepoSemuaProduk extends Repository<"semuaProduct"> implements IRepoSemuaProduk<TYPE> {
  async findDashboard( a: string = "test" ) {
    if( a === "false" ) {
      const falseFeature = (): void => {

        const monthlyUserCounts = prisma.orderan.groupBy( {
            by    : [ "pesan" ],
            _count: { pesan: true, },
            where : {
              pesan: {
                gte: new Date( `${ currentYear }-01-01` ),
                lte: new Date( `${ currentYear }-12-30` ),
              }
            },
          }
        )
        console.debug( monthlyUserCounts )

        const aggregatedData = prisma.semuaProduct.groupBy( {
          by     : [ 'nama' ],
          where  : {
            AND: [
              {
                created_at: {
                  gte: new Date( new Date().getFullYear(), new Date().getMonth() - 1, 1 ),
                  lt : new Date( new Date().getFullYear(), new Date().getMonth(), 1 ),
                },
              },
            ],
          },
          _sum   : {
            jumlah: true,
            harga : true,
          },
          orderBy: {
            _sum: {
              harga: 'desc',
            },
          },
        } );
        console.debug( aggregatedData )

        //--------------get jumlah lokasi
        const monthlyUserCounts1 = prisma.orderan.groupBy( {
            by    : [ "lokasi" ],
            _count: {
              lokasi: true,
            },
          }
        )
        console.debug( monthlyUserCounts1 )

        const tanggalSekarang = prisma.orderan.findMany( {
            where: {
              kirim: {
                gte: new Date( `${ currentYear }-${ currentMonth }-01` ),
                lte: new Date( `${ currentYear }-${ currentMonth }-30` ),
              }
            }
          }
        )
        console.debug( tanggalSekarang )

        //--------------get jumlah lokasi
        const monthlyUserCounts2 = prisma.orderan.count( {
          where: {
            created_at: {
              gte: new Date( `${ currentYear }-01-01` ),
              lte: new Date( `${ currentYear }-12-30` ),
            }
          },
        } )
        console.debug( monthlyUserCounts2 )
      }
      console.debug( falseFeature )

    }

    // untuk list card
    const semuaNotifyMonth = prisma.orderan.findMany( {
      where : {
        status: {
          contains: "irim"
        },
        // status:"Di Kirim",  ,

        kirim: {
          gte: addDays( -30 ),
          // lte: new Date( `${ currentYear }-${ currentMonth }-30` ),
        },
      },
      select: {
        id: true,
        //penerima
        penerima      : true,
        hpPenerima    : true,
        alamatPenerima: true,
        //
        pengirim      : true,
        namaPengiriman: true,

        //
        kirim         : true,
        pesan         : true,
        status        : true,
        typePembayaran: true,
        totalBayar    : true,
        waktuKirim    : true,
        semuaProduct  : true

      },
      take  : 100,
    } );

    // untuk donat Now Month
    const semuaProductCountNow = prisma.semuaProduct.groupBy( {
        by    : [ "nama" ],
        _count: { nama: true, },
        where : {
          created_at: {
            gte: addDays( -30 ),
            // lte: new Date( `${ currentYear }-${ currentMonth }-30` ),
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

    //untuk notify block status
    const semuaStatusOrder = prisma.orderan.groupBy( {
        by    : [ "status" ],
        _count: { status: true, },
        where : {
          created_at: {
            gte: addDays( -30 ),
            // lte: new Date( `${ currentYear }-${ currentMonth }-30` ),
          }
        },
      }
    )

    // return { data: monthlyUserCounts}.
    const transaction = await prisma.$transaction( [ semuaProductCountNow, semuaStatusOrder, semuaNotifyMonth, semuaProductCountLast, //aggregatedData
    ] )

    //untuk notif
    type TLine = {
      year: number,
      month: string,
      jumlah_pesanan: bigint
    }[];

    const monthlyUserCounts: TLine = await prisma.$queryRaw`
        SELECT YEAR(pesan)                AS year,
               MONTHNAME(pesan)           AS month,
               CAST(COUNT(*) AS UNSIGNED) AS jumlah_pesanan
        FROM tahu_baxo_bupudji.orderans
        WHERE YEAR(pesan) BETWEEN YEAR(CURRENT_DATE) - 3 AND YEAR(CURRENT_DATE)
        GROUP BY YEAR(pesan), MONTH(pesan)
        ORDER BY YEAR(pesan), MONTH(pesan);
    `

    type TAggregate = {
      nama: string
      total_jumlah_current: number
      total_jumlah_last: number
      total_harga_current: number
      total_harga_las: number
    };

    const aggregateProductPerMonth: TAggregate[] = await prisma.$queryRaw`
        SELECT nama,
               SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) THEN jumlah ELSE 0 END)     AS total_jumlah_current,
               SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) - 1 THEN jumlah ELSE 0 END) AS total_jumlah_last,
               SUM(IF(MONTH(created_at) = MONTH(CURRENT_DATE) - 2, jumlah,
                      0))                                                                        AS total_jumlah_last_two,
               SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) THEN harga ELSE 0 END)      AS total_harga_current,
               SUM(CASE WHEN MONTH(created_at) = MONTH(CURRENT_DATE) - 1 THEN harga ELSE 0 END)  AS total_harga_last,
               SUM(IF(MONTH(created_at) = MONTH(CURRENT_DATE) - 2, harga, 0))                    AS total_harga_last_two
        FROM tahu_baxo_bupudji.semuaproducts
        WHERE MONTH(created_at) BETWEEN MONTH(CURRENT_DATE) - 2 AND MONTH(CURRENT_DATE)
        GROUP BY nama;

    `

//untuk line
    const semuaOrderTahun: TLines[] = monthlyUserCounts.map( ( item ) => ( {
      ...item,
      jumlah_pesanan: Number( item.jumlah_pesanan )
    } ) );

    const semuaProductNow  = transaction[ 0 ]
    const semuaStatus      = transaction[ 1 ]
    const notifyMonth      = transaction[ 2 ]
    const semuaProductLast = transaction[ 3 ]

    return {
      semuaOrderTahun,//untuk line
      semuaProductNow,// untuk donat Now
      semuaProductLast,// untuk donat Last
      semuaStatus,// untuk notify block status
      notifyMonth,// untuk list card
      aggregate: aggregateProductPerMonth
    }

  }

  setOne( d: TYPE, id?: string ) {
    return {
      harga     : d.harga,
      id       : d.id || "null",
      img      : d.img || "no image",
      jenis     : d.jenis.replaceAll( " ", "" ),
      keterangan: d.keterangan.replaceAll( " ", "" ),
      lokasi    : d.lokasi.replaceAll( " ", "" ),
      jumlah    : d.jumlah,
      nama      : d.nama,
      orderanId: d.orderanId || id || "null"
    }
  }

  setMany( data: TYPE[], id?: string ): TYPE[] {
    return data.map( ( d: TYPE ) => this.setOne( d, id ) )
  }

  async paginate( data: { row: number, skip: number } ) {
    const { row, skip } = data
    return prisma.semuaProduct.findMany( { take: row, skip } )
  }

  async updateMany( data: TYPE[], id: string ) {
    return prisma.semuaProduct.updateMany( {
      where: { id: id }, data: this.setMany( data, id )
    } )
  }

  async destroyMany( id: string ) {
    return prisma.semuaProduct.deleteMany( { where: { id } } )
  }

  // async createMany( data: TYPE[], id: string ): Promise<any> {
  //   return prisma.semuaProduct.createMany( {
  //     data: this.setMany( data, id )
  //   } );
  // }

}
