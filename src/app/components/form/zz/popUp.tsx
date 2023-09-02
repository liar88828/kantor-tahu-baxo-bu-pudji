"use client"
import { TOrder } from '@/entity/client/orderan';
import { Status } from '@/app/style/status';
import { Rupiah } from '@/lib/utils/rupiah';
import { calculateTotal } from '@/app/components/table/utils/orderan';
import Image from 'next/image';

const PopUpOrder = ( { valueForm, method }: { valueForm: TOrder, method: "PUT" | "POST" } ) => {
  return (
    <>
      <button className="btn" onClick={ () => {
        // @ts-ignore
        window.my_modal_2.showModal();
      } }>open modal
      </button>

      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <div className="card">
            <div className="card-title"> Detail Pesanan <span
              className={ Status( valueForm.status ) + "p-2" }>{ valueForm.status }</span>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <div className=" flex gap-5 flex-col sm:flex-row">
              <div className="card-body gap-5 flex flex-col w-full sm:w-[50%] border border-white p-5">
                <p>Kode : { valueForm.id }</p>
                <p>Nama Penerima: { valueForm.penerima }</p>
                <p>Hp Penerima: { valueForm.hpPenerima }</p>
                <p>Alamat Penerima : { valueForm.alamatPenerima }</p>
                <p>Tanggal Pesan : { valueForm.pesan.toString() }</p>
                <p>Tanggal Kirim : { valueForm.kirim.toString() }</p>
                <p> waktu Kirim : { valueForm.waktuKirim.toString() }</p>
                <p>Keterangan Lokasi : { valueForm.lokasi }</p>
              </div>
              <hr/>
              <div className={ "border-l-black border" }/>
              <div className="gap-5 flex flex-col sm:ml-10 w-full sm:w-[50%]   border border-white p-5">
                <p color="black">Lokasi : { valueForm.lokasi }</p>
                <p color="black">Travel Pengirim : { valueForm.pengirim }</p>
                <p color="black">Ekspedisi : { valueForm.namaPengiriman }</p>
                <hr/>
                <p color="black">Biaya Kirim/Ongkir : { Rupiah( valueForm.ongkir ) }</p>
                <p color="black">Semua Harga Orderan : { Rupiah( calculateTotal( valueForm.listOrderan ) ) }</p>
                <p color="black">Semua Harga Item : { Rupiah( calculateTotal( valueForm.listItem ) ) }</p>
                <p color="black">Total Beli : { Rupiah( calculateTotal( valueForm.semuaProduct ) ) }</p>
                <p color="black">Total Beli + Biaya Kirim :{ Rupiah( calculateTotal( valueForm.listOrderan ) +
                  calculateTotal( valueForm.listItem ) + valueForm.ongkir ) }</p>
              </div>
            </div>

            <div className="my-4">
              <ul
                className=" bg-gray-200  relative overflow-x-auto rounded-lg  p-2 mt-1 gap-2 flex shadow shadow-slate-300">
                { valueForm.semuaProduct.map( ( item: TProduct ) => {
                  return (
                    <div key={ item.id } className={ "card flex-nowrap flex" }>
                      <div
                        className="w-[10rem]  bg-white border border-slate-100 rounded-lg shadow shadow-black  p-2">

                        <div>
                          <Image
                            height={ 100 }
                            width={ 100 }
                            className=" rounded object-cover  h-32 w-full"
                            src={ item.img }
                            alt={ item.id }/>
                        </div>

                        <div className="card-body rounded p-2 ">
                          <p className="mb-2 font-bold">{ item.nama }</p>
                          <p className={ "text-sm" }> { Rupiah( item.harga ) }</p>
                          <p className={ "text-sm" }>Jenis : { item.jenis }</p>
                          <p className={ "text-sm" }> Jumlah : { item.jumlah }</p>
                        </div>
                      </div>
                    </div>
                  )
                } ) }
              </ul>
            </div>


            <div className="shadow shadow-slate-300 p-2 rounded ">
              <p>Keterangan : </p>
              <p>{ valueForm.guna }</p>
            </div>

            <div
              className="card-actions flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={ async () => //await handleSave()
                  console.log( "click" )
                }
                type="button" className="btn btn-info text-white">
                { method !== "PUT" ? "Simpan" : "Update" }
              </button>
              <button className="btn btn-ghost btn-outline">Close</button>
            </div>
          </div>
        </form>
      </dialog>
    </>

  );
};

