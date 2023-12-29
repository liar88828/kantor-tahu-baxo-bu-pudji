import { Status } from '@/app/style/status';

// @ts-ignore
export const listComplex = [
  {
    title    : "Create",
    href     : "/orderan/create",
    className: " bg-primary text-white shadow "
  },
  {
    title    : "Semua",
    href     : "/table/Semua",
    className: " bg-secondary text-white shadow "
  },
  {
    title    : "Terima",
    href     : "/table/Terima",
    className: Status( "Terima" )
  },
  {
    title    : "Proses",
    href     : "/table/Proses",
    className: Status( "Proses" )
  },
  {
    title    : "Kirim",
    href     : "/table/Kirim",
    className: Status( "Kirim" )
  },
  {
    title    : "Selesai",
    href     : "/table/Selesai",
    className: Status( "Selesai" )
  },
]