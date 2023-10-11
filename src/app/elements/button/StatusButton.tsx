"use client"
import { useRouter } from 'next/navigation';
import { OStatus, Status } from '@/app/style/status';
import { sendData } from '@/lib/utils/ress/SendApi';
import { TStatusParams } from '@/servers/data-source/interface/prisma/SemuaProduk';

export const StatusButton = ( { status, id }: { status: string, id: string } ) => {
  const route = useRouter()

  const handleUpdate = async ( status: string, id: string ) => {
    const json: TStatusParams = {
      id    : id,
      status: status
    }
    await sendData( "table", "PATCH", id, status, json );
  }
  return ( <>
    <label
      htmlFor="my_modal_status"
      className={ "btn btn-sm sm:btn-md text-white whitespace-nowrap " + Status( status ) }>
      { status }
    </label>

    <input type="checkbox"
           id="my_modal_status"
           className="modal-toggle"/>

    <div className="modal ">
      <div className="modal-box p-3">
        <h1 className={ "font-bold uppercase" }>UBAH STATUS</h1>

        <div className="flex flex-wrap gap-3 p-1 ">
          { OStatus.map( ( s ) => ( <button
              key={ s.s }
              className={ `btn-sm sm:btn-md btn font-bold text-white  ${
                ( Status( s.s ) ) }` }
              onClick={ async () => {
                await handleUpdate( s.s, id )
                route.refresh()
              } }>
              { s.s }
            </button>
          ) ) }
        </div>

      </div>
      <label className="modal-backdrop" htmlFor="my_modal_status">Close</label>
    </div>
  </> )
}