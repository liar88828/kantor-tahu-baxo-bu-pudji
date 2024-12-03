import { addDays, currentMonth, currentYear } from '@/lib/utils/formatDate';
import { prisma, TPOrderan, } from '@/server/models/prisma/config';
import { TOptional } from '@/entity/server/types';
import { TAggregate, TLine, TLines, TStatus } from '@/entity/Dashboard';
import { IRepoOrderan } from '@/interface/repository/Orderan';

import { ARepository } from '@/server/repository/ARepository';
import { TStatusParams } from '@/interface/repository/SemuaProduk';

type TYPE = TPOrderan
export default class RepoOrderan extends ARepository<"orderan"> implements IRepoOrderan<TYPE> {

// getAll data from database
  getSelect() {
    return {
      id            : true,
      pengirim      : true,
      hpPengirim    : true,
      penerima      : true,
      alamatPenerima: true,
      hpPenerima    : true,
      pesan         : true,
      kirim         : true,
      waktuKirim    : true,
      guna          : true,
      lokasi        : true,
      namaPengiriman: true,
      ongkir        : true,
      typePembayaran: true,
      totalBayar    : true,
      totalPenjualan: true,
      status        : true,
      semuaProduct  : {
        select: {
          id        : true,
          nama      : true,
          lokasi    : true,
          jenis     : true,
          harga     : true,
          jumlah    : true,
          keterangan: true,
          orderanId : true,
        }
      }
    };
  }

  setOne( d: Omit<TYPE, "semuaProduct"> ) {
    d.waktuKirim = !d.waktuKirim ? new Date() : d.waktuKirim
    d.pesan      = !d.pesan ? new Date() : d.pesan
    d.kirim      = !d.kirim ? new Date() : d.kirim

    const time = ( d.waktuKirim.toString().length === 5 )
                 ? d.waktuKirim + ":00"
                 : d.waktuKirim
    // console.log(new Date( d.pesan ),)
    return {
      alamatPenerima: d.alamatPenerima,
      guna          : d.guna,
      hpPenerima    : d.hpPenerima,
      hpPengirim: d.hpPengirim,
      id            : d.id,
      lokasi        : d.lokasi.replaceAll( " ", "" ),
      namaPengiriman: d.namaPengiriman,
      ongkir        : d.ongkir,
      penerima      : d.penerima,
      pengirim      : d.pengirim,
      pesan         : new Date( d.pesan ),
      kirim         : new Date( d.kirim ),
      waktuKirim: new Date( d.kirim + "T" + time + ".000Z" ),
      status        : d.status,
      totalBayar    : d.totalBayar,
      totalPenjualan: d.totalPenjualan,
      typePembayaran: d.typePembayaran,
    }
  }

  setMany( data: TYPE, method: "POST" | "PUT" ) {
    return data.semuaProduct.map( ( d: TProOrderan ) => (
        Object.assign( {
          harga     : d.harga,
          id        : method === "PUT" ? d.id : d.id + "_" + Date.now(),
          jenis     : d.jenis.replaceAll( " ", "" ),
          jumlah    : d.jumlah,
          keterangan: d.keterangan,
          lokasi    : d.lokasi.replaceAll( " ", "" ),
          img       : d.img,
          nama      : d.nama,
          orderanId : data.id
        } )
      )
    );
  }

  // ---------CREATE
  async createOne( data: TYPE, ) {

    const one = prisma.orderan.create( {
      data: this.setOne( data )
    } )

    const many  = prisma.semuaProduct.createMany( {
      data: this.setMany( data, "POST" )
    } )
    return await prisma.$transaction( [ one, many ] )
  }

  async findById( id: string ) {
    return prisma.orderan.findUnique( {
      where  : { id },
      include: { semuaProduct: true }
    } )
  }

  async findAll() {
    return prisma.orderan.findMany( {
      select: this.getSelect(),
      take   : 100,
      orderBy: {
        created_at: "desc"
      },
    } )
  }

