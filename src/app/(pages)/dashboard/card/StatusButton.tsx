"use client"
import { useRouter } from 'next/navigation';
import { OStatus, Status, TStatusProduk } from '@/app/style/status';
import DataEmpty from '@/app/components/template/handling/DataEmpty';
import { notifyData } from '@/lib/notif/toash';

export const StatusButton = ( { status, id, }: { status: TStatusProduk, id: string }
) => {
  const route = useRouter()

  async function getOnClick( status: TStatusProduk, ) {
    //
    //   const data = await Fetch( {
    //     to    : "orderan",
    //     method: "PATCH",
    //     id,
    //     option: status,
    //   } );
    //   console.log( data.data )
    //   if( data.success ) {
    //     route.refresh()
    //   }
    // }

    const res = await fetch( `http://localhost:3000/api/dashboard?option=${ status }&id=${ id }`, {
      method : 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify( {} ),
    } );
    if( !res.ok ) {
      return <DataEmpty/>
    }
    const data = await res.json()
    // console.log( data.data, 'test' )

    if( data.success ) {
      console.log( 'test success' )
      notifyData( 'success update data' )
      route.refresh()
    }
    if( !data.success ) {
      notifyData( 'fail update data' )
      route.refresh()
    }

  }

  return ( <>
    <label
      htmlFor={ `my_modal_status_${ id }` }
      className={ "btn btn-sm sm:btn-md text-white whitespace-nowrap " + Status( status ) }>
      { status }
    </label>

    <input type="checkbox"
           id={ `my_modal_status_${ id }` }
           className="modal-toggle"/>

    <div className="modal ">
      <div className="modal-box p-5">
        <h1 className={ "font-bold uppercase" }>UBAH STATUS</h1>

        <div className="flex flex-wrap gap-3 p-1 justify-around">
          { OStatus.map( ( { s } ) => ( <button
              key={ s }
              className={ `btn-sm sm:btn-md btn font-bold text-white  ${
                ( Status( s ) ) }` }
              onClick={ () => getOnClick( s ) }>
              { s }
            </button>
          ) ) }
        </div>
      </div>

      <label
        className="modal-backdrop"
        htmlFor={ `my_modal_status_${ id }` }>
        Close
      </label>
    </div>
  </> )
}