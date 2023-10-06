import { ReactNode } from 'react';
import { TOrder } from '@/entity/client/orderan';
import { Rupiah } from '@/lib/utils/rupiah';
import { Texts } from '@/app/elements/Text/TextCard';
import { calculateTotal } from '@/app/components/table/utils/orderan';
import { Status } from '@/app/style/status';
import { ImageCard } from '@/app/components/form/Orderan/CComponent';
import { GateWay } from '@/app/utils/ress/GateWay';
import { notifyData } from '@/app/utils/notif/toash';
import { TResponse } from '@/entity/service/TResponse';
import { TextPopUp } from '@/app/elements/Text/TextPopUp';
import { setIdOrderan } from '@/lib/utils/formatId';

export function PopUp( { data, method, id }: {
  data: TOrder
  method: "POST" | "PUT"
  id: string
} ) {
  async function handleSave() {
    console.log( method )

    data.id                              = method === "POST" ? setIdOrderan( data ) : id
    data.hpPengirim                      = "0" + data.hpPengirim.toString()
    data.hpPenerima                      = "0" + data.hpPenerima.toString()
    const newSemuaProduct: TProOrderan[] = data
    .semuaProduct.map( ( d: TProOrderan ) => {
      d.orderanId = data.id
      return d
    } )

    const { listItem, listOrderan, semuaProduct, ...puts } = data
    const ress                                             = Object.assign( { semuaProduct: newSemuaProduct }, puts )

    // const getData = await onCreate( data, method, id )

    if( confirm( "Apakah Data yang di isi sudah Benar ??" ) ) {
      // console.log( ress )
      const res: TResponse<TOrderServer> = await GateWay( method, "orderan", id, ress ,)
      console.log( res )
      if( res.success ) {
        notifyData( res.msg )
      }
      else if( !res.success ) {
        notifyData( "", res )
      }

    }

  }

  return ( <>

      {/*<button type="submit" className="w-full">*/ }
      {/*  <label*/ }
      {/*    htmlFor="my_modal_Check"*/ }
      {/*    className="btn btn-success text-white w-full ">*/ }
      {/*    Add Product*/ }
      {/*  </label>*/ }

      {/*</button>*/ }

      <label
        htmlFor="my_modal_Check"
        className={ "btn btn-sm sm:btn-md text-white whitespace-nowrap " + Status( status ) }>
        Check
      </label>

      {/*<input type="checkbox"*/ }
      {/*       id="my_modal_Check"*/ }
      {/*       className="modal-toggle"/>*/ }

      { data.semuaProduct.length !== 0
        && (
          <>
            <input type="checkbox"
                   id="my_modal_Check"
                   className="modal-toggle"
            />

            <div className="modal ">
              <div className="modal-box md:w-4/5 lg:w-11/12 max-w-5xl  ">
                <div className="card ">
                  <h1 className={ "font-bold uppercase " }>
                    Detail Pesanan
                    <span className={ Status( data.status ) + "p-2" }>{ data.status }</span>

                    <TextPopUp title={ "Kode" } value={ data.id } style2={ "font-normal italic" }/>

                  </h1>

                  <div className="mt-2">

                    <div className=" flex gap-1 flex-col sm:flex-row">
                      <div className=" border border-gray-200 rounded p-2 gap-4 flex flex-col w-full sm:w-[50%] ">
                        <TextPopUp titik={ true } title={ "Nama Penerima" } value={ data.penerima }/>
                        <TextPopUp titik={ true } title={ "Hp Penerima" } value={ data.hpPenerima }/>
                        <TextPopUp titik={ true } title={ "Alamat Penerima" } value={ data.alamatPenerima }/>
                        <TextPopUp titik={ true } title={ "Tanggal Pesan" } value={ data.pesan.toString() }/>
                        <TextPopUp titik={ true } title={ "Tanggal Kirim" } value={ data.kirim.toString() }/>
                        <TextPopUp titik={ true } title={ "waktu Kirim" } value={ data.waktuKirim.toString() }/>
                        <TextPopUp titik={ true } title={ "Lokasi" } value={ data.lokasi }/>

                      </div>
                      <div className=" border border-gray-200 rounded p-2 gap-4 flex flex-col w-full sm:w-[50%]">
                        <TextPopUp titik={ true } title={ "Travel Pengirim" } value={ data.pengirim }/>
                        <TextPopUp titik={ true } title={ "Ekspedisi" } value={ data.namaPengiriman }/>
                        <TextPopUp titik={ true } title={ "Biaya Kirim/Ongkir" } value={ Rupiah( data.ongkir ) }/>
                        <TextPopUp titik={ true } title={ "Semua Harga Orderan" }
                                   value={ Rupiah( calculateTotal( data.listOrderan ) ) }/>
                        <TextPopUp titik={ true } title={ "Semua Harga Item" }
                                   value={ Rupiah( calculateTotal( data.listItem ) ) }/>
                        <TextPopUp titik={ true } title={ "Total Beli" }
                                   value={ Rupiah( calculateTotal( data.semuaProduct ) ) }/>
                        <TextPopUp titik={ true } title={ "Total Beli + Biaya Kirim" }
                                   value={ Rupiah( calculateTotal( data.listOrderan ) + calculateTotal(
                                       data.listItem ) +
                                     data.ongkir ) }/>
                      </div>
                    </div>

                    <CardPopUp semuaProduct={ data.semuaProduct }/>
                    <FooterPopUp text={ data.guna }/>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={ async () => {
                        await handleSave();
                      } }
                      type="button"
                      className="text-white btn btn-xs sm:btn-md btn-success">
                      { method !== "PUT" ? "Simpan" : "Update" }
                    </button>
                    {/*<button className={ "text-white btn btn-xs sm:btn-md btn-error" }>*/ }
                    <label className="text-white btn btn-xs sm:btn-md btn-error" htmlFor="my_modal_Check"> TUTUP</label>
                    {/*</button>*/ }
                  </div>
                </div>
              </div>
              <label className="modal-backdrop text-black" htmlFor="my_modal_Check"> x</label>
            </div>
          </>
        ) }
    </>

  )
}

