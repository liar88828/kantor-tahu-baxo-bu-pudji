"use client"
import { Rupiah } from '@/lib/utils/rupiah';
import { deleteData } from '@/app/utils/ress/product';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { notifyData } from '@/app/utils/notif/toash';

export function ListProduct( { data }: { data: TProduct[ ] } ) {
  const router = useRouter()
  return (
    <ul className={ "px-1 sm:px-10" }>
      { data.map( ( d: TProduct ) => (
        <li key={ d.id } className="card card-side bg-gray-100 shadow-xl my-3 ">
          <figure className={ "w-[40%] sm:w-[20%] h-auto" }>
            <Image src={ d.img || "" }
                   alt={ d.nama }
                   width={ 200 }
                   height={ 200 }
                   className={ "object-cover h-[100%]" }
            />
          </figure>
          <div className="card-body flex flex-row justify-between py-4 px-2 sm:px-6 ">

            <div>
              <h2 className="card-title text-xs sm:text-sm  md:text-md"> { d.nama }</h2>
              <div className={ "flex flex-col sm:flex-row gap-0 sm:gap-2" }>
                <div className="">
                  <p className={ "text-xs sm:text-sm  md:text-md" }>{ Rupiah( d.harga ) }</p>
                  <p className={ "text-xs sm:text-sm  md:text-md" }><span
                    className={ "hidden sm:block" }>Jenis : </span> { d.jenis }</p>
                  <p className={ "text-xs sm:text-sm  md:text-md" }>{ d.lokasi }</p>
                </div>
                <div className="">
                  <p className={ "text-xs sm:text-sm  md:text-md" }><span
                    className={ "hidden sm:block" }>Keterangan : </span>{ d.keterangan }</p>
                </div>
              </div>


            </div>
            <div
              className="card-actions justify-center  items-stretch flex flex-col  ">
              <button className="btn btn-xs   sm:btn-sm btn-info  text-white"
                      type={ "button" }
                      onClick={ () => router.push( "/product/" + d.id + "/edit" ) }

              >Edit
              </button>
              <button className="btn btn-xs sm:btn-sm  btn-error text-white"
                      type={ "button" }
                      onClick={ async () => {
                        const { msg }: { msg: string, data: any } = await deleteData( d.id, router )
                        notifyData( msg )
                        router.refresh()
                      } }
              >Delete
              </button>
            </div>
          </div>

        </li>
      ) ) }

    </ul>
  )
}