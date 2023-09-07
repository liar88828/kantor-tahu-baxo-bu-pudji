import { DeleteCard } from '@/app/elements/button/DeleteCard';
import { EditCard } from '@/app/elements/button/EditCard';
import { formatPhoneNumber } from '@/lib/utils/formatNumber';

export function CardBank( { data }: {
  data: TBank[]
} ) {

  return (
    <ul className={ " flex flex-col flex-nowrap sm:flex-row sm:flex-wrap gap-4 " }>
      { data.map( ( d ) => (
        <li key={ d.id } className="card card-side bg-gray-100 shadow-xl
        w-full sm:w-[47%] lg:w-[32%]">

          <div className="card-body  py-4 px-6 ">
            <h2 className=" card-title">
              <span className={ "hidden md:block" }>Nama : </span>{ d.nama }
            </h2>

            <div className="flex flex-row md:flex-col justify-between ">
              <div className="">
                <p className={ "flex flex-nowrap" }><span className={ "hidden md:block" }>Lokasi : </span>{ d.lokasi }
                </p>
                <p className={ "flex flex-nowrap" }><span className={ "hidden md:block" }>Jenis : </span>{ d.jenis }</p>
                <p className={ "flex flex-nowrap" }><span
                  className={ "hidden md:block" }>Hp : </span>{ formatPhoneNumber( d.hp ) }</p>
                <p className={ "flex flex-nowrap" }><span className={ "hidden md:block" }>No Rekening : </span>{ d.no }
                </p>
                <p className={ "flex flex-nowrap" }><span
                  className={ "hidden md:block" }>Keterangan : </span>{ d.keterangan }</p>
              </div>

              <div className="card-actions justify-center items-stretch flex flex-col ">
                <EditCard to={ "/bank/edit/" } id={ d.id }/>
                <DeleteCard id={ d.id }/>
              </div>

            </div>
          </div>

        </li>
      ) ) }

    </ul>
  )
}

