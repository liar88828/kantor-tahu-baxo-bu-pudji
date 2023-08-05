import { TProduct }          from '@/entity/client/produk';
import { Rupiah }            from '@/lib/utils/rupiah';
import React                 from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

const url = "http://localhost:3000/"

async function getData() {
  const res = await fetch( url + "api/product",
    {
      cache: 'default',
      next : {
        tags      : [ "product" ],
        revalidate: 2
      }
    }
  )

  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }
  return res.json()
}

export const CardList = async ( { router }: {
  router: AppRouterInstance

} ) => {
  const { data }: { data: TProduct[ ] } = await getData()

  const deleteData = async ( id: string ) => {
    const res = await fetch(
      url + "api/product/" + id,
      {
        method : "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      } )
    if( !res.ok ) {
      throw new Error( 'Failed to fetch data' )
    }
    const { msg }: { msg: string } = await res.json()
    router.refresh()
    return msg
  }

  return (
    <ul className={ "px-10" }>
      { data.map( ( d ) => (
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
              <button className="btn btn-info  text-white"
              >Edit
              </button>
              <button className="btn btn-error text-white"
                      type={ "button" }
                      onClick={ () => deleteData( d.id ) }
              >Delete
              </button>
              {/*<button className="btn btn-success text-white">Detail</button>*/ }
            </div>
          </div>
        </li>
      ) ) }
    </ul>
  )
}