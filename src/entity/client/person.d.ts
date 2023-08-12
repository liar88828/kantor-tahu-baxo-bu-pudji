
export type TPerson = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: TPerson[]
}
type TKPerson = Record<keyof TProduct, any>

const example: TKPerson = {
  harga,
  img,
  nama,
  keterangan,
  jumlah,
  lokasi,
  jenis,
  id
}