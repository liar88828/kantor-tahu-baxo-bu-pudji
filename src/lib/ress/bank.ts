// "use server"
//
// import { Fetch } from './SendApi';
//
// function setBank( d: TBank ) {
//   return {
//     nama      : d.nama,
//     jenis     : d.jenis,
//     lokasi    : d.lokasi,
//     keterangan: d.keterangan,
//     id        : d.id,
//     img: d.img,
//     no        : d.no,
//     hp        : d.hp
//   };
// }
//
// export async function getDataById( id: string ): Promise<TBank> {
//   const to                            = "bank"
//   const { data: d }: { data: TBank, } = await Fetch( { to, "GET", id });
//
//   return setBank( d )
// }
//
