export const SDiTerima = " bg-red-100 text-black shadow shadow-red-300 "
export const SProcess = " bg-yellow-100 text-gray-700 shadow shadow-yellow-300 "
export const SKirim = " bg-blue-100 text-black shadow shadow-blue-300 "
export const SSelesai = " bg-green-100 text-gray-500  shadow shadow-green-300 "

export const Status = ( s: string ): string => {
  return ( s === "Di Terima" )
    ? SDiTerima : ( s === "Di Proses" )
      ? SProcess : ( s === "Di Kirim" )
        ? SKirim : SSelesai
}