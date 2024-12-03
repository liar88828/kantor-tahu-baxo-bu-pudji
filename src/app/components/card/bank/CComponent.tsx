import { DeleteCard } from '@/app/elements/button/card/Delete';
import { EditCard } from '@/app/elements/button/card/Edit';
import { ButtonAction } from '@/app/elements/button/card/ActionButton';

export const to = "bank"

export const TextValue = ( { t, v }: {
  t: string,
  v: string
} ) => {
  return <p className={ "flex flex-nowrap" }>
    <span className={ "sm:hidden md:block" }>{ t }
    </span>
    { v }
  </p>
}

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
                <img src={ d.img } alt={ d.nama }/>
                <TextValue t={ "Lokasi : " } v={ d.lokasi }/>
                <TextValue t={ "Jenis : " } v={ d.jenis }/>
                <TextValue t={ "Hp : " } v={ d.hp }/>
                <TextValue t={ "No Rekening : " } v={ d.no }/>
                <TextValue t={ "Keterangan : " } v={ d.keterangan }/>
              </div>
              <ButtonAction>
                <EditCard to={ to } id={ d.id } css={ " " }/>
                <DeleteCard id={ d.id } to={ to } css={ " " }/>
              </ButtonAction>
            </div>
          </div>

        </li>
      ) ) }

    </ul>
  )
}

