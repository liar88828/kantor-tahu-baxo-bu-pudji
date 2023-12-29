'use client'
import { calculateTotal } from '@/app/components/organisme/table/utils/orderan';
import { notifyData } from '@/lib/notif/toash';
import { Status } from '@/app/style/status';
import { TextPopUp } from '@/app/components/Atom/Text/TextPopUp';
import { Rupiah } from '@/lib/utils/rupiah';
import { setIdOrderan } from '@/lib/utils/formatId';
import { newSetTanggal, setTanggal } from '@/lib/utils/formatDate';
import { formatPhone } from '@/lib/utils/formatPhone';
import { TOrder } from '@/interface/orderan';
import { useRouter } from 'next/navigation';
import { CardPopUp, FooterPopUp, PopUpCard } from '@/app/(pages)/(Transaction)/orderan/PopUpComponent';

export default function PopUp( { data, method, id }: {
  data: TOrder
  method: "POST" | "PUT"
  id: string
} ) {
  const router = useRouter()
  data.id      = method === 'POST'
                 ? setIdOrderan( data )
                 : id

  // data.id = method === "POST" ? setIdOrderan( data ) : id

  async function handleSave() {
    const semuaHargaOrderan = calculateTotal( data.listOrderan )
    const semuaHargaItem    = calculateTotal( data.listItem )
    data.totalBayar         = semuaHargaOrderan + semuaHargaItem + data.ongkir
    data.totalPenjualan     = semuaHargaOrderan
    data.hpPengirim         = "0" + data.hpPengirim.toString()
    data.hpPenerima         = "0" + data.hpPenerima.toString()

    const newSemuaProduct: TProOrderan[] = data
    .semuaProduct.map( ( d: TProOrderan ) => {
      d.orderanId = data.id
      return d
    } )

    const { semuaProduct, ...puts } = data
    const ress                      = Object.assign( { semuaProduct: newSemuaProduct }, puts )

    if( confirm( "Apakah Data yang di isi sudah Benar ??" ) ) {
      let url = 'http://localhost:3000/api/orderan'
      url     = method === 'PUT' ? `${ url }?id=${ id }` : url
      console.info( 'will send data to orderan  ' + method )
      const res = await fetch( url,
        {
          method : method,
          headers: { 'Content-Type': 'application/json' },
          body   : JSON.stringify( ress )
        } )
      if( !res.ok ) {
        notifyData( 'Error ' + method + 'data' )
        console.error( res )

      }
      const data = await res.json()
      if( data.success ) {
        // console.log( res )
        notifyData( `success  ${ method } ${ data.msg }` )
        router.refresh()
        // revalidateTag('orderans')
        // revalidatePath('/','page')

      }
      else {
        console.error( res )
        notifyData( `error ${ method } ${ data.msg }` )
      }
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
      {/*<label htmlFor="my_modal_7" className="btn">open modal</label>*/ }
      {/*<input type="checkbox" id="my_modal_7" className="modal-toggle" />*/ }
      {/*<div className="modal" role="dialog">*/ }
      {/*  <div className="modal-box">*/ }
      {/*    <h3 className="text-lg font-bold">Hello!</h3>*/ }
      {/*    <p className="py-4">This modal works with a hidden checkbox!</p>*/ }
      {/*  </div>*/ }
      {/*  <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>*/ }
      {/*</div>*/ }

      <label
        htmlFor={ `my_modal_Check_${ data.id }` }
        data-test={ 'button-check' }
        className={ "btn whitespace-nowrap text-white w-full" + Status( data.status ) }>
        Check
      </label>


      {/*{ data.semuaProduct.length !== 0*/ }
      {/*  && (*/ }
      <>
        <input type="checkbox"
               id={ `my_modal_Check_${ data.id }` }
               className="modal-toggle"
        />

        <div className="modal " data-theme={ 'light' }>
          <div className="modal-box md:w-4/5 lg:w-11/12 max-w-5xl  ">
            <div className="card ">
              <h1 className={ "font-bold uppercase " }>
                Detail Pesanan
                <span className={ Status( data.status ) + "p-2" }>{ data.status }</span>
                <TextPopUp title={ "Kode" }
                           value={ data.id as string }
                           style2={ "font-normal italic" }/>
              </h1>
              <div className="mt-2">
                <div className=" flex gap-1 flex-col sm:flex-row">
                  <PopUpCard>
                    <TextPopUp titik={ true } title={ "Nama Penerima" } value={ data.penerima }/>
                    <TextPopUp titik={ true } title={ "Hp Penerima" } value={ formatPhone( data.hpPenerima ) }/>
                    <TextPopUp titik={ true } title={ "Hp Penerima" } value={ data.dari }/>
                    <TextPopUp titik={ true } title={ "Alamat Penerima" } value={ data.alamatPenerima }/>
                    <TextPopUp titik={ true } title={ "Tanggal Pesan" } value={ setTanggal( data.pesan, 'tanggal' ) }/>
                    <TextPopUp titik={ true } title={ "waktu Kirim" } value={ newSetTanggal( data.waktuKirim ) }/>
                    <TextPopUp titik={ true } title={ "Lokasi" } value={ data.lokasi }/>
                  </PopUpCard>
                  <PopUpCard>
                    <TextPopUp titik={ true } title={ "Nama Pengirim" } value={ data.pengirim }/>
                    <TextPopUp titik={ true } title={ "Delivery" } value={ data.namaPengiriman }/>
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
                  </PopUpCard>
                </div>
                <CardPopUp semuaProduct={ data.semuaProduct }/>
                <FooterPopUp text={ data.guna }/>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  data-test={ 'button-save' }
                  onClick={ handleSave }
                  type="button"
                  className="text-white btn btn-xs sm:btn-md btn-success">
                  { method === "POST" ? "Simpan" : "Update" }
                </button>
                <label
                  data-test={ 'button-close' }
                  className="text-white btn btn-xs sm:btn-md btn-error"
                  htmlFor={ `my_modal_Check_${ data.id }` }>
                  TUTUP
                </label>
              </div>
            </div>
          </div>
          <label className="modal-backdrop text-black" htmlFor={ `my_modal_Check_${ data.id }` }> x</label>
        </div>
      </>
      {/*) }*/ }
    </>

  )
}
