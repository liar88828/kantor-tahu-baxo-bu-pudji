import { TProduct }        from '@/entity/client/produk';
import React, { Suspense } from 'react';
import { LinkCreate }      from '@/app/product/Links';
import { Rupiah }          from '@/lib/utils/rupiah';

const url               = "http://localhost:3000/"
export const revalidate = 2

async function getData() {
  const res = await fetch( url + "api/produk",
    { cache: 'no-store' }
  )

  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  return res.json()
}

const ListData = ( { data }: { data: TProduct[] } ) => {
  return (
    <ul className={ "px-10" }>{ data.map( d => (
      <li key={ d.id } className="card card-side bg-gray-100 shadow-xl my-5 ">

        <figure className={ "w-[20%] h-auto" }>
          <img src={ url + d.img } alt="Movie"/>
        </figure>

        <div className="card-body flex flex-row justify-between py-4 px-6 ">

          <div className={ " " }>
            <h2 className="card-title">Nama : { d.nama }</h2>
            <p>Harga : { Rupiah( d.harga ) }</p>
            <p>Jenis : { d.jenis }</p>
            <p>Lokasi : { d.lokasi }</p>
            <p>Jumlah : { d.jumlah }</p>
          </div>

          <div className=" ">
            <p>Keterangan : { d.keterangan }</p>
          </div>


          <div
            className="card-actions justify-center  items-stretch flex flex-col  ">
            <button className="btn btn-info  text-white">Edit</button>
            <button className="btn btn-error text-white">Delete</button>
            {/*<button className="btn btn-success text-white">Detail</button>*/ }
          </div>
        </div>
      </li>
    ) ) }
    </ul>
  )
}

export default async function List() {
  // Wait for the artist
  const { data }: { data: TProduct[ ] } = await getData()

  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <LinkCreate/>
      <Suspense fallback={ <div>Loading...</div> }>
        <ListData data={ data }/>
      </Suspense>
    </main>
  )
}