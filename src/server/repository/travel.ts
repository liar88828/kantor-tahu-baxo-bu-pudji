import { prisma } from '@/server/models/prisma/config';
import { TTravel } from '@/entity/travel';

// getAll data from database
const findAll = async () => {
  const getData = await prisma.travel.findMany()
  console.log( getData )
  return getData

}

//get only one  data from database
const findById = async ( id: string ) => {
  return prisma.travel.findUnique( { where: { id } } )

}

//get per page data from database
const paginate = async ( data: { row: number, skip: number } ) => {
  const { row, skip } = data
  return prisma.travel.findMany( { take: row, skip } )
}

//create data from database
const create = async ( data: TTravel ) => {

  data.img = data.img || "dasdasda"

  return prisma.travel.create( {
    data: {
      id: data.id,
      namaPengiriman: data.namaPengiriman,
      noHpPerusahaan: data.noHpPerusahaan,
      lokasi: data.lokasi,
      jenis: data.jenis,
      harga: data.harga,
      img: data.img,
      keterangan: data.keterangan,
    }
  } )

}
//edit data from database
const update = async ( data: TTravel, id: string ) => {

  return prisma.travel.updateMany( {
    where: { id: id },
    data: {
      id: data.id,
      namaPengiriman: data.namaPengiriman,
      noHpPerusahaan: data.noHpPerusahaan,
      lokasi: data.lokasi,
      jenis: data.jenis,
      harga: data.harga,
      img: data.img,
      keterangan: data.keterangan,
    }
  } )
}

//delete data from database
const destroy = async ( id: string ) => {
  return prisma.travel.deleteMany( { where: { id } } )
}

const Repo = { findAll, create, destroy, paginate, findById, update }

export default Repo