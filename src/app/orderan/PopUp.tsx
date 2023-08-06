import React, { Fragment } from 'react';
import { TotalOrderan }    from '@/entity/client/orderan';
import { Rupiah }          from '@/lib/utils/rupiah';
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
}                    from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { TProduct }        from '@/entity/client/produk';

export function PopUp( { clickPopUp, setClickPopUp, onCreate, data }: {
  clickPopUp: boolean,
  setClickPopUp: React.Dispatch<React.SetStateAction<boolean>>,
  onCreate: () => Promise<void>
  data: TotalOrderan
} ) {

  return (
    <Fragment>
      <Button onClick={ () => {setClickPopUp( !clickPopUp )} }
              data-modal-target="defaultModal" data-modal-toggle="defaultModal"
              className="bg-green-500 p-2 rounded-md text-white" type="button">
        Check
      </Button>


      {/*------------Card------------------*/ }
      <div className="">
        <Dialog open={ clickPopUp } handler={ () => {setClickPopUp( !clickPopUp )} }
                id="defaultModal" tabIndex={ -1 } className={ "m-20" } size="xxl">
          <div className="relative w-full ">

            <DialogBody className="relative rounded-lg shadow-md shadow-slate-500  bg-slate-50 ">

              <div
                className=" px-10 pt-10 pb-5  flex items-start justify-between  border-b rounded-t dark:border-gray-600">
                <DialogHeader>
                  <Typography variant="h5" color="black">
                    Detail Pesanan
                  </Typography>
                </DialogHeader>

                <XMarkIcon type="button" onClick={ () => setClickPopUp( !clickPopUp ) }
                           className="  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                           data-modal-hide="defaultModal"/>
              </div>

              <div className="px-10 py-5 space-y-6">
                <div className="  flex gap-5 flex-col sm:flex-row">
                  <Card variant="gradient" color="blue"
                        className="gap-5 flex flex-col w-full sm:w-[50%] border border-white p-5">
                    <Typography color="black">Kode : { data.no }</Typography>
                    <Typography color="black">Nama Penerima: { data.penerima }</Typography>
                    <Typography color="black">Hp Penerima: { data.hpPenerima }</Typography>
                    <Typography color="black">Alamat Penerima : { data.alamatPenerima }</Typography>
                    <Typography color="black">Tanggal Pesan : { data.pesan.toString() }</Typography>
                    <Typography color="black">Tanggal Kirim : { data.kirim.toString() }</Typography>
                    <Typography color="black">Tanggal waktu Kirim : { data.waktuKirim.toString() }</Typography>
                    <Typography color="black">Keterangan Lokasi : { data.lokasi }</Typography>
                  </Card>

                  <Card
                    variant="gradient"
                    color="blue"
                    className="gap-5 flex flex-col sm:ml-10 w-full sm:w-[50%]   border border-white p-5">
                    <Typography color="black">Lokasi : { data.lokasi }</Typography>
                    <Typography color="black">Travel Pengirim : { data.pengirim }</Typography>
                    <Typography color="black">Ekspedisi : { data.ekspedisi }</Typography>
                    <hr/>
                    <Typography color="black">Ongkir : { Rupiah( data.ongkir ) }</Typography>
                    <Typography color="black">Semua Harga Orderan
                      : { Rupiah( data.hitung.semuaHargaOrderan ) }</Typography>
                    <Typography color="black">Semua Harga Item : { Rupiah( data.hitung.semuaHargaItem ) }</Typography>
                    <Typography color="black">Semua Harga Produk
                      : { data.hitung.semuaHargaProduct && Rupiah( data.hitung.semuaHargaProduct ) }</Typography>
                    <Typography color="black">Semua Harga Total: { Rupiah( data.hitung.totalHarga ) }</Typography>

                  </Card>

                </div>

                <div className="">
                  <ul
                    className="  relative overflow-x-auto rounded-lg bg-white p-2 mt-1 gap-2 flex shadow shadow-slate-300">
                    { data.semuaProduct.map( ( item: TProduct, index: number ) => {
                      return (
                        <Card key={ item.id } color="blue" className={ "flex-nowrap flex" }>
                          <div
                            className="w-[10rem]  bg-white border border-slate-100 rounded-lg shadow shadow-black  p-2">
                            <CardHeader floated={ false }>
                              <img className="rounded  " src={ item.img } alt={ item.id }/>
                            </CardHeader>

                            <CardBody className=" rounded p-2 ">
                              <Typography variant="h6" color="black" className="mb-2">{ item.nama }</Typography>
                              <Typography color="black">{ Rupiah( item.harga ) }</Typography>
                              <Typography color="black">Jenis : { item.jenis }</Typography>
                              <Typography color="black"> Jumlah : { item.jumlah }</Typography>
                            </CardBody>
                          </div>
                        </Card>
                      )
                    } ) }
                  </ul>
                </div>
                <div className="shadow shadow-slate-300 p-2 rounded ">

                  <Typography color="black">Keterangan : </Typography>
                  <Typography color="black">{ data.guna }</Typography>
                </div>
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
                  Tutup
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