export const FooterPopUp = ( { text }: { text: ReactNode } ) => {
  return <>
    <div className="shadow shadow-slate-300 p-2 rounded ">
      <Texts>Keterangan</Texts>
      <br/>
      <Texts>{ text }</Texts>
    </div>
  </>
}
export const CardBody    = ( { title, text }: { title: ReactNode, text: ReactNode } ) => {
  return <>
    <div className="card-body rounded p-1 sm:p-2 ">
      { title }
      { text }
    </div>
  </>
}

export const CardMaster = ( { children }: { children: ReactNode, } ) => {
  return <ul className="  relative overflow-x-auto rounded-lg bg-white p-2 mt-1 gap-2 flex shadow shadow-slate-300">
    { children }
  </ul>
}

export const Card = ( { children }: { children: ReactNode, } ) => {
  return <div className={ "card flex-nowrap flex" }>
    <div className="w-[10rem] rounded shadow shadow-gray-500 p-1 sm:p-2">
      { children }
    </div>
  </div>
}

export const CardPopUp = ( { semuaProduct }: { semuaProduct: TProduct[] } ) => {
  return <CardMaster>
    { semuaProduct.map( ( item: TProduct, ) => {
      return (
        <Card key={ item.id }>
          <ImageCard img={ item.img } nama={ item.nama }/>
          <CardBody
            title={
              <h1 className=" text-xs sm:text-lg font-bold mb-2">{ item.nama }</h1>
            }
            text={ <>
              <TextPopUp title={ "Harga" } value={ Rupiah( item.harga ) }/>
              <TextPopUp title={ "Jumlah" } value={ item.jumlah }/>
              <TextPopUp title={ "Jenis" } value={ item.jenis }/>
            </> }
          />
        </Card>
      )
    } ) }
  </CardMaster>
}