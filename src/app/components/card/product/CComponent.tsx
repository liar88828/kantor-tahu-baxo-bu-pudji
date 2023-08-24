"use client"
import { Rupiah } from '@/lib/utils/rupiah';
import { deleteData } from '@/app/utils/ress/product';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function ListProduct( { data }: { data: TProduct[ ] } ) {
  const router = useRouter()
  return (
    <ul className={ "px-10" }>
      { data.map( ( d: TProduct ) => (
        <li key={ d.id } className="card card-side bg-gray-100 shadow-xl my-5 ">
          <figure className={ "w-[20%] h-auto" }>
            <Image src={ d.img || "" }
                   alt={ d.nama }
                   width={ 200 }
                   height={ 200 }
                   className={ "object-cover h-[100%]" }
            />
          </figure>
          <div className="card-body flex flex-row justify-between py-4 px-6 ">
            <div>
              <h2 className="card-title"> { d.nama }</h2>
              <p>{ Rupiah( d.harga ) }</p>
              <p>Jenis : { d.jenis }</p>
              <p>{ d.lokasi }</p>
            </div>

            <div>
              <p>Keterangan : { d.keterangan }</p>
            </div>

            <div
              className="card-actions justify-center  items-stretch flex flex-col  ">
              <button className="btn btn-info  text-white"
                      type={ "button" }
                      onClick={ () => router.push( "/product/" + d.id + "/edit" ) }

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