  async findDashboard( a: string ) {
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
      where: {
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

    const monthlyUserCounts: TLine[] = await prisma.$queryRaw`
        SELECT YEAR(pesan)                AS year,
               MONTHNAME(pesan)           AS month,
               CAST(COUNT(*) AS UNSIGNED) AS jumlah_pesanan
        FROM tahu_baxo_bupudji.orderans
        WHERE YEAR(pesan) BETWEEN YEAR(CURRENT_DATE) - 3 AND YEAR(CURRENT_DATE)
        GROUP BY YEAR(pesan), MONTH(pesan)
        ORDER BY YEAR(pesan), MONTH(pesan);
    `

    const aggregate: TAggregate[] = await prisma.$queryRaw`
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

    const semuaProductNow        = transaction[ 0 ]
    const semuaStatus: TStatus[] = transaction[ 1 ]
    const notifyMonth            = transaction[ 2 ]
    const semuaProductLast       = transaction[ 3 ]

    const send = {
      semuaOrderTahun,//untuk line
      semuaProductNow,// untuk donat Now
      semuaProductLast,// untuk donat Last
      semuaStatus,// untuk notify block status
      notifyMonth,// untuk list card
      aggregate
    }
    return send

  }

  async findByStatus( status: TYPE["status"] ) {
    let option = {
      include: { semuaProduct: true }
    }

    if( status !== "Semua" ) {
      option = Object.assign( option, { where: { status } } )
    }

    return prisma.orderan.findMany( option )
  }

  async createNesting( data: TYPE ) {
    return prisma.orderan.create( {
      data:
        Object.assign( this.setOne( data ),
          {
            semuaProduct: {
              createMany: {
                data: this.setMany( data, "POST" )
              }
            },
          }, ),

      include: {
        semuaProduct: true, // Include all posts in the returned object
      },
    } )

  }

  async paginate( data: {
    row: number,
    skip: number
  } ) {
    const { row, skip } = data
    return prisma.orderan.findMany( { take: row, skip } )
  }

  // -----DELETE
  async destroyMany( array: string [] ) {
    const id            = array.map( d => d )
    const deleteOrder   = prisma.orderan.deleteMany( { where: { id: { in: id } } } )
    const deleteProduct = prisma.semuaProduct.deleteMany( { where: { orderanId: { in: id } } } )
    return await prisma.$transaction( [ deleteProduct, deleteOrder ] )
  }

  // -----DELETE
  async destroyOne( id: string ) {
    // console.log( id )
    // console.log( "one" )
    const delete1 = prisma.orderan.delete( {
      where : { id: id },
      select: { semuaProduct: true }
    } )

    const deleteMany = prisma.semuaProduct.deleteMany( {
      where: { orderanId: id },
    } )
    return prisma.$transaction( [ deleteMany, delete1 ] )
  }

  async updateMany( data: TYPE, id: string, ) {

    const updateData = prisma.orderan.update( {
      where: { id },
      data: this.setOne( data )
    } );

    const createMany = prisma.semuaProduct.createMany( {
      data: this.setMany( data, "POST" )
    } )

    const deleteProduct = prisma.semuaProduct.deleteMany( { where: { orderanId: id } } )
    return await prisma.$transaction( [ deleteProduct, createMany, updateData ] )
  }

  async updateOneOnly( data: Partial<TOptional>, id: string, ) {
    return prisma.orderan.update( { where: { id: id }, data },
    )
  }

  async updateOne( data: TYPE, id: string, ) {
    // console.log(data)
    return prisma.orderan.update( {
        where: { id: id },
      data: this.setOne( data, )
      }
    )

  }

  async UpdateOneEx( data: TYPE, id: string, ) {
    data.waktuKirim = !data.waktuKirim ? new Date() : data.waktuKirim
    data.pesan      = !data.pesan ? new Date() : data.pesan
    data.kirim      = !data.kirim ? new Date() : data.kirim
    const time      = ( data.waktuKirim.toString().length === 5 )
                      ? data.waktuKirim + ":00"
                      : data.waktuKirim

    return await prisma.$transaction( [
      ...data.semuaProduct.map( d =>
        prisma.semuaProduct.updateMany( {
          where: { id: d.id },
          data : {
            harga     : d.harga,
            jenis     : d.jenis,
            jumlah    : d.jumlah,
            keterangan: d.keterangan,
            lokasi    : d.lokasi,
            nama      : d.nama,
            orderanId : id
          },
        } )
      ),
      prisma.orderan.update( {
        where: { id: data.id },
        data : {
          alamatPenerima: data.alamatPenerima,
          guna          : data.guna,
          hpPenerima    : data.hpPenerima,
          hpPengirim    : data.hpPenerima,
          id            : data.id,
          lokasi        : data.lokasi,
          namaPengiriman: data.namaPengiriman,
          ongkir        : data.ongkir,
          penerima      : data.penerima,
          pengirim      : data.pengirim,
          pesan         : new Date( data.pesan ),
          kirim         : new Date( data.kirim ),
          waktuKirim    : new Date( data.pesan + "T" + time + ".000Z" ),
          status        : data.status,
          totalBayar    : data.totalBayar,
          totalPenjualan: data.totalPenjualan,
          typePembayaran: data.typePembayaran,
        },
      } ),
    ] );
  }

  async updateStatus( data: TStatusParams, id: string, ) {
    // console.log(data)
    return prisma.orderan.update( {
      where: { id: id },
      data : { status: data.status }
    } )
  }

}
