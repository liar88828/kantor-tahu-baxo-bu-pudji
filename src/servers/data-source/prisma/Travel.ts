// import { AbstractPrisma } from '@/servers/data-source/prisma/AbstractPrisma';
// import { ITravelData } from '@/servers/data-source/interface/prisma/Travel';
// import { TPTravel } from '@/interface/prisma';
// import prisma from '@/servers/data-source/prisma/config';
//
//
// type TYPE = TPTravel;
//
// // getAll data from database
// export default class RepoTravel extends AbstractPrisma<"travel"> implements ITravelData<TYPE> {
//   setOne( d: TYPE ): TYPE {
//     return {
//       id        : d.id,
//       jenis     : d.jenis,
//       harga     : d.harga,
//       lokasi    : d.lokasi,
//       keterangan: d.keterangan,
//       nama      : d.nama,
//       hp        : d.hp,
//       img       : d.img || "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
//     }
//   }
//
//   setMany( data: TYPE[] ) {
//     return data.map( ( d ) => ( this.setOne( d ) ) )
//   }
//
//   async createMany( data: TYPE[] ) {
//     return prisma.travel.createMany( {
//       data: this.setMany( data )
//     } );
//   }
//
//   async updateMany( data: TYPE[], id: string ) {
//     return prisma.travel.updateMany( {
//       where: { id: id },
//       data : this.setMany( data )
//     } )
//   }
//
//   async destroyMany( id: string ) {
//     return prisma.travel.deleteMany( { where: { id } } )
//
//   }
//
// }
