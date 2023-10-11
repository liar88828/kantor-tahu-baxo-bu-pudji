"use client"
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { TOrder } from '@/entity/client/orderan';
import { ChangeEvent, useState } from 'react';
import { StyleInputForm, styleLabelForm } from '@/app/style/form';
import { InputForm } from '@/app/elements/input/InputNew';
import { Status } from '@/app/style/status';
import { AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { Rupiah } from '@/lib/utils/rupiah';
import { BiAddToQueue } from 'react-icons/bi';
import { regExp } from '@/app/components/table/utils/orderan';
import { currentMonth, currentYear } from '@/lib/utils/formatDate';
import { defaultValues } from '@/lib/utils/example/orderan';
import PopUp from '@/app/components/popup/orderan';
import { HeaderCard, ImageCards, TextCard } from '@/app/components/popup/PopUpComponent';

export const fomIsi = "bg-white flex-col flex sm:w-[48%]  md:w-[49%] ml-2 gap-3 rounded p-2 sm:p-5";

export function Orderan( {
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
  travel: Pick<TTravel, "nama">[],
  product: TProduct[]
  bank: Pick<TBank, "nama">[]
} ) {
  const { control, register, handleSubmit, formState: { errors, isSubmitted }, reset } = useForm<TOrder>( {
    defaultValues: defaultDataOrder,
    mode         : "onChange",
  } );

  // const [ isError, ] = useState( true )
  //
  // const requires = Object.keys( errors )
  // if( requires.length !== 0 && isError ) {
  //   const entries = Object.entries( errors );
  //   entries.forEach( ( d ) => {
  //       notifyData( `fail, ${ d[ 0 ].toUpperCase() } is ${ d[ 1 ].type === "pattern"
  //                                                          ? "symbol is not allow "
  //                                                          : "value is require" }` )
  //     }
  //   )
  // }

  const { fields, append, remove, } = useFieldArray( {
    control,
    name : "semuaProduct",
    rules: { required: "Please append at last 1 ", }
  } );

  const [ valueForm, setValueForm ] = useState<TOrder>( defaultValues )

  const onSubmit: SubmitHandler<TOrder> = ( data ) => {
    console.log( data )
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

  return ( <>{/*-----------------------Page-------------   */ }
      <form onSubmit={ handleSubmit( onSubmit ) }>
        <div className="flex flex-col sm:flex-row  sm:gap-3 mt-5">
          <div className={ fomIsi }>
            <div className={ "flex flex-col gap-3 " }>
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

              <InputForm tag={ "input" } title={ "Pesan" } type={ "date" }
                         min={ `${ currentYear }-${ currentMonth }-01` }
                         max={ `${ currentYear }-${ currentMonth + 1 }-31` }
                         reg={ register( "pesan", { required: true, } ) }
              />
              <InputForm tag={ "input" } title={ "Kirim" } type={ "date" }
                         min={ `${ currentYear }-${ currentMonth }-01` }
                         max={ `${ currentYear }-${ currentMonth + 1 }-31` }
                         reg={ register( "kirim", { required: true, } ) }
              />
              <InputForm tag={ "input" } title={ "Waktu Kirim" } type={ "time" }
                         reg={ register( "waktuKirim", { required: true, } ) }
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
              <div className=" flex flex-row  gap-1 sm:gap-7 w-[100%] ">

                <button type={ 'button' } className={ `w-1/4 py-2 mb-1  ${ !cariProduct ? " bg-red-600 "
                                                                                        : "  bg-blue-500 " } text-white cursor-pointer rounded ` }
                        onClick={ () => {setCariProduct( !cariProduct )} }>

              <span className=" flex flex-row items-center px-4 justify-around ">
                  <span>{ !cariProduct
                          ? <AiOutlineCloseCircle className={ " w-[1.5rem]   h-auto " }/>
                          : <AiOutlineSearch className={ " w-[1.5rem]  h-auto " }/> }</span>

                <span className=" sm:hidden md:block sm:mx-2 ">{ !cariProduct ? "Tutup" : "Cari" }</span>
              </span>

                </button>
                <label htmlFor={ "cari" } className={ "w-full" }>

                  <input
                    name={ "cari" }
                    id={ "cari" }
                    className={ StyleInputForm( false ) + " rounded leading-tight p-2 w-full " }
                    type="text"
                    value={ searchQuery }
                    placeholder={ " Cari Product" }
                    onChange={ handleSearchChange }
                    onClick={ () => {setCariProduct( false )} }/>
                </label>

              </div>

              {/*!-------------------------------------------------cariProduct----------------------------*/ }
              <div className={ ` ${ cariProduct || searchQuery.length < 1 ? " hidden "
                                                                          : " " } border border-gray-200 rounded bg-gray-50` }>
                <ul
                  className={ " border-gray-300 border overflow-y-auto   h-[15rem] bg-gray-50 p-2 rounded " }>
                  { filteredItems.map( ( item: TProduct, i: number ) => (
                    <li
                      key={ `${ item.id + i }` }
                      className={ ` ${ isItemAdded( item )
                                       ? " w-0 h-0  hidden "
                                       : "" } flex flex-row items-center gap-2 p-1 sm:p-2 border border-gray-300 bg-white` }
                      style={ {
                        visibility: isItemAdded( item ) ? 'hidden' : 'visible',
                      } }
                    >
                      {/*--------search--------*/ }
                      <ImageCards img={ item.img } nama={ item.nama }/>
                      <div className="ml-[2%] w-[60%]">
                        <HeaderCard nama={ item.nama }/>
                        <div className=" flex flex-row gap-2 justify-between ">

                          <div className={ "flex flex-col" }>
                            <TextCard text={ Rupiah( item.harga ) }/>
                            <TextCard text={ item.jenis }/>
                            <TextCard text={ item.lokasi }/>
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
                <ul className={ " border-gray-300 border overflow-y-auto   h-[15rem] bg-gray-50 p-2 rounded " }>
                  {/*--------------------------------------------------------loop-------------------------*/ }
                  { fields.map( ( item: TProduct, index: number ) => {
                    return (
                      <li className={ "flex flex-row items-center gap-2 p-1 sm:p-2 border border-gray-300 bg-white" }
                          key={ item.id }>
                        <>
                          <label htmlFor={ `semuaProduct.${ index }.id` } hidden={ true }>
                            <input type={ 'hidden' }
                                   id={ "id" }
                                   value={ item.id }{ ...register( `semuaProduct.${ index }.id`, { required: true } ) }/>
                          </label>

                          <label htmlFor={ `semuaProduct.${ index }.nama` } hidden={ true }>
                            <input type={ 'hidden' }
                                   value={ item.nama }{ ...register( `semuaProduct.${ index }.nama`, { required: true } ) }/>
                          </label>

                          <label htmlFor={ `semuaProduct.${ index }.keterangan` } hidden={ true }>
                            <input type={ 'hidden' }
                                   value={ item.keterangan }{ ...register( `semuaProduct.${ index }.keterangan`, { required: true } ) }/>
                          </label>

                          <label htmlFor={ `semuaProduct.${ index }.lokasi` } hidden={ true }>
                            <input type={ 'hidden' }
                                   value={ item.lokasi }{ ...register( `semuaProduct.${ index }.lokasi`, { required: true } ) }/>
                          </label>

                          <label htmlFor={ `semuaProduct.${ index }.jenis` } hidden={ true }>
                            <input type={ 'hidden' }
                                   value={ item.jenis }{ ...register( `semuaProduct.${ index }.jenis`, { required: true } ) }/>
                          </label>

                          <label htmlFor={ `semuaProduct.${ index }.img` } hidden={ true }>
                            <input type={ 'hidden' }
                                   value={ item.img }{ ...register( `semuaProduct.${ index }.img`, { required: true } ) }/>
                          </label>

                          <label htmlFor={ `semuaProduct.${ index }.harga` } hidden={ true }>
                            <input type={ 'hidden' }
                                   value={ item.harga }{ ...register( `semuaProduct.${ index }.harga`, { required: true } ) }/>
                          </label>
                        </>

                        {/* card */ }
                        <ImageCards img={ item.img } nama={ item.nama }/>
                        <div className="ml-[2%] w-[60%]">
                          <HeaderCard nama={ item.nama }/>
                          <div className=" flex flex-row gap-2 justify-between ">

                            <div className={ "flex flex-col" }>
                              <TextCard text={ Rupiah( item.harga ) }/>
                              <TextCard text={ item.jenis }/>
                              <TextCard text={ item.lokasi }/>
                            </div>

                            <div className=" flex flex-col items-end">
                              <label htmlFor={ `semuaProduct.${ index }.jumlah` }>
                                <input type={ "number" }
                                       min={ 1 }
                                       defaultValue={ 1 }
                                       className={ " border-gray-200 border   w-[70%] " }
                                       { ...register( `semuaProduct.${ index }.jumlah`,
                                         { valueAsNumber: true } ) }
                                />
                              </label>

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

              <label htmlFor="namaPengiriman" className={ styleLabelForm }>Ekspedisi</label>
              <select
                id={ "namaPengiriman" }
                className='bg-gray-50  border border-gray-300 p-2 rounded-md'{ ...register( "namaPengiriman" ) }>
                { travel.map( ( t, i ) => ( <option key={ `${ t.nama + i }` } value={ t.nama }>{ t.nama }</option> ) ) }
              </select>

              {/* tulis sendiri */ }
              <InputForm tag={ 'input' } title={ "Harga Ongkir" } type={ "number" }
                         reg={ register( "ongkir", { required: true, valueAsNumber: true } ) }/>
              <label htmlFor="lokasi" className={ styleLabelForm }>Lokasi</label>
              <select id={ "lokasi" }
                      className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "lokasi" ) }>
                <option value="Ungaran">Ungaran</option>
                <option value="Semarang">Semarang</option>
              </select>

              {/* jenis Pembayaran */ }
              <label htmlFor="typePembayaran" className={ styleLabelForm }>Pembayaran</label>
              <select
                id={ "typePembayaran" }
                className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "typePembayaran" ) }>
                { bank.map( ( b: Pick<TBank, "nama">, i ) => (
                  <option value={ b.nama } key={ `${ b.nama + i }` }>{ b.nama }</option>
                ) ) }
              </select>

              <label htmlFor="status" className={ styleLabelForm }>Status</label>
              <select id="status" defaultValue={ "Di Terima" }
                      className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "status" ) }>
                {/*/status/*/ }
                <option className={ Status( "Di Terima" ) } value="Di Terima">Di Terima</option>
                <option className={ Status( "Di Proses" ) } value='Di Proses'>Di Proses</option>
                <option className={ Status( "Di Kirim" ) } value="Di Kirim">Di Kirim</option>
                <option className={ Status( "Selesai" ) } value="Selesai"> Selesai</option>
              </select>
            </div>

            {/*{ isValid && (*/ }
            <button type="submit" className={ "btn btn-success text-white w-full" }>
              Add Product
            </button>
            {/*) }*/ }


            { isSubmitted && <PopUp data={ valueForm }
                                    id={ id }
                                    method={ method }
            />
            }
            { isSubmitted && <button className={ "btn btn-error text-white" }
                                     onClick={ () => reset( defaultValues ) }
                                     type="button"
            >Reset
            </button> }

          </div>
        </div>
      </form>
      {/*<OrderanTable data={ valueForm }/>*/
      }
      {/*<DevTool control={ control }/>*/
      }
    </>
  )
}

