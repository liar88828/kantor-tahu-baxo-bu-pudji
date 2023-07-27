import { z } from "zod";

export type TProduct = {
  id: string
  nama: string,
  harga: number,
  lokasi: string,
  jumlah: number,
  jenis: "Orderan" | "Item" | string,
  img?: string
  keterangan: string
}

export const ServiceProduk: z.ZodType<TProduct> = z.object( {
  id: z.string().min( 1 ),
  nama: z.string().min( 1 ),
  harga: z.number().int().positive(),
  lokasi: z.string().min( 1 ),
  jumlah: z.number().int().positive(),
  // jenis: z.enum(["Orderan","Item"]),
  jenis: z.string(),
  img: z.string(),
  keterangan: z.string()
} )

const exampleProduk: z.infer<typeof ServiceProduk> = {
  id: "58c2e9e2-9e0e-40ef-9a72-88658ce00fb2",
  harga: 20000,
  img: "tidak ada ",
  jenis: "orderan",
  jumlah: 1,
  keterangan: "Pedas",
  lokasi: "Semarang",
  nama: "tahu baxo"
}

const data = ServiceProduk.parse( exampleProduk )

const userSchema = z.object( {
  name: z.string(),
  age: z.number(),
} );

// Sample input data
const inputData = {
  name: "John Doe",
  age: 30,
};

// Validation using Zod schema
const isValidZod = userSchema.safeParse( inputData ).success;

interface Res {
  films: string;
  people: string;
}

const schema: z.ZodType<Res> = z.object( {
  films: z.string(),
  people: z.string(),
} );

// const product = [
//   // { nama: "Tahu Bakso Rebus", harga: 42.000 },
//   { nama: "Tahu Bakso Vakum", harga: 46.000 },
//   { nama: "Tahu Bakso Special", harga: 50.000 },
//   { nama: "Tahu Bakso Goreng", harga: 45.000 },
//   { nama: "Bandeng Presto", harga: 60.000 },
//   { nama: "Otak-Otak Bandeng", harga: 70.000 },
//   { nama: "Bakso Sapi 20", harga: 40.000 },
//   { nama: "Bakso Sapi 12", harga: 25.000 },
//   { nama: "Bakso Aneka", harga: 29.000 },
//   { nama: "Nugget", harga: 27.000 },
//   { nama: "Rolade Tahu", harga: 19.000 },
//   { nama: "Rolade Singkong", harga: 19.000 },
// ]

export const sProduct: TProduct[] = [
  {
    id: "Un/It/TBR/42",
    nama: "Tahu Bakso Rebus",
    harga: 42_000,
    lokasi: "Ungaran",
    jenis: "Item",
    jumlah: 1,
    keterangan: "Ada Sedikit Berair",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Bakso_mi_bihun.jpg"
  },

  {
    id: "Se/Or/TBV/42",
    nama: "Tahu Bakso Vakum",
    jumlah: 1,
    harga: 46_000,
    lokasi: "Semarang",
    keterangan: "Ada CrispyNya",
    jenis: "Orderan",
    img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe"
  },

  {
    id: "Un/It/TBGo/42",
    nama: "Tahu Bakso Goreng",
    jumlah: 1,
    harga: 45_000,
    lokasi: "Ungaran",
    keterangan: "Manis",
    jenis: "Item",
    img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe"
  },

  {
    id: "Se/Or/TBSp/42",
    nama: "Tahu Bakso Special",
    harga: 50_000,
    lokasi: "Semarang",
    jenis: "Orderan",
    jumlah: 1,
    keterangan: "Pedas",
    img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe"
  }

]

{/*  <div className="flex flex-col">*/
}
{/*    <label htmlFor="">Orderan</label>*/
}
{/*    <select name="orderan" id="orderan"*/
}
{/*            className='border border-gray-300 p-2 rounded-md'>*/
}
{/*      <option value="Tahu Bakso Rebus">Tahu Bakso Rebus Rp.42.000</option>*/
}
{/*      <option value="Tahu Bakso Vakum">Tahu Bakso Vakum Rp.46.000</option>*/
}
{/*      <option value="Tahu Bakso Specialty">Tahu Bakso Special Rp.50.000</option>*/
}
{/*      <option value="Tahu Bakso Goreng">Tahu Bakso Goreng Rp.45.000</option>*/
}
{/*      <option value="Bandeng Presto">Bandeng Presto Rp.60.000</option>*/
}
{/*      <option value="Otak-Otak Bandeng">Otak-Otak Bandeng Rp.70.000</option>*/
}
{/*      <option value="Bakso Sapi 20">Bakso Sapi 20 Rp.40.000</option>*/
}
{/*      <option value="Bakso Sapi 12">Bakso Sapi 12 Rp.25.000</option>*/
}
{/*      <option value="Bakso Aneka">Bakso Aneka Rp.29.000</option>*/
}
{/*      <option value="Nugget">Nugget Rp.27.000</option>*/
}
{/*      <option value="Rolade Tahu">Rolade Tahu Rp.19.000</option>*/
}
{/*      <option value="Rolade Singkong">Rolade Singkong Rp.19.000</option>*/
}
{/*    </select>*/
}
{/*  </div>*/
}