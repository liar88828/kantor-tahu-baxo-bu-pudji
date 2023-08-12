const SDiTerima = " btn-error shadow-md shadow-slate-400 "
const SProcess  = " btn-warning shadow-md shadow-slate-400 "
const SKirim    = " btn-info shadow-md shadow-slate-400 "
const SSelesai  = " btn-success shadow-md shadow-slate-400 "




export const Status = ( s: string ): string => {
  return ( s === "Di Terima" )
    ? SDiTerima : ( s === "Di Proses" )
      ? SProcess : ( s === "Di Kirim" )
        ? SKirim : SSelesai
}