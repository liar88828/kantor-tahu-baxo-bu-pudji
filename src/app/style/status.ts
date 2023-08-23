const SDiTerima = " btn text-white bg-error shadow-md shadow-slate-400 "
const SProcess  = " btn text-white bg-info shadow-md shadow-slate-400 "
const SKirim    = " btn text-white bg-warning shadow-md shadow-slate-400 "
const SSelesai  = " btn text-white bg-purple-400 shadow-md shadow-slate-400 "

export const Status = ( s: string ): string => {
  return ( s === "Di Terima" ) ? SDiTerima :
         ( s === "Di Proses" ) ? SProcess :
         ( s === "Di Kirim" ) ? SKirim : SSelesai
}

export const statusWarna = ( s: string ): string => {
  return ( s === "Di Terima" ) ? " bg-error " :
         ( s === "Di Proses" ) ? "  bg-info " :
         ( s === "Di Kirim" ) ? " bg-warning " :
         " bg-success "
}