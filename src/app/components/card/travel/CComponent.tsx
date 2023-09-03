"use client"
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Rupiah } from '@/lib/utils/rupiah';
import { deleteData } from '@/app/utils/ress/travel';
import { notifyData } from '@/app/utils/notif/toash';

export function CardTravel( { data }: { data: TTravel[] } ) {
  const router = useRouter()
  return (
    <ul className={ "px-10" }>
      { data.map( ( d ) => (
        <li key={ d.id } className="card card-side bg-gray-100 shadow-xl my-5 ">

          <figure className={ "w-[20%] h-auto" }>
            <Image src={ d.img ?? "" }
                   width={ 200 }
                   height={ 200 }
                   alt={ d.namaPengiriman }
                   className={ "object-cover h-[100%]" }

            />
          </figure>

          <div className="card-body flex flex-row justify-between py-4 px-6 ">

            <div>
              <h2 className=" card-title">{ d.namaPengiriman }</h2>

              <p className={ "flex-nowrap flex" }>{ d.noHpPerusahaan }</p>

              <p className={ " flex-nowrap flex" }>{ d.lokasi }</p>

              <p className={ " flex-nowrap flex" }>Kisaran Biaya { Rupiah( d.harga ) }</p>

              <p className={ " flex-nowrap flex  " }>
                <span className={ "hidden sm:block" }>
                  Jenis : </span>
                <span>{ d.jenis }</span>
              </p>
            </div>

            <div>
              <p className={ " " }>
                Keterangan : <span>
                { d.keterangan }
               </span>

              </p>
            </div>


            <div
              className="card-actions justify-center  items-stretch flex flex-col  ">
              <button className="btn btn-info  text-white"
                      type={ "button" }
                      onClick={ () => router.push( "/travel/" + d.id + "/edit" ) }

              >Edit
              </button>
              <button className="btn btn-error text-white"
                      type={ "button" }
                      onClick={ async () => {
                        const { msg }: { msg: string, } = await deleteData( d.id, )
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