export const SDiTerima = " bg-red-100 text-black "
export const SProcess = " bg-yellow-100 text-gray-700  "
export const SKirim = " bg-blue-100 text-black  "
export const SSelesai = " bg-green-100 text-gray-500    "

export const Status = ( s: string ): string => {
  return ( s === "Di Terima" )
    ? SDiTerima : ( s === "Di Proses" )
      ? SProcess : ( s === "Di Kirim" )
        ? SKirim : SSelesai
}