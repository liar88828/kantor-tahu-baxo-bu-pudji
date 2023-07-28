import RepoProduk         from '@/server/repository/produk';
import { Prisma, produk } from '../../../prisma/prisma/data';
import { zProdukType }    from '@/server/service/produk';

type TYPE = zProdukType
const Repo = new RepoProduk()

const find = async (): Promise<produk[]> => {
  return await Repo.findAll()
}

const findById = async ( id: string ) => {
  return Repo.findById( id )
}
const create   = async ( data: TYPE ): Promise<produk> => {
  const dataInput: TYPE = {
    id    : data.id,
    nama  : data.nama,
    lokasi: data.lokasi,
    jenis : data.jenis,
    harga : data.harga || 0,
    jumlah: data.jumlah || 0,
    img   : data.img || "tidak ada",
    keterangan: data.keterangan,
  }

  return await Repo.create( dataInput )
}
const edit     = async ( data: TYPE, id: string ): Promise<Prisma.BatchPayload> => {

  const whereInput = { id: id }
  const dataInput = {
    id    : data.id,
    nama  : data.nama,
    lokasi: data.lokasi,
    jenis : data.jenis,
    harga : data.harga || 0,
    jumlah: data.jumlah || 0,
    img   : data.img || "tidak ada",
    keterangan: data.keterangan,
  } as TYPE
  return await Repo.update( dataInput, whereInput )
}

const destroy = async ( id: string ) => {
  return await Repo.destroy( id )
}
const Control = {
  find,
  create,
  edit,
  destroy,
  findById
}

export default Control