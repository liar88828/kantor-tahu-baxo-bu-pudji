import { z } from 'zod';
import { TYPE as Travel } from '@/server/models/dataAccess/Travel';
import { TOrderServer } from '@/entity/server/orderan';

export default class Validation {

  ServiceProduk: z.ZodType<TProduct> = z.object( {
    id        : z.string().min( 1 ),
    nama      : z.string().min( 1 ),
    lokasi    : z.string().min( 1 ),
    jenis     : z.string().min( 1 ),
    img       : z.string().min( 1 ),
    keterangan: z.string().min( 1 ),
    harga     : z.number().int().nonnegative(),
    jumlah    : z.number().int().nonnegative(),
  } )

  TravelSchema: z.ZodType<Travel> = z.object( {
    id        : z.string().min( 1 ),
    namaPengiriman: z.string().min( 1 ),
    noHpPerusahaan: z.string().min( 1 ),
    lokasi        : z.string().min( 1 ),
    jenis     : z.string().min( 1 ),
    img       : z.string().min( 1 ),
    keterangan: z.string().min( 1 ),
    harga     : z.number().int().nonnegative(),
  } )

  ProductOnly = z.object( {
    id        : z.string().min( 1 ).optional(),
    nama      : z.string().min( 1 ),
    lokasi    : z.string().min( 1 ),
    keterangan: z.string().min( 1 ),
    jenis     : z.string().min( 1 ),
    harga     : z.number().int().nonnegative(),
    jumlah    : z.number().int().nonnegative(),
  } )

  ProdukSchema = this.ProductOnly.merge(
    z.object( {
      img: z.string().min( 1 )
    } ) )

  semuaProduk = this.ProductOnly.merge(
    z.object( {
      orderanId: z.string().min( 1 ),

      img: z.string().min( 1 )

    } ) )

  OrderanSchema: z.ZodType<TOrderServer> = z.object( {
    pesan         : z.string( { required_error: 'Pesan is required', } ).min( 1 ),
    kirim         : z.string( { required_error: 'kirim is required', } ).min( 1 ),
    waktuKirim    : z.string( { required_error: 'waktuKirim is required', } ).min( 1 ),
    pengirim      : z.string( { required_error: 'pengirim is required', } ).min( 1 ),
    hpPengirim    : z.string( { required_error: 'hpPengirim is required', } ).min( 1 ),
    penerima      : z.string( { required_error: 'penerima is required', } ).min( 1 ),
    alamatPenerima: z.string( { required_error: 'alamatPenerima is required', } ).min( 1 ),
    hpPenerima    : z.string( { required_error: 'hpPenerima is required', } ).min( 1 ),
    guna          : z.string( { required_error: 'guna is required', } ).min( 1 ),
    lokasi        : z.string( { required_error: 'lokasi is required', } ).min( 1 ),
    namaPengiriman: z.string( { required_error: 'namaPengiriman is required', } ).min( 1 ),
    id: z.string( { required_error: 'ID is required', } ).min( 30 ).max( 45 ),
    typePembayaran: z.string( { required_error: 'typePembayaran is required', } ).min( 1 ),
    status        : z.string( { required_error: 'status is required', } ).min( 1 ),
    //
    ongkir           : z.number( { required_error: ' ongkir is required', } ).int().nonnegative(),
    totalBayar       : z.number( { required_error: ' totalBayar is required', } ).int().nonnegative(),
    totalPenjualan   : z.number( { required_error: ' totalPenjualan is required', } ).int().nonnegative(),
    semuaHargaOrderan: z.number( { required_error: ' semuaHargaOrderan is required', } ).int().nonnegative(),
    semuaHargaItem   : z.number( { required_error: ' semuaHargaItem is required', } ).int().nonnegative(),
    semuaHargaProduct: z.number( { required_error: ' semuaHargaProduct is required', } ).int().nonnegative(),
    totalHarga       : z.number( { required_error: ' totalHarga is required', } ).int().nonnegative(),
    semuaProduct     : z.array( this.semuaProduk )
  } )

  ZIdMany: z.ZodType<string[]> = z.array(
    z.string( { required_error: "Is Not String" } )
     .min( 30 )
     .max( 41 )
  )

// : z.ZodType<Produk>
  Produk() {return this.ProdukSchema}

  ZFindById( id: string ) {
    return z.string( { required_error: 'Pesan is required', } ).safeParse( id )
  }

  async Input<T>(
    data: T,
    Schema: z.ZodType<T, z.ZodTypeDef, T>
  ) {
    return Schema.safeParse( data )
  }
}


