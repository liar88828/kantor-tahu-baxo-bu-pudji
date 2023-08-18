import React, { Fragment } from 'react';
import { TotalOrderan } from '@/entity/client/orderan';
import { Rupiah } from '@/lib/utils/rupiah';
import {
  Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, Typography
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { notifyData } from '@/app/utils/notif/toash';
import { onCreate } from '@/app/utils/ress/orderan';
import { Status } from '@/app/style/status';

export function PopUp( { clickPopUp, setClickPopUp, data, method, id }: {
  clickPopUp: boolean,
  setClickPopUp: React.Dispatch<React.SetStateAction<boolean>>,
  data: TotalOrderan
  method: string
  id: string
} ) {

  async function handleSave() {
    data.hpPengirim = data.hpPengirim.toString()
    data.hpPenerima = data.hpPenerima.toString()
    const getData   = await onCreate( data, method, id )
    console.error( getData )
    notifyData( getData.msg )
  }

  return (
    <Fragment>
      <button onClick={ () => {setClickPopUp( !clickPopUp )} }
              data-modal-target="defaultModal"
              data-modal-toggle="defaultModal"
              className="btn btn-info text-white"
              type="button">
        Check
      </button>

      {/*------------Card------------------*/ }
      <div className="z-0">
        <Dialog open={ clickPopUp }
                handler={ () => {setClickPopUp( !clickPopUp )} }
                id="defaultModal" tabIndex={ -1 }
                className={ "m-20 " }
                size="xxl"
        >

          <div className="relative w-full ">
            <DialogBody className="relative rounded-lg shadow-md shadow-slate-500  bg-slate-50 ">
              <div
                className=" px-10 pt-10 pb-5  flex items-start justify-between  border-b rounded-t dark:border-gray-600">
                <DialogHeader>
                  <Typography variant="h5" color="black">
                    Detail Pesanan <span className={ Status( data.status ) + "p-2" }>{ data.status }</span>
                  </Typography>
                </DialogHeader>
                <XMarkIcon type="button"
                           onClick={ () => setClickPopUp( !clickPopUp ) }
                           className="  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                           data-modal-hide="defaultModal"/>
              </div>

              <div className="px-10 py-5 space-y-6">
                <div className="  flex gap-5 flex-col sm:flex-row">
                  <Card variant="gradient" color="blue"
                        className="gap-5 flex flex-col w-full sm:w-[50%] border border-white p-5">
                    <Typography color="black">Kode : { data.id }</Typography>
                    <Typography color="black">Nama Penerima: { data.penerima }</Typography>
                    <Typography color="black">Hp Penerima: { data.hpPenerima }</Typography>
                    <Typography color="black">Alamat Penerima : { data.alamatPenerima }</Typography>
                    <Typography color="black">Tanggal Pesan : { data.pesan.toString() }</Typography>
                    <Typography color="black">Tanggal Kirim : { data.kirim.toString() }</Typography>
                    <Typography color="black"> waktu Kirim : { data.waktuKirim.toString() }</Typography>
                    <Typography color="black">Keterangan Lokasi : { data.lokasi }</Typography>
                  </Card>

                  <Card variant="gradient" color="blue"
                        className="gap-5 flex flex-col sm:ml-10 w-full sm:w-[50%]   border border-white p-5">
                    <Typography color="black">Lokasi : { data.lokasi }</Typography>
                    <Typography color="black">Travel Pengirim : { data.pengirim }</Typography>
                    <Typography color="black">Ekspedisi : { data.namaPengiriman }</Typography>
                    <hr/>
                    <Typography color="black">Ongkir : { Rupiah( data.ongkir ) }</Typography>
                    <Typography color="black">Semua Harga Orderan
                      : { Rupiah( data.hitung.semuaHargaOrderan ) }</Typography>
                    <Typography color="black">Semua Harga Item : { Rupiah( data.hitung.semuaHargaItem ) }</Typography>
                    <Typography color="black">Semua Harga Produk
                      : { Rupiah( data.hitung.semuaHargaProduct ) }</Typography>
                    <Typography color="black">Semua Harga Total: { Rupiah( data.hitung.totalHarga ) }</Typography>
                  </Card>
                </div>

                <div className="">
                  <ul
                    className="  relative overflow-x-auto rounded-lg bg-white p-2 mt-1 gap-2 flex shadow shadow-slate-300">
                    { data.semuaProduct.map( ( item: TProduct, index: number ) => {
                      return (
                        <Card key={ item.id } color="blue"
                              className={ "flex-nowrap flex" }>
                          <div
                            className="w-[10rem]  bg-white border border-slate-100 rounded-lg shadow shadow-black  p-2">
                            <CardHeader floated={ false }>
                              <img className="rounded  " src={ item.img }
                                   alt={ item.id }/>
                            </CardHeader>

                            <CardBody className=" rounded p-2 ">
                              <Typography variant="h6" color="black" className="mb-2">{ item.nama }</Typography>
                              <Typography color="black">{/*Harga */ }{ Rupiah( item.harga ) }</Typography>
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
                  onClick={ async () => {
                    await handleSave();
                  } }
                  data-modal-hide="defaultModal" type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  { method !== "PUT" ? "Simpan" : "Update" }
                </button>

                <button
                  onClick={ () => {setClickPopUp( !clickPopUp )} }
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900  dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
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
