export const SDiTerima = "bg-red-400 text-white shadow shadow-red-300"
export const SProcess = "bg-yellow-200 text-gray-700 shadow shadow-yellow-300"
export const SKirim = "bg-blue-400 text-white shadow shadow-blue-300"
export const SSelesai = "bg-green-300 text-gray-500  shadow shadow-green-300"

export const Status = ( s: string ): string => {
  // let r = ""
  // // console.log(s)
  // if( s == "Di Terima" ) r = SDiTerima
  // if( s == "Proses" ) r = SProcess
  // if( s == "Kirim" ) r = SKirim
  // if( s == "Selesai" ) r = SSelesai
  // console.log( r )
  // return r

  let kembali = ( s === "Di Terima" )
    ? SDiTerima : ( s === "Proses" )
      ? SProcess : ( s === "Kirim" )
        ? SKirim : SSelesai

  // console.log( kembali )

  return kembali
}