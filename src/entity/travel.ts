export  type TTravel = {
  id: string,
  namaPengiriman: string,
  noHpPerusahaan: string,
  lokasi: string,
  jenis: string,
  harga: number,
  img?: string,
  keterangan: string
}

const exampleTravel: TTravel = {
  id: "1",
  namaPengiriman: "gojek",
  noHpPerusahaan: "0123456789",
  lokasi: "semarang",
  jenis: "truck",
  harga: 20_000,
  img: "orak jelas",
  keterangan: "masih diragukan"
}