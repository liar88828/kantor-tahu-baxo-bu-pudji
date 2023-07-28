import { z }               from 'zod';
import { TYPE as Travel }  from '@/server/models/dataAccess/Travel';
import { TYPE as Produk }  from '@/server/models/dataAccess/Produk';
import { TYPE as Orderan } from '@/server/models/dataAccess/Orderan';
import { TPProduk }        from '@/server/repository/interface/prisma';
import { TOrderServer }    from '@/entity/server/orderan';

export type ZTYPEid = z.ZodType<string>

export default class Validation {
  TravelSchema: z.ZodType<Travel> = z.object( {
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

  ProdukSchema: z.ZodType<Produk> = z.object( {
    id        : z.string(),
    nama      : z.string().min( 1 ),
    harga     : z.number().int().positive(),
    lokasi    : z.string().min( 1 ),
    jumlah    : z.number().int().positive(),
    img       : z.string(),
    keterangan: z.string(),
    jenis     : z.string(),
  } )

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

  OrderanSchema: z.ZodType<TOrderServer> = z.object( {
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

  Input<T>(
    data: T,
    Schema: z.ZodType<T, z.ZodTypeDef, T>
  ) {
    return Schema.safeParse( data )
  }
}


