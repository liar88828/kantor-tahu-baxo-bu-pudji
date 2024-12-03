import prisma from '@/servers/data-source/prisma/config';

export const getDataForOrderan = async () => {
  const travel  = prisma.delivery.findMany( { select: { nama: true } } )
  const product = prisma.product.findMany( {
    select: {
      nama      : true,
      img       : true,
      id        : true,
      jumlah    : true,
      harga     : true,
      lokasi    : true,
      jenis     : true,
      keterangan: true
    }
  } )
  const bank    = prisma.bank.findMany( { select: { nama: true } } )
  return prisma.$transaction( [ travel, product, bank ] )
}