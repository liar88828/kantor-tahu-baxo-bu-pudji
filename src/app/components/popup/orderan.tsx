import { TOrder } from '@/entity/client/orderan';
import { Rupiah } from '@/lib/utils/rupiah';
import { calculateTotal } from '@/app/components/table/utils/orderan';
import { Status } from '@/app/style/status';
import { TextPopUp } from '@/app/elements/Text/TextPopUp';
import { setIdOrderan } from '@/lib/utils/formatId';
import { TResponse } from '@/entity/servers/service/TResponse';
import { GateWay } from '@/lib/utils/ress/GateWay';
import { notifyData } from '@/lib/utils/notif/toash';
import { CardPopUp, FooterPopUp } from '@/app/components/popup/PopUpComponent';

export default function PopUp( { data, method, id }: {
  data: TOrder
  method: "POST" | "PUT"
  id: string
} ) {

  async function handleSave() {
    const semuaHargaOrderan = calculateTotal( data.listOrderan )
    const semuaHargaItem    = calculateTotal( data.listItem )
    const totalHarga        = semuaHargaOrderan + semuaHargaItem + data.ongkir
    data.totalBayar         = totalHarga
    data.totalPenjualan     = semuaHargaOrderan
    data.id                 = method === "POST" ? setIdOrderan( data ) : id
    data.hpPengirim         = "0" + data.hpPengirim.toString()
    data.hpPenerima         = "0" + data.hpPenerima.toString()

    if( confirm( "Apakah Data yang di isi sudah Benar ??" ) ) {
      console.log( data )
      const res: TResponse<TOrderServer> = await GateWay( method, "orderan", id, data, )
      // console.log( res )
      if( res.success ) {
        notifyData( res.msg )
      }
      else if( !res.success ) notifyData( "", res )
    }
  }

  function setList(
    option: 'Item' | "Orderan",
    json: TProduct[]
  ) {

    data.semuaProduct
        .filter( ( d: TProduct ) => d.jenis.replaceAll( " ", "" ) === option )
        .forEach( ( d: TProduct ) => json.push( d ) )
  }

  data.listItem    = []
  data.listOrderan = []
  setList( "Item", data.listItem );
  setList( "Orderan", data.listOrderan );

  return ( <>


      <label
        htmlFor="my_modal_Check"
        className={ "btn btn-sm sm:btn-md text-white whitespace-nowrap " + Status( data.status ) }>
        Check
      </label>


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
                    <label className="text-white btn btn-xs sm:btn-md btn-error" htmlFor="my_modal_Check"> TUTUP</label>
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
