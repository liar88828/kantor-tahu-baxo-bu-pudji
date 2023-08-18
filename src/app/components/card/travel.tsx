import { Rupiah } from '@/lib/utils/rupiah';
import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { deleteData, getData } from '@/app/utils/ress/travel';
import Image from 'next/image';

export const CardList = async ( { router }: {
  router: AppRouterInstance

} ) => {
  const { data }: {
    data: TTravel[ ]
  }            = await getData()
  // console.log( data )
  const goEdit = ( id: string ) => {
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
            <Image src={ d.img ?? "" } width={ 500 } height={ 500 } alt={ d.namaPengiriman }/>
          </figure>

          <div className="card-body flex flex-row justify-between py-4 px-6 ">

            <div className={ " " }>
              <h2 className=" card-title">
                <span className={ "whitespace-nowrap " }>
                  Nama : </span>
                <span>{ d.namaPengiriman }</span>
              </h2>

              <p className={ "flex-nowrap flex" }>
                <span className={ "hidden sm:block" }>
                  No Tlp : </span>
                <span>{ d.noHpPerusahaan }</span>
              </p>

              <p className={ " flex-nowrap flex" }>
                <span className={ "hidden sm:block" }>
                  Lokasi : </span>
                <span>{ d.lokasi }</span>
              </p>

              <p className={ " flex-nowrap flex" }>
                <span className={ "hidden sm:block" }>
                  Harga : </span>
                <span>{ Rupiah( d.harga ) }</span>
              </p>

              <p className={ " flex-nowrap flex  " }>
                <span className={ "hidden sm:block" }>
                  Jenis : </span>
                <span>{ d.jenis }</span>
              </p>
            </div>

            <div>
              <p className={ "flex " }>
                <span className={ "hidden sm:block " }>
                  Keterangan : </span>
                <span>
                { d.keterangan }
                </span>

              </p>
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