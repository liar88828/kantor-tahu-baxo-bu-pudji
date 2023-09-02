import { SafeParseError, SafeParseSuccess, z } from 'zod';
import { TOrderServer } from '@/entity/server/orderan';

import type { TYPE as Ttravel } from '@/server/models/dataAccess/Travel';
import type { TYPE as TsemuaProduct, } from '@/server/models/dataAccess/semuaProduk';
import type { TYPE as Tbank, } from '@/server/models/dataAccess/Bank';

export interface IValidations {
  ServiceBank: z.ZodType<Tbank>;
  ServiceProduk: z.ZodType<TProduct>;
  TravelSchema: z.ZodType<Ttravel>;
  semuaProduk: z.ZodType<TsemuaProduct>;
  OrderanSchema: z.ZodType<TOrderServer>;
  ZIdMany: z.ZodType<string[]>;
  Produk(): any;
  ZFindById<S>( id: S ): SafeParseSuccess<S | string> | SafeParseError<S | string>;
  Input<T>(
    data: T,
    Schema: z.ZodType<T, z.ZodTypeDef, T>
  ): SafeParseSuccess<T> | SafeParseError<T>;
}

export default class Validation implements IValidations {
  ServiceBank: z.ZodType<Tbank> = z.object( {
    id        : z.string( { required_error: 'Id is required', } ).min( 2 ).max( 30 ).optional(),
    hp        : z.string( { required_error: 'Hp is required', } ).min( 2 ).max( 30 ),
    no        : z.string( { required_error: 'No is required', } ).min( 2 ).max( 30 ),
    nama      : z.string( { required_error: 'nama is required', } ).min( 2 ).max( 30 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 2 ).max( 30 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 2 ).max( 30 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 2 ).max( 200 ),
  } )

  ServiceProduk: z.ZodType<TProduct> = z.object( {
    nama      : z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 50 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 50 ),
    img       : z.string( { required_error: 'Img is required', } ).min( 1 ).max( 50 ),
    id        : z.string( { required_error: 'Id is required', } ).min( 1 ).max( 50 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ).max( 200 ),
    harga     : z.number( { required_error: 'Harga is required', } ).int().nonnegative(),
    jumlah    : z.number( { required_error: 'Jumlah is required', } ).int().nonnegative(),
  } )

  TravelSchema: z.ZodType<Ttravel> = z.object( {
    id            : z.string( { required_error: 'Id is required', } ).min( 1 ).max( 100 ),
    namaPengiriman: z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    noHpPerusahaan: z.string( { required_error: 'Hp is required', } ).min( 1 ).max( 100 ),
    lokasi        : z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    jenis         : z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    img           : z.string( { required_error: 'Img is required', } ).min( 1 ).max( 200 ),
    keterangan    : z.string( { required_error: 'Keterangan is required', } ).min( 1 ),
    harga         : z.number( { required_error: 'Harga is required', } ).int().nonnegative(),
  } )

  ProductOnly = z.object( {
    id        : z.string( { required_error: 'Id is required', } ).min( 1 ).max( 100 ).optional(),
    nama      : z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ).max( 200 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    harga     : z.number( { required_error: 'Harga is required', } ).int().nonnegative(),
    jumlah    : z.number( { required_error: 'Jumlah is required', } ).int().nonnegative(),
  } )

  ProdukSchema = this.ProductOnly.merge( z.object( {
    img: z.string().min( 1 ).max( 50 )
  } ) )

  semuaProduk: z.ZodType<TsemuaProduct> = this.ProductOnly.merge( z.object( {
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
    guna          : z.string( { required_error: 'guna is required', } ).min( 1 ).max( 200 ),
    lokasi        : z.string( { required_error: 'lokasi is required', } ).min( 1 ).max( 100 ),
    namaPengiriman: z.string( { required_error: 'namaPengiriman is required', } ).min( 1 ).max( 100 ),
    id            : z.string( { required_error: 'ID is required', } ).min( 25 ).max( 50 ).max( 100 ),
    typePembayaran: z.string( { required_error: 'typePembayaran is required', } ).min( 1 ).max( 100 ),
    status        : z.string( { required_error: 'status is required', } ).min( 1 ).max( 100 ),
    //
    ongkir        : z.number( { required_error: ' ongkir is required', } ).int().nonnegative(),
    totalBayar    : z.number( { required_error: ' totalBayar is required', } ).int().nonnegative(),
    totalPenjualan: z.number( { required_error: ' totalPenjualan is required', } ).int().nonnegative(),
    semuaProduct  : z.array( this.semuaProduk )
  } )

  ZIdMany: z.ZodType<string[]> = z.array( z.string( { required_error: "Is Not String" } ).min( 30 ).max( 45 ) )

// : z.ZodType<Produk>
  Produk() {return this.ProdukSchema}

  ZFindById<S>( id: S ) {
    return z.string( { required_error: 'Pesan is required', } ).safeParse( id )
  }

  Input<T>(
    data: T,
    Schema: z.ZodType<T, z.ZodTypeDef, T>
  ) {
    return Schema.safeParse( data )
  }
}


