import { z } from 'zod';
import { TPBank, TPProduct, TPSemuaProduct, TPTravel } from '@/server/models/prisma/config';


export default class ValidationSchema {

  // master
  BankSchema: z.ZodType<TPBank> = z.object( {
    id        : z.string( { required_error: 'ID is required', } ).min( 1 ).max( 100 ).optional(),
    hp        : z.string( { required_error: 'Hp is required', } ).min( 2 ).max( 30 ),
    img       : z.string( { required_error: 'Hp is required', } ).min( 2 ).max( 200 ),
    no        : z.string( { required_error: 'No is required', } ).min( 2 ).max( 30 ),
    nama      : z.string( { required_error: 'nama is required', } ).min( 2 ).max( 30 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 2 ).max( 30 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 2 ).max( 30 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 2 ).max( 300 ),
  } )

  ProductSchema: z.ZodType<TPProduct> = z.object( {
    id: z.string( { required_error: 'ID is required', } ).min( 1 ).max( 100 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    nama      : z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    harga     : z.number( { required_error: 'Harga is required', } ).int().nonnegative(),
    img       : z.string( { required_error: 'Img is required', } ).min( 1 ).max( 100 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    jumlah    : z.number( { required_error: 'Jumlah is required', } ).int().nonnegative(),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ).max( 200 ),
  } )

  TravelSchema: z.ZodType<TPTravel> = z.object( {
    id : z.string( { required_error: 'Id is required', } ).min( 1 ).max( 100 ),
    nama      : z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    hp        : z.string( { required_error: 'Hp is required', } ).min( 1 ).max( 100 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    img: z.string( { required_error: 'Img is required', } ).min( 1 ).max( 300 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ),
    harga     : z.number( { required_error: 'Harga is required', } ).int().nonnegative(),
  } )

  ProductOnly = z.object( {
    id        : z.string( { required_error: 'ID is required', } ).min( 1 ).max( 100 ).optional(),
    nama      : z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ).max( 300 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    harga     : z.number( { required_error: 'Harga is required', } ).int().nonnegative(),
    jumlah    : z.number( { required_error: 'Jumlah is required', } ).int().nonnegative(),
  } )

  // ProdukModel = this.ProductOnly.merge( z.object( {
  //   img: z.string().min( 1 ).max( 100 )
  // } ) )

  semuaProdukSchema: z.ZodType<TPSemuaProduct> = this.ProductOnly.merge( z.object( {
    orderanId: z.string().min( 1 ).max( 100 ),
    img      : z.string().min( 1 ).max( 100 )

  } ) )

  OrderanSchema: z.ZodType<TOrderServer> = z.object( {
    pesan         : z.string( { required_error: 'Pesan is required', } ).min( 1 ).max( 100 ),
    kirim         : z.string( { required_error: 'kirim is required', } ).min( 1 ).max( 100 ),
    waktuKirim    : z.string( { required_error: 'waktuKirim is required', } ).min( 1 ).max( 100 ),
    pengirim      : z.string( { required_error: 'pengirim is required', } ).min( 1 ).max( 100 ),
    hpPengirim    : z.string( { required_error: 'hpPengirim is required', } ).min( 1 ).max( 100 ),
    penerima      : z.string( { required_error: 'penerima is required', } ).min( 1 ).max( 100 ),
    alamatPenerima: z.string( { required_error: 'alamatPenerima is required', } ).min( 1 ).max( 100 ),
    hpPenerima    : z.string( { required_error: 'hpPenerima is required', } ).min( 1 ).max( 100 ),
    guna: z.string( { required_error: 'guna is required', } ).min( 1 ).max( 300 ),
    lokasi        : z.string( { required_error: 'lokasi is required', } ).min( 1 ).max( 100 ),
    namaPengiriman: z.string( { required_error: 'namaPengiriman is required', } ).min( 1 ).max( 100 ),
    id  : z.string( { required_error: 'ID is required', } ).min( 1 ).max( 100 ).max( 100 ),
    typePembayaran: z.string( { required_error: 'typePembayaran is required', } ).min( 1 ).max( 100 ),
    status        : z.string( { required_error: 'status is required', } ).min( 1 ).max( 100 ),
    //
    ongkir        : z.number( { required_error: ' ongkir is required', } ).int().nonnegative(),
    totalBayar    : z.number( { required_error: ' totalBayar is required', } ).int().nonnegative(),
    totalPenjualan: z.number( { required_error: ' totalPenjualan is required', } ).int().nonnegative(),
    semuaProduct  : z.array( this.semuaProdukSchema )
  } )

  ZIdMany: z.ZodType<string[]> = z.array( z.string( { required_error: "Is Not Array of string" } ).min( 10 ).max( 45 ) )

}
export const vSchema = new ValidationSchema()
