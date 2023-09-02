"use client"
import { addDays, setHours, setTanggal } from '@/lib/utils/formatDate';
import { formatPhoneNumber } from '@/lib/utils/formatNumber';
import { Rupiah } from '@/lib/utils/rupiah';
import { Status } from '@/app/style/status';

export function CardList( { product, notifyMonth }: {
  notifyMonth: TListCard[]
  product: {
    nama: string,
    harga: number
  }[]
} ) {
  const getKirim = ( d: TListCard ) => {
    const dates = d.kirim.split( "T" )[ 0 ]
    const times = d.waktuKirim.split( "T" )[ 1 ]
    return new Date( dates + "T" + times ).getDate()
  }

  return (
    <ul>
      {

        notifyMonth
        .sort( ( a, b ) => {
          return getKirim( a ) - getKirim( b );
        } )
        .map( ( d ) => ( <li
          key={ d.id }
          className={ " my-1 card card-compact lg:card-side  w-[100%] h-[18%] bg-base-100 shadow-xl border-4" +
            " border-green-200" }>
          <div className="card-body ">
            <div className="flex flex-row sm:flex-col lg:flex-row items-start justify-between gap-1 md:gap-2">
              <h1 className="card-title text-lg sm:text-2xl capitalize mr-10 sm:mr-0">{ d.penerima }</h1>
              <div className="flex flex-wrap gap-1 sm:gap-2  ">

                <button
                  className={ "btn-sm sm:btn-md btn whitespace-nowrap " + Status( d.status ) }>{ d.status }</button>
                {/*@ts-ignore*/ }
                <label htmlFor="my_modal_7" className="btn btn-sm sm:btn-md bg-purple-600 text-white">CEK</label>
                {/*<button className="btn-sm sm:btn-md btn bg-purple-600 text-white"*/ }
                {/*        onClick={ () => window.open_id_1.showModal() }>CEK*/ }
                {/*</button>*/ }


                {/* The button to open modal */ }
                {/*<label htmlFor="my_modal_7" className="btn">open modal</label>*/ }

                {/* Put this part before </body> tag */ }
                <input type="checkbox" id="my_modal_7" className="modal-toggle"/>
                <div className="modal ">
                  <div className="modal-box p-3">
                    <h1 className={ "font-bold uppercase" }>SEMUA ORDERAN</h1>

                    <div className="flex flex-wrap gap-3 p-1 ">
                      { d.semuaProduct.map( ( item: TProduct, i: number ) => {
                        // console.log( item )
                        return (
                          <div key={ item.id } className={ "" }>
                            <div
                              className="w-[9rem]  bg-white border border-slate-100 rounded-lg shadow shadow-black  p-2">

                              <div className="card-body rounded p-2 ">
                                <p className="mb-2 font-bold">{ i + 1 }. { item.nama }</p>
                                <p className={ "text-sm" }> { Rupiah( item.harga ) }</p>
                                <p className={ "text-sm" }>Jenis : { item.jenis }</p>
                                <p className={ "text-sm" }> Jumlah : { item.jumlah }</p>
                              </div>
                            </div>
                          </div>
                        )
                      } ) }

                    </div>

                  </div>
                  <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                </div>

                <p
                  className={ `btn-sm sm:btn-md btn font-bold  text-white  ${
                    getKirim( d ) - addDays( -3 ).getDate() >= 0 ? " bg-red-400 "
                                                                 : " bg-green-300 " }  ` }>{ setTanggal( d.kirim, "hari" ) }</p>
              </div>
            </div>
            <div className="  flex flex-row sm:flex-col md:flex-col lg:flex-row  gap-1 justify-between">
              <div className="">
                <p>{ d.alamatPenerima }</p>
                <p>{ formatPhoneNumber( d.hpPenerima ) } </p>
              </div>
              <div className="">

                <p className={ " text-right sm:text-left lg:text-right " }>{ setTanggal( d.kirim, "angka" ) }</p>
                <p className={ " text-right sm:text-left lg:text-right " }>{ setHours( d.waktuKirim ) }</p>
              </div>
            </div>
            <div className="  flex flex-row sm:flex-col md:flex-col lg:flex-row  gap-2 justify-between">
              {/*w-[55%]*/ }
              <div className="">
                {/*<p>{ d.status }</p>*/ }
                <p className={ "font-bold text-lg" }>{ Rupiah( d.totalBayar ) }</p>
              </div>
              {/*w-[45%]*/ }
              <div className="card-actions content-end  flex flex-col">


              </div>

            </div>

            {/*<label htmlFor="my_modal_7" className="btn">open modal</label>*/ }

            {/*/!* Put this part before </body> tag *!/*/ }
            {/*<input type="checkbox" id="my_modal_7" className="modal-toggle" />*/ }
            {/*<div className="modal">*/ }
            {/*  <div className="modal-box">*/ }
            {/*    <h3 className="text-lg font-bold">Hello!</h3>*/ }
            {/*    <p className="py-4">This modal works with a hidden checkbox!</p>*/ }
            {/*  </div>*/ }
            {/*  <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>*/ }
            {/*</div>*/ }


            {/*<input   className="modal modal-toggle " id="my_modal_7">*/ }
            {/*  <form method="dialog" className="modal-box">*/ }
            {/*    <h3 className="font-bold text-lg ">List Product</h3>*/ }


            {/*  </form>*/ }
            {/*  <form method="dialog" className="modal-backdrop">*/ }
            {/*    <button>close</button>*/ }
            {/*  </form>*/ }
            {/*</input>*/ }
          </div>
        </li> ) )
      }
    </ul>
  )
}

export type TListCard = {
  id: string
  hpPenerima: string;
  penerima: string;
  alamatPenerima: string;
  //
  pesan: string;
  kirim: string;
  waktuKirim: string;
  pengirim: string;
  totalBayar: number;
  namaPengiriman: string;
  typePembayaran: string;
  status: string
  semuaProduct: TProduct[]

}