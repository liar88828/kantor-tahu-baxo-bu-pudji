import { z }            from 'zod';
import { TPProduk }     from '@/server/repository/interface/prisma';
import { TOrderServer } from '@/entity/server/orderan';
import { TYPE }         from '@/server/models/dataAccess/Travel';

export type ZTYPEid = z.ZodType<string>
export default class Validation {
  TravelSchema: z.ZodType<TYPE> = z.object( {
    id            : z.string(),
    namaPengiriman: z.string().min( 1 ),
    noHpPerusahaan: z.string().min( 1 ),
    lokasi        : z.string().min( 1 ),
    jenis         : z.string(),
    harga         : z.number().int().positive(),
    img           : z.string(),
    keterangan    : z.string(),
  } )

  ZFindById( id: string ) {
    return z.string().safeParse( id )
  }

  TravelInput( data: TYPE, Schema: z.ZodType<TYPE, z.ZodTypeDef, TYPE> ) {
    return Schema.safeParse( data )
  }

  Produk(): z.ZodType<TPProduk> {
    return z.object( {
      id        : z.string(),
      nama      : z.string().min( 1 ),
      harga     : z.number().int().positive(),
      lokasi    : z.string().min( 1 ),
      jumlah    : z.number().int().positive(),
      img       : z.string(),
      keterangan: z.string(),
      jenis     : z.string(),
      // jenis: z.enum(["Orderan","Item"]),
    } )
  }

  Orderan(): z.ZodType<TOrderServer> {
    return z.object( {
      pesan     : z.string(),
      kirim     : z.string(),
      waktuKirim: z.string(),
      // data orang
      pengirim      : z.string(),
      hpPengirim    : z.string(),
      penerima      : z.string(),
      alamatPenerima: z.string(),
      hpPenerima    : z.string(),
      guna          : z.string(),
      lokasi        : z.string(),
      namaPengiriman: z.string(),
      ekspedisi     : z.string(),
      ongkir        : z.number().int().positive(),
      id            : z.string(),
      no            : z.string(),
      typePembayaran: z.string(),
      total         : z.number().int().positive(),
      totalBayar    : z.number().int().positive(),
      totalPenjualan: z.number().int().positive(),
      status        : z.string(),
      //total
      semuaHargaOrderan: z.number().int().positive(),
      semuaHargaItem   : z.number().int().positive(),
      semuaHargaProduct: z.number().int().positive(),
      totalHarga       : z.number().int().positive(),
      semuaProduct     : z.array( this.Produk() )
    } )

  }
}

