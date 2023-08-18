const SDiTerima = " btn text-white btn-error shadow-md shadow-slate-400 "
const SProcess  = " btn text-white btn-warning shadow-md shadow-slate-400 "
const SKirim    = " btn text-white btn-info shadow-md shadow-slate-400 "
const SSelesai  = " btn text-white btn-success shadow-md shadow-slate-400 "




export const Status = ( s: string ): string => {
  return ( s === "Di Terima" )
    ? SDiTerima : ( s === "Di Proses" )
      ? SProcess : ( s === "Di Kirim" )
        ? SKirim : SSelesai
}