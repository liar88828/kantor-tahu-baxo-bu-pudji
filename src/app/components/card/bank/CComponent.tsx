"use client"
import { useRouter } from 'next/navigation';
import { deleteData } from '@/app/utils/ress/bank';
import { notifyData } from '@/app/utils/notif/toash';

export function CardBank( { data }: {
  data: TBank[]
} ) {
  // console.log( data )
  const router = useRouter()
  return (
    <ul className={ " flex flex-wrap gap-4" }>
      { data.map( ( d ) => (
        <li key={ d.id } className="card card-side bg-gray-100 shadow-xl  w-[48%]">

          <div className="card-body  py-4 px-6 ">
            <h2 className=" card-title">
              <span className={ "hidden md:block" }>Nama : </span>{ d.nama }
            </h2>
            <div className="flex flex-row justify-between">
              <div className="">
                <p className={ "flex flex-nowrap" }><span className={ "hidden md:block" }>Lokasi : </span>{ d.lokasi }
                </p>
                <p className={ "flex flex-nowrap" }><span className={ "hidden md:block" }>Jenis : </span>{ d.jenis }</p>
                <p className={ "flex flex-nowrap" }><span className={ "hidden md:block" }>Hp : </span>{ d.hp }</p>
                <p className={ "flex flex-nowrap" }><span className={ "hidden md:block" }>No Rekening : </span>{ d.no }
                </p>
                <p className={ "flex flex-nowrap" }><span
                  className={ "hidden md:block" }>Keterangan : </span>{ d.keterangan }</p>

              </div>
              <div
                className="card-actions justify-center  items-stretch flex flex-col  ">
                <button className="btn btn-info  text-white"
                        type={ "button" }
                        onClick={ () => router.push( "/bank/edit/" + d.id ) }

                >Edit
                </button>
                <button className="btn btn-error text-white"
                        type={ "button" }
                        onClick={ async () => {
                          const res = await deleteData( d.id, router )
                          notifyData( res.msg )
                          router.refresh()

                          console.log( res )

                        } }
                >Delete
                </button>
              </div>
            </div>
          </div>
        </li>
      ) ) }

    </ul>
  )
}