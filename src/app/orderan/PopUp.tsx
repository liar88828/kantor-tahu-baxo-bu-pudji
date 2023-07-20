import React, { Fragment } from 'react';
import { TOrder } from '../../../entity/orderan';
import { TFormProduct } from '../../../entity/produk';
import { Rupiah } from '../../../lib/rupiah';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/20/solid';

export function PopUp( { clickPopUp, setClickPopUp, onCreate, data }: {
  clickPopUp: boolean,
  setClickPopUp: React.Dispatch<React.SetStateAction<boolean>>,
  onCreate: () => Promise<void>
  data: TOrder & { dataBaru: TFormProduct[] }
} ) {
  console.log( data )
  return (
    <Fragment>
      <Button
        onClick={ () => {setClickPopUp( !clickPopUp )} }
        data-modal-target="defaultModal" data-modal-toggle="defaultModal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        Check
      </Button>


      {/*------------Card------------------*/ }
      <div className="">

        <Dialog id="defaultModal" tabIndex={ -1 }
                open={ clickPopUp } handler={ () => {setClickPopUp( !clickPopUp )} }
                className={ "m-20" }
                size="xxl"
        >

          <div className="relative w-full  ">

            <DialogBody className="relative  rounded-lg shadow dark:bg-gray-700 ">

              <div
                className=" px-10 pt-10 pb-5  flex items-start justify-between  border-b rounded-t dark:border-gray-600">
                <DialogHeader //className="text-xl font-semibold text-gray-900 dark:text-white"
                >
                  <Typography variant="h5" color="white">
                    Detail Pesanan
                  </Typography>
                </DialogHeader>

                <XMarkIcon type="button" onClick={ () => setClickPopUp( !clickPopUp ) }
                           className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                           data-modal-hide="defaultModal"/>
              </div>


              <div className="px-10 py-5 space-y-6">
                <div className="  flex gap-5">
                  <Card variant="gradient" color="blue" className="gap-5 flex flex-col w-[50%] border border-white p-2">
                    <Typography color="white">
                      Kode : { data.orang.penerima.slice( 0, 2 ) + "/" +
                      data.orang.hpPenerima.slice( 0, 2 ) + "/" +
                      data.orang.alamatPenerima.slice( 0, 2 ) + "/" +
                      data.tanggal.pesan.toString().slice( 0, 2 ) }
                    </Typography>
                    <Typography color="white">Nama Penerima: { data.orang.penerima }</Typography>
                    <Typography color="white">Hp Penerima: { data.orang.hpPenerima }</Typography>
                    <Typography color="white">Alamat Penerima : { data.orang.alamatPenerima }</Typography>
                    <Typography color="white">Tanggal Pesan : { data.tanggal.pesan.toString() }</Typography>
                    <Typography color="white">Tanggal Kirim : { data.tanggal.kirim.toString() }</Typography>
                    <Typography color="white">Tanggal waktu Kirim : { data.tanggal.waktuKirim.toString() }</Typography>
                  </Card>

                  <Card
                    variant="gradient"
                    color="blue"
                    className="gap-5 flex flex-col ml-10 w-[50%]  border border-white p-2">
                    <Typography color="white">Keterangan : { data.keterangan.lokasi }</Typography>
                    <Typography color="white">Lokasi : { data.keterangan.lokasi }</Typography>
                    <Typography color="white">Travel Pengirim : { data.orang.pengirim }</Typography>
                    <Typography color="white">Ekspedisi : { data.travel.ekspedisi }</Typography>
                    <Typography color="white">Ongkir : { data.travel.ongkir }</Typography>
                  </Card>

                </div>

                <div className="">
                  <ul className="  relative overflow-x-auto rounded-lg bg-white p-2 mt-1 gap-2 flex">
                    { data.dataBaru.map( ( item: TFormProduct, index: number ) => {
                      return (
                        <Card key={ item.id } color="blue" className={ "flex-nowrap flex" }>
                          <div
                            className="w-[10rem]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2">
                            <CardHeader floated={ false }>
                              {/*// className=" mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white"*/ }
                              <img className="rounded  " src={ item.img } alt={ item.id }

                              />
                            </CardHeader>

                            <CardBody className=" rounded p-2 ">
                              <Typography variant="h6" color="white" className="mb-2">{ item.nama }</Typography>
                              <Typography
                                color="white"
                                //  className="text-sm font-normal text-gray-700 dark:text-gray-400"
                              >{ Rupiah( item.harga ) }</Typography>
                              <Typography
                                color="white"//  className="text-sm font-normal text-gray-700 dark:text-gray-400"
                              >Jenis : { item.jenis }</Typography>
                              <Typography
                                color="white"//  className="text-sm font-normal text-gray-700 dark:text-gray-400"
                              > Jumlah : { item.jumlah }</Typography>
                            </CardBody>
                          </div>
                        </Card>
                      )
                    } ) }
                  </ul>
                </div>
                <Typography color={ "white" }>Keterangan :</Typography>
                <Typography color={ "white" }>{ data.keterangan.guna }</Typography>
              </div>

              <DialogFooter
                className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={ () => {
                    onCreate()
                    console.log( "click" )
                  } }
                  data-modal-hide="defaultModal" type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Simpan
                </button>

                <button
                  onClick={ () => {setClickPopUp( !clickPopUp )} }
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  Decline
                </button>

              </DialogFooter>

            </DialogBody>


          </div>

        </Dialog>
      </div>

    </Fragment>
  )
    ;
}