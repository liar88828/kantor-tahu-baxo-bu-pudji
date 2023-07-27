import Repo from '@/server/repository/produk';
import { produk } from '../../../prisma/prisma/data';
import { zProdukType } from '@/server/service/produk';

type TYPE = zProdukType

const find = async (): Promise<produk[]> => {
  return await Repo.findAll()
}

const findById = async ( id: string ) => {
  return Repo.findById( id )
}
const create = async ( data: TYPE ): Promise<produk> => {

  const dataInput: TYPE = {
    id: data.id,
    nama: data.nama,
    lokasi: data.lokasi,
    jenis: data.jenis,
    harga: data.harga || 0,
    jumlah: data.jumlah || 0,
    img: data.img || "tidak ada",
    keterangan: data.keterangan,
  }

  return await Repo.create( dataInput )
}
const edit = async ( data: TYPE, id: string ) => {
  const whereInput = { id: id }

  const dataInput = {
    id: data.id,
    nama: data.nama,
    lokasi: data.lokasi,
    jenis: data.jenis,
    harga: data.harga || 0,
    jumlah: data.jumlah || 0,
    img: data.img || "tidak ada",
    keterangan: data.keterangan,
  } as produk

  const repo = await Repo.update( dataInput, whereInput )
  return repo
}

const destroy = async ( id: string ) => {
  const repo = await Repo.destroy( id )
  return repo
}

const Control = { find, create, edit, destroy, findById }

export default Control