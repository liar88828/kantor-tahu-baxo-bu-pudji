import { Rupiah }                      from '@/lib/utils/rupiah';
import React                           from 'react';
import {
  AppRouterInstance
}                                      from 'next/dist/shared/lib/app-router-context';
import type { TTravel }                from '@/entity/client/travel';
import { deleteData, getData, urlApi } from '@/app/utils/ress/travel';

export const CardList = async ( { router }: {
  router: AppRouterInstance

} ) => {
  const { data }: { data: TTravel[ ] } = await getData()
  // console.log( data )
  const goEdit                         = ( id: string ) => {
    // console.log( "click" )
    router.push( "/travel/" + id + "/edit" )
  }
  if( data.length == 0 ) {
    return <h1>Data Kosong</h1>
  }
  return (
    <ul className={ "px-10" }>
      { data.map( ( d ) => (
        <li key={ d.id } className="card card-side bg-gray-100 shadow-xl my-5 ">

          <figure className={ "w-[20%] h-auto" }>
            <img src={ urlApi + d.img } alt="Movie"/>
          </figure>

          <div className="card-body flex flex-row justify-between py-4 px-6 ">

            <div className={ " " }>
              <h2 className="card-title">Nama : { d.namaPengiriman }</h2>
              <p>Harga : { d.noHpPerusahaan }</p>
              <p>Lokasi : { d.lokasi }</p>
              <p>Harga : { Rupiah( d.harga ) }</p>
              <p>Jenis : { d.jenis }</p>
            </div>

            <div className=" ">
              <p>Keterangan : { d.keterangan }</p>
            </div>


            <div
              className="card-actions justify-center  items-stretch flex flex-col  ">
              <button className="btn btn-info  text-white"
                      type={ "button" }
                      onClick={ () => goEdit( d.id ) }

              >Edit
              </button>
              <button className="btn btn-error text-white"
                      type={ "button" }
                      onClick={ () => deleteData( d.id, router ) }
              >Delete
              </button>
            </div>
          </div>
        </li>
      ) ) }
    </ul>
  )
}