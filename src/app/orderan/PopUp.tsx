import React from 'react';
import { TOrder } from '../../../entity/orderan';
import { TFormProduct } from '../../../entity/produk';

export function PopUp( { clickPopUp, setClickPopUp, onCreate, data }: {
  clickPopUp: boolean,
  setClickPopUp: React.Dispatch<React.SetStateAction<boolean>>,
  onCreate: () => Promise<void>
  data: TOrder & { dataBaru: TFormProduct[] }
} ) {
  console.log( data )

  return (
    <div className="">
      <button
        onClick={ () => {setClickPopUp( !clickPopUp )} }
        data-modal-target="defaultModal" data-modal-toggle="defaultModal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        kirim
      </button>


      {/*------------Card------------------*/ }

      <div id="defaultModal" tabIndex={ -1 }
           aria-hidden="true"
           className={ `${ !clickPopUp ? "hidden" : "" }  
           fixed  z-[10]  w-full p-[10%] overflow-x-hidden 
           overflow-y-auto inset-0` }>
        <div className="relative w-full  max-h-full">

          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">

            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Terms of Service
              </h3>


              <button type="button"
                      onClick={ () => {
                        setClickPopUp( !clickPopUp )
                      } }
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="defaultModal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>


            <div className="p-10 space-y-6">
              <h1>
                Kode : { data.orang.penerima.slice( 0, 2 ) + "/" +
                data.orang.hpPenerima.slice( 0, 2 ) + "/" +
                data.orang.alamatPenerima.slice( 0, 2 ) + "/" +
                data.tanggal.pesan.toString().slice( 0, 2 ) }
              </h1>
              <h1>Nama Penerima: { data.orang.penerima }</h1>
              <h1>Hp Penerima: { data.orang.hpPenerima }</h1>
              <h1>Alamat Penerima : { data.orang.alamatPenerima }</h1>
              <h1>Tanggal Pesan : { data.tanggal.pesan.toString() }</h1>
              <h1>Tanggal Kirim : { data.tanggal.kirim.toString() }</h1>
              <h1>Tanggal waktu Kirim : { data.tanggal.waktuKirim.toString() }</h1>
              <h1>Keterangan : { data.keterangan.guna }</h1>
              <ul>
                { data.dataBaru.map( d => {
                  console.log( d )
                  return (
                    d.jenis
                  )
                } ) }
                <li>

                </li>
              </ul>
              <h1>Keterangan : { data.keterangan.lokasi }</h1>

              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts new consumer privacy laws for
                its
                citizens, companies around the world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25
                and is
                meant to ensure a common set of data rights in the European Union. It requires organizations
                to notify
                users as soon as possible of high-risk data breaches that could personally affect them.
              </p>
            </div>
            <div
              className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={ () => {
                  onCreate()
                  console.log( "click" )
                } }
                data-modal-hide="defaultModal" type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I
                Simpan
              </button>

              <button
                onClick={ () => {setClickPopUp( !clickPopUp )} }
                data-modal-hide="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



