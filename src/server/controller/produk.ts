import Repo from '@/server/repository/produk';
import { TPProduk } from '@/server/repository/interface/prisma';

type TYPE = TPProduk
const find = async () => {
  const repo = await Repo.findAll()
  console.log( repo )
  return repo
}

const findById = async ( id: string ) => {
  const repo = await Repo.findById( id )
  console.log( repo )
  return repo
}
const create = async ( data: TYPE ) => {

  const dataInput: TYPE = {
    id: data.id,
    nama: data.nama,
    lokasi: data.lokasi,
    jenis: data.jenis,
    harga: data.harga,
    jumlah: data.jumlah,
    img: data.img || "tidak ada",
    keterangan: data.keterangan,
  }

  const repo = await Repo.create( dataInput )
  console.log( repo )
  return repo
}
const edit = async ( data: TYPE, id: string ) => {

  const whereInput = { id: id }

  const dataInput = {
    id: id,
    nama: data.nama,
    lokasi: data.lokasi,
    jenis: data.jenis,
    harga: data.harga,
    jumlah: data.jumlah,
    img: data.img,
    keterangan: data.keterangan,
  }

  const repo = await Repo.update( dataInput, whereInput )
  return repo
}
const destroy = async ( id: string ) => {
  const repo = await Repo.destroy( id )
  return repo
}
const Control = { find, create, edit, destroy, findById }
export default Control