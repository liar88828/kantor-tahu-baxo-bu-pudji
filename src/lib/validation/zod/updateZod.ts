import { z } from 'zod';
import { Prisma, } from '../../../../prisma/data';

export class UpdateZod {
  // master
  static BankSchema = z.object( {
    id        : z.string( { required_error: 'ID is required', } ).optional(),
    hp        : z.string( { required_error: 'Hp is required', } ).min( 2 ).max( 30 ),
    img       : z.string( { required_error: 'Img is required', } ).min( 2 ).max( 200 ),
    no        : z.string( { required_error: 'No is required', } ).min( 2 ).max( 30 ),
    nama      : z.string( { required_error: 'nama is required', } ).min( 2 ).max( 30 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 2 ).max( 30 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 2 ).max( 30 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 2 ).max( 300 ),
  } ) satisfies z.Schema<Prisma.BankUpdateInput>

  static ProductSchema = z.object( {
    id        : z.string( { required_error: 'ID is required', } ).optional(),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    nama      : z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    harga     : z.number( { required_error: 'Harga is required', } ).nonnegative(),
    img       : z.string( { required_error: 'Img is required', } ).min( 1 ).max( 100 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    jumlah    : z.number( { required_error: 'Jumlah is required', } ).int().nonnegative(),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ).max( 200 ),
  } ) satisfies z.Schema<Prisma.ProductCreateInput>

  static DeliverySchema = z.object( {
    id        : z.string( { required_error: 'Id is required', } ).optional(),
    nama      : z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    hp        : z.string( { required_error: 'Hp is required', } ).min( 1 ).max( 100 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    img       : z.string( { required_error: 'Img is required', } ).min( 1 ).max( 300 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ),
    harga     : z.number( { required_error: 'Harga is required', } ).int().nonnegative(),
  } )satisfies z.Schema<Prisma.DeliveryUpdateInput>

  static semuaProdukSchema = UpdateZod.ProductSchema.merge(
    z.object( {
      orderanId: z.string().min( 1 ).optional(),
    } ) )satisfies z.Schema<Prisma.SemuaProductCreateInput>

  static OrderanSchema = z.object( {
    id            : z.string( { required_error: 'ID is required', } ).optional(),
    dari          : z.string( { required_error: 'dari is required', } ).min( 1 ).max( 100 ),
    namaPengiriman: z.string( { required_error: 'namaPengiriman is required', } ).min( 1 ).max( 100 ),
    pesan         : z.string( { required_error: 'Pesan is required', } ).min( 1 ).max( 100 ),
    waktuKirim    : z.string( { required_error: 'waktuKirim is required', } ).min( 1 ).max( 100 ),
    pengirim      : z.string( { required_error: 'pengirim is required', } ).min( 1 ).max( 100 ),
    hpPengirim    : z.string( { required_error: 'hpPengirim is required', } ).min( 1 ).max( 100 ),
    penerima      : z.string( { required_error: 'penerima is required', } ).min( 1 ).max( 100 ),
    alamatPenerima: z.string( { required_error: 'alamatPenerima is required', } ).min( 1 ).max( 100 ),
    hpPenerima    : z.string( { required_error: 'hpPenerima is required', } ).min( 1 ).max( 100 ),
    guna          : z.string( { required_error: 'guna is required', } ).min( 1 ).max( 400 ),
    lokasi        : z.string( { required_error: 'lokasi is required', } ).min( 1 ).max( 100 ),
    typePembayaran: z.string( { required_error: 'typePembayaran is required', } ).min( 1 ).max( 100 ),
    status        : z.string( { required_error: 'status is required', } ).min( 1 ).max( 100 ),
    //
    ongkir        : z.number( { required_error: ' ongkir is required', } ).int().nonnegative(),
    totalBayar    : z.number( { required_error: ' totalBayar is required', } ).int().nonnegative(),
    totalPenjualan: z.number( { required_error: ' totalPenjualan is required', } ).int().nonnegative(),
    semuaProduct  : z.array( this.semuaProdukSchema )
  } )satisfies z.Schema<Omit<Prisma.OrderanUpdateArgs['data'], 'semuaProduct'>>

}

export type TUPDATEBANK = z.infer<typeof UpdateZod.BankSchema>;
export type TUPDATEDELIVER = z.infer<typeof UpdateZod.DeliverySchema>;
export type TUPDATEORDERAN = z.infer<typeof UpdateZod.OrderanSchema>;
export type TUPDATEPRODUCT = z.infer<typeof UpdateZod.ProductSchema>;