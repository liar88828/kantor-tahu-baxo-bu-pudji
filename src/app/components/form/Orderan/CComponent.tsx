"use client"
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { TOrder } from '@/entity/client/orderan';
import { ChangeEvent, useState } from 'react';
import { defaultValues } from '@/app/utils/format/orderan';
import { StyleInputForm, styleLabelForm } from '@/app/style/form';
import { InputForm } from '@/app/elements/input/InputNew';
import { Status } from '@/app/style/status';
import { AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { Rupiah } from '@/lib/utils/rupiah';
import { BiAddToQueue } from 'react-icons/bi';
import { PopUp } from '@/app/components/popup/orderan';
import { setIdOrderan } from '@/lib/utils/formatId';
import { notifyData } from '@/app/utils/notif/toash';
import { calculateTotal, regExp } from '@/app/components/table/utils/orderan';
import Image from 'next/image';
import { currentMonth, currentYear } from '@/lib/utils/formatDate';

export function CComponent( {
  id = "",
  method,
  defaultDataOrder,
  product,
  travel,
  bank
}: {
  id: string,
  method: "POST" | "PUT",
  defaultDataOrder: TOrder,
  travel: TTravel[],
  product: TProduct[]
  bank: TBank[]
} ) {
  // console.log(defaultDataOrder)
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<TOrder>(
    {
      defaultValues: defaultDataOrder,
      mode         : "onChange",
    } );

  const [ isError, ] = useState( true )

  const requires = Object.keys( errors )
  if( requires.length !== 0 && isError ) {
    const entries = Object.entries( errors );
    entries.forEach( ( d ) => {
        notifyData( `fail, ${ d[ 0 ].toUpperCase() } is ${ d[ 1 ].type === "pattern"
                                                           ? "symbol is not allow "
                                                           : "value is require" }` )
      }
    )
  }

  const { fields, append, remove, } = useFieldArray( {
    control,
    name : "semuaProduct",
    rules: { required: "Please append at last 1 ", }
  } );

  // const [ clickPopUp, setClickPopUp ] = useState( false );
  const [ valueForm, setValueForm ] = useState<TOrder>( defaultValues )

  // -----------------------Calculator Product

  const semuaHargaOrderan  = calculateTotal( valueForm.listOrderan )
  const semuaHargaItem     = calculateTotal( valueForm.listItem )
  const totalHarga         = semuaHargaOrderan + semuaHargaItem + valueForm.ongkir
  valueForm.id             = id || setIdOrderan( valueForm )
  valueForm.totalBayar     = totalHarga
  valueForm.totalPenjualan = semuaHargaOrderan

  const onSubmit: SubmitHandler<TOrder> = ( data ) => {
    function setList(
      option: 'Item' | "Orderan",
      json: TProduct[]
    ) {
      // console.info( data )
      data.semuaProduct
          .filter( ( d: TProduct ) => d.jenis.replaceAll( " ", "" ) === option )
          .forEach( ( d: TProduct ) => json.push( d ) )
    }

    data.listItem    = []
    data.listOrderan = []
    setList( "Item", data.listItem );
    setList( "Orderan", data.listOrderan );
    // console.log( data )
    setValueForm( data )
  };

  const [ searchQuery, setSearchQuery ]     = useState( '' );
  const [ cart, setCart ]                   = useState<TOrder["semuaProduct"]>( fields );
  const [ filteredItems, setFilteredItems ] = useState<TOrder["semuaProduct"]>( fields );
  const [ cariProduct, setCariProduct ]     = useState<boolean>( false )

  const handleSearchChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    setSearchQuery( event.target.value );

    const filtered = product.filter(
      ( item ) => {
        return (
          item.nama.toLowerCase().includes( searchQuery.toLowerCase() ) ||
          item.harga.toString().includes( searchQuery.toLowerCase() ) )
      }
    );
    setFilteredItems( filtered );
  };

  const isItemAdded = ( item: TProduct ) => cart.some( ( cartItem: TProduct ) => cartItem.nama ===
    item.nama )

  const addToCart = ( item: TProduct ) => {
    const isItemInCart = fields.some( ( cartItem ) => cartItem.nama ===
      item.nama )
    if( isItemInCart ) {
      alert( `Item "${ item.nama }" is already in the cart.` );
      setFilteredItems( ( prevItems: TProduct[] ) => prevItems.filter( ( listItem ) => listItem.nama !==
        item.nama ) );
      remove( fields.length )
      return;
    }
    setCart( ( prevCart: TProduct[] ) => [ ...prevCart, item ] );
    setFilteredItems( ( prevItems: TProduct[] ) => prevItems
    .filter( ( listItem ) => listItem.nama !==
      item.nama ) );
  };

  const removeFromCart = ( item: TProduct ) => {
    setCart( ( prevCart: TProduct[] ) => prevCart.filter( ( cartItem ) => cartItem.nama !== item.nama ) );
    setFilteredItems( ( prevItems: TProduct[] ) => [ ...prevItems, item ] );
  };

  const fomIsi = "bg-white flex-col flex sm:w-[48%]  md:w-[49%] ml-2 gap-3 rounded p-2 sm:p-5";

  return ( <>{/*-----------------------Page-------------   */ }
      <form className="bg-green-100 sm:bg-green-50  w-[98%] lg  "
            onSubmit={ handleSubmit( onSubmit ) }>
        <div className="flex flex-col sm:flex-row  sm:gap-3 mt-5">
          {/*<div className="flex flex-wrap"></div>*/ }
          <div className={ fomIsi }>
            <div className={ "flex-col flex gap-3 " }>
              {/*<h2 className={ styleLabelForm }>Nama</h2>*/ }
              {/*<hr/>*/ }
              <InputForm title={ "Pengirim" } type="text"
                         reg={ register( "pengirim", {
                           required: true,
                           pattern : regExp
                         } ) }
              />

              <InputForm title={ "Hp Pengirim" } type={ "number" }
                         reg={ register( "hpPengirim",
                           {
                             required     : true,
                             valueAsNumber: true,
                           } ) }/>
              <InputForm title={ "Penerima" } type={ "text" }
                         reg={ register( "penerima", {
                           required: true,
                           pattern : regExp
                         } ) }/>
              <InputForm title={ "Alamat Penerima" } type={ "text" }
                         reg={ register( "alamatPenerima", {
                           required: true,
                           pattern : regExp
                         } ) }/>
              <InputForm title={ "Hp Penerima" } type={ "number" }
                         reg={ register( "hpPenerima", {
                           required     : true,
                           valueAsNumber: true,
                         } ) }/>
            </div>
            <div className={ " flex-col flex gap-3 " }>
              {/*<h2>Tanggal</h2>*/ }
              {/*<hr/>*/ }
              <InputForm tag={ "input" } title={ "Pesan" } type={ "date" }
                         min={ `${ currentYear }-${ currentMonth }-01` }
                         max={ `${ currentYear }-${ currentMonth + 1 }-31` }
                         reg={ register( "pesan", { required: true, } ) }
                // defaultValue={ defaultDate() }
              />
              <InputForm tag={ "input" } title={ "Kirim" } type={ "date" }
                         min={ `${ currentYear }-${ currentMonth }-01` }
                         max={ `${ currentYear }-${ currentMonth + 1 }-31` }
                         reg={ register( "kirim", { required: true, } ) }
                // defaultValue={ defaultDate() }
              />
              <InputForm tag={ "input" } title={ "Waktu Kirim" } type={ "time" }
                         reg={ register( "waktuKirim", { required: true, } ) }
                // defaultValue={ getTime() }
              />
              <InputForm tag={ "textarea" } title={ "Keterangan" } type={ "textarea" }
                         max={ "100" }
                         min={ "20" }
                         reg={ register( "guna", {
                           required: true,
                           pattern : regExp
                         } ) }
              />
            </div>
          </div>
          <div className={ fomIsi }>
            <div className="flex flex-col gap-3">
              {/*<h1Product Search</h1>*/ }
              <div className=" flex flex-row  gap-1 sm:gap-7 w-[100%] ">

                <button type={ 'button' } className={ `w-1/4 py-2 mb-1  ${ !cariProduct ? " bg-red-600 "
                                                                                        : "  bg-blue-500 " } text-white cursor-pointer rounded ` }
                        onClick={ () => {setCariProduct( !cariProduct )} }>

              <span className=" flex flex-row items-center px-4 justify-around ">
                  <span>{ !cariProduct
                          ? <AiOutlineCloseCircle className={ " w-[1.5rem]   h-auto " }/>
                          : <AiOutlineSearch className={ " w-[1.5rem]  h-auto " }/> }</span>

                <span className=" sm:hidden md:block sm:mx-2 ">
                  { !cariProduct
                    ? "Tutup"
                    : "Cari" }</span>
              </span>
                </button>
                <input className={ StyleInputForm( false ) +
                  " rounded leading-tight w-3/4 p-2" }
                       type="text"
                       value={ searchQuery }
                       placeholder={ " Cari Product" }
                       onChange={ handleSearchChange }
                       onClick={ () => {setCariProduct( false )} }/>
              </div>

              {/*!-------------------------------------------------cariProduct----------------------------*/ }
              <div className={ ` ${ cariProduct || searchQuery.length < 1 ? " hidden "
                                                                          : " " } border border-gray-200 rounded bg-gray-50` }>
                <ul
                  className={ " border-gray-300 border overflow-y-auto relative h-[15rem] bg-gray-50 p-2 rounded " }>
                  { filteredItems.map( ( item: TProduct, ) => (
                    <li
                      className={ ` ${ isItemAdded( item )
                                       ? " w-0 h-0  hidden "
                                       : "" } flex flex-row items-center gap-2 p-1 sm:p-2 border border-gray-300 bg-white` }
                      style={ {
                        visibility: isItemAdded( item ) ? 'hidden' : 'visible',
                      } }
                      key={ item.id }>
                      {/*--------search--------*/ }
                      <ImageCard img={ item.img } nama={ item.nama }/>
                      <div className="ml-[2%] w-[60%]">
                        <HeaderCard nama={ item.nama }/>
                        <div className=" flex flex-row gap-2 justify-between ">

                          <div className={ "flex flex-col" }>
                            <TextCard text={ Rupiah( item.harga ) }/>
                            <TextCard text={ Rupiah( item.jenis ) }/>
                            <TextCard text={ Rupiah( item.lokasi ) }/>
                          </div>

                          <div className="">
                            <button
                              className={ " text-white btn-sm md:btn-md btn btn-info " }
                              type={ "button" }
                              onClick={ () => {
                                append(
                                  {
                                    id        : item.id,
                                    nama      : item.nama,
                                    harga     : item.harga,
                                    lokasi    : item.lokasi,
                                    jumlah    : 1,
                                    keterangan: item.keterangan,
                                    jenis     : item.jenis,
                                    img       : item.img,
                                  }
                                )
                                addToCart( item )
                              } }
                            >
                              <BiAddToQueue/>
                              <span className={ "ml-1 hidden md:hidden lg:block" }>Add</span>
                            </button>

                          </div>
                        </div>
                      </div>
                    </li>
                  ) ) }
                </ul>

              </div>

              {/*----------------------------------------------- -CART LIST-------------------------------------*/ }

              <div className="border border-gray-200 rounded bg-gray-50"
                   onClick={ () => setCariProduct( true ) }>
                <ul className={ " border-gray-300 border overflow-y-auto relative h-[15rem] bg-gray-50 p-2 rounded " }>
                  {/*--------------------------------------------------------loop-------------------------*/ }
                  { fields.map( ( item: TProduct, index: number ) => {
                    return ( <li
                      className={ "flex flex-row items-center gap-2 p-1 sm:p-2 border border-gray-300 bg-white" }
                      key={ item.id }>
                      <>
                        <input type={ 'hidden' }
                               value={ item.id }{ ...register( `semuaProduct.${ index }.id`, { required: true } ) }/>
                        <input type={ 'hidden' }
                               value={ item.nama }{ ...register( `semuaProduct.${ index }.nama`, { required: true } ) }/>
                        <input type={ 'hidden' }
                               value={ item.keterangan }{ ...register( `semuaProduct.${ index }.keterangan`, { required: true } ) }/>
                        <input type={ 'hidden' }
                               value={ item.jenis }{ ...register( `semuaProduct.${ index }.lokasi`, { required: true } ) }/>
                        <input type={ 'hidden' }
                               value={ item.jenis }{ ...register( `semuaProduct.${ index }.jenis`, { required: true } ) }/>
                        <input type={ 'hidden' }
                               value={ item.jenis }{ ...register( `semuaProduct.${ index }.img`, { required: true } ) }/>
                        <input type={ 'hidden' }
                               value={ item.harga }{ ...register( `semuaProduct.${ index }.harga`, { required: true } ) }/>
                      </>

                      {/* card */ }
                      <ImageCard img={ item.img } nama={ item.nama }/>
                      <div className="ml-[2%] w-[60%]">
                        <HeaderCard nama={ item.nama }/>
                        <div className=" flex flex-row gap-2 justify-between ">

                          <div className={ "flex flex-col" }>
                            <TextCard text={ Rupiah( item.harga ) }/>
                            <TextCard text={ Rupiah( item.jenis ) }/>
                            <TextCard text={ Rupiah( item.lokasi ) }/>
                          </div>

                          <div className=" flex flex-col items-end">
                            <input type={ "number" }
                                   min={ 1 }
                                   defaultValue={ 1 }
                                   className={ " border-gray-200 border   w-[70%] " }
                                   { ...register( `semuaProduct.${ index }.jumlah`,
                                     { valueAsNumber: true } ) }
                            />

                            <button className={ "text-white btn-sm md:btn-md btn btn-error  " }
                                    type={ "button" }
                                    onClick={ () => {
                                      removeFromCart( item );
                                      remove( index )
                                    } }>
                              <AiOutlineCloseCircle/>
                              <span className="ml-1 hidden md:hidden lg:block">Hapus</span>
                            </button>

                          </div>

                        </div>
                      </div>
                    </li> )
                  } ) }
                </ul>
              </div>
            </div>

            <hr className={ "m-2" }/>
            <div className={ "flex flex-col gap-3" }>

              {/* combo box  */ }

              <label htmlFor="" className={ styleLabelForm }>Ekspedisi</label>
              <select id="ekspedisi"
                      className='bg-gray-50  border border-gray-300 p-2 rounded-md'{ ...register( "namaPengiriman" ) }>
                { travel.map( ( t ) => {
                  // console.log( "orderan" )
                  // console.log( t )
                  return (
                    <option key={ t.nama } value={ t.nama }>{ t.nama }
                      {/*<img src={"http://localhost:3000/"+  t.img } alt={ t.namaPengiriman } height={100} width={100}/>*/ }
                    </option>
                  )
                } ) }
              </select>

              {/* tulis sendiri */ }
              <InputForm tag={ 'input' } title={ "Harga Ongkir" } type={ "number" }
                         reg={ register( "ongkir", { required: true, valueAsNumber: true } ) }/>
              <label htmlFor="" className={ styleLabelForm }>Lokasi</label>
              <select id="lokasi"
                      className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "lokasi" ) }>
                <option value="Ungaran">Ungaran</option>
                <option value="Semarang">Semarang</option>
              </select>

              {/* jenis Pembayaran */ }
              <label htmlFor="" className={ styleLabelForm }>Pembayaran</label>
              <select id="pembayaran"
                      className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "typePembayaran" ) }>
                { bank.map( ( b: TBank ) => ( <option value={ b.nama } key={ b.nama }>{ b.nama }</option>
                ) ) }

              </select>

              <label htmlFor="" className={ styleLabelForm }>Status</label>
              <select id="pembayaran" defaultValue={ "Di Terima" }
                      className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "status" ) }>
                {/*/status/*/ }
                <option className={ Status( "Di Terima" ) } value="Di Terima">Di Terima</option>
                <option className={ Status( "Di Proses" ) } value='Di Proses'>Di Proses</option>
                <option className={ Status( "Di Kirim" ) } value="Di Kirim">Di Kirim</option>
                <option className={ Status( "Selesai" ) } value="Selesai"> Selesai</option>
              </select>
            </div>

            <button type="submit" className={ "w-full" }>
              <label
                htmlFor="my_modal_Check"
                className="btn btn-success text-white w-full">
                Add Product
              </label>
            </button>

            {/*<button type="submit" className={"btn btn-success text-white w-full"}>*/ }
            {/*  Add Product*/ }
            {/*</button>*/ }

            <PopUp
                data={ valueForm }
                id={ id }
                method={ method }
            />


            <button className={ "btn btn-error text-white" }
                    onClick={ () => reset( defaultValues ) }
                    type="button"
            >Reset
            </button>

          </div>
        </div>
      </form>
      {/*<OrderanTable data={ valueForm }/>*/ }
      {/*<DevTool control={ control }/>*/ }
    </>
  )
}

export const TextCard   = ( { text }: { text: string | number } ) => {
  return <span className={ "text-xs sm:text-base" + styleLabelForm }>{ text }</span>

}
export const HeaderCard = ( { nama }: { nama: string | number } ) => {
  return <span className={ "text-sm sm:text-base font-bold " + styleLabelForm }>{ nama }</span>

}
export const ImageCard  = ( { img, nama }: { img: string, nama: string } ) => {
  return <figure className={ " h-32 object-cover rounded " }>
    <Image src={ img }
           alt={ nama }
           width={ 100 }
           height={ 100 }
           className=" rounded object-cover h-full w-32"
    />
  </figure>

}