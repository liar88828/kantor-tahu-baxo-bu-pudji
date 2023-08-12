import { z } from 'zod';
import { TYPE as Travel } from '@/server/models/dataAccess/Travel';
import { TOrderServer } from '@/entity/server/orderan';

export default class Validation {

  ServiceProduk: z.ZodType<TProduct> = z.object( {
    id    : z.string().min( 1 ),
    nama  : z.string().min( 1 ),
    harga : z.number().int().positive(),
    lokasi: z.string().min( 1 ),
    jumlah: z.number().int().positive(),
    // jenis: z.enum(["Orderan","Item"]),
    jenis     : z.string(),
    img       : z.string(),
    keterangan: z.string()
  } )

  userSchema = z.object( {
    name: z.string(),
    age : z.number(),
  } );

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

  ProductOnly = z.object( {
    id    : z.string().optional(),
    nama  : z.string(),
    lokasi: z.string(),
    keterangan: z.string(),
    jenis     : z.string(),
    harga : z.number().int().positive(),
    jumlah: z.number().int().positive(),
  } )

  ProdukSchema = this.ProductOnly.merge(
    z.object( {
      img: z.string()
    } ) )

  semuaProduk = this.ProductOnly.merge(
    z.object( {
      orderanId: z.string()
    } ) )

  OrderanSchema: z.ZodType<TOrderServer> = z.object( {
    pesan         : z.string( { required_error: 'Pesan is required', } ),
    kirim         : z.string( { required_error: 'kirim is required', } ),
    waktuKirim    : z.string( { required_error: 'waktuKirim is required', } ),
    pengirim      : z.string( { required_error: 'pengirim is required', } ),
    hpPengirim    : z.string( { required_error: 'hpPengirim is required', } ),
    penerima      : z.string( { required_error: 'penerima is required', } ),
    alamatPenerima: z.string( { required_error: 'alamatPenerima is required', } ),
    hpPenerima    : z.string( { required_error: 'hpPenerima is required', } ),
    guna          : z.string( { required_error: 'guna is required', } ),
    lokasi        : z.string( { required_error: 'lokasi is required', } ),
    namaPengiriman: z.string( { required_error: 'namaPengiriman is required', } ),
    id: z.string( { required_error: 'ID is required', } ),
    no: z.string( { required_error: 'No is required', } ),
    typePembayaran: z.string( { required_error: 'typePembayaran is required', } ),
    // keterangan    : z.string( { required_error: 'keterangan is required', }
    // ),
    status: z.string( { required_error: 'status is required', } ),
    ongkir: z.number( { required_error: ' ongkir is required', } )
             .int()
             .positive(),

    totalBayar       : z.number( { required_error: ' totalBayar is required', } )
                        .int()
                        .positive(),
    totalPenjualan   : z.number( { required_error: ' totalPenjualan is required', } )
                        .int()
                        .positive(),
    semuaHargaOrderan: z.number( { required_error: ' semuaHargaOrderan is required', } )
                        .int()
                        .positive(),
    semuaHargaItem   : z.number( { required_error: ' semuaHargaItem is required', } )
                        .int()
                        .positive(),
    semuaHargaProduct: z.number( { required_error: ' semuaHargaProduct is required', } )
                        .int()
                        .positive(),
    totalHarga       : z.number( { required_error: ' totalHarga is required', } )
                        .int()
                        .positive(),
    semuaProduct     : z.array( this.semuaProduk )
  } )

// : z.ZodType<Produk>
  Produk() {return this.ProdukSchema}

  ZFindById( id: string ) {
    return z.string( { required_error: 'Pesan is required', } ).safeParse( id )
  }

  Input<T>(
    data: T,
    Schema: z.ZodType<T, z.ZodTypeDef,
      T>
  ) {
    return Schema.safeParse( data )
  }
}


