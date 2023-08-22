"use client"
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Thitung, TOrder, TotalOrderan } from '@/entity/client/orderan';
import React, { useState } from 'react';
import { defaultValues } from '@/app/utils/format/orderan';
import { StyleInputForm, styleLabelForm } from '@/app/style/form';
import { InputForm } from '@/app/elements/input/InputNew';
import { Status } from '@/app/style/status';
import { AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { Rupiah } from '@/lib/utils/rupiah';
import { BiAddToQueue } from 'react-icons/bi';
import { OrderanTable } from '@/app/components/table/Orderan';
import { PopUp } from '@/app/components/popup/orderan';
import { setIdOrderan } from '@/lib/utils/formatId';
import { notifyData } from '@/app/utils/notif/toash';
import Image from 'next/image';
import { getData as getTravelData } from '@/app/utils/ress/travel';
import { getData as getProductData } from '@/app/utils/ress/product';

let regExp: RegExp;
regExp = /^[a-zA-Z0-9.,_ ]+$/i;

// async function getTravel() {
//   return await getTravelData()
// }
//
// async function getProduct() {
//   return await getProductData()
// }

export async function FormOrder( {
  id = "",
  method = "POST",
  defaultDataOrder,
}: {
  id: string,
  method: string,
  defaultDataOrder: Awaited<TOrder>,

} ) {
  const travelData: Promise<{ data: TTravel[], msg: string }>   = getTravelData()
  const productData: Promise<{ data: TProduct[], msg: string }> = getProductData()

  const [ travel, product ] = await Promise.all( [ travelData, productData ] )
  return ( <ClientComponent id={ id } method={ method }
                            defaultDataOrder={ defaultDataOrder }
                            travel={ travel.data }
                            product={ product.data }/>
  )
}

export function ClientComponent( {
  id = "", method = "POST", defaultDataOrder, product, travel
}: {
  id: string,
  method: string,
  defaultDataOrder: Awaited<TOrder>,
  travel: TTravel[],
  product: TProduct[]
} ) {

  // const getData = async () => {
  //   const dataProduct = await fetch( config.url + "/api/product/" ).then( res => res.json() )
  //   const dataTravel  = await fetch( config.url + "/api/travel/" ).then( res => res.json() )
  //   return { dataProduct, dataTravel }
  // }

  // const [ travel, setTravel ]   = useState<TTravel[]>( [] )
  // const [ product, setProduct ] = useState<TProduct[]>( [] )
  // console.log( travel )
  // console.log( product )

  // const myFunction = async () => {
  //   const { dataProduct, dataTravel } = await getData()
  //   setProduct( dataProduct.data )
  //   setTravel( dataTravel.data )
  // };

  // useEffect( () => {
  //   // setIsLoading( true )
  //   myFunction().then( r => console.log( r ) )
  //   // setIsLoading( false )
  //
  // }, [] )

  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<TOrder>(
    {
      defaultValues: defaultDataOrder,
      mode         : "onChange",
    } );

  const [ isError, ] = useState( true )

  const requiress = Object.keys( errors )
  if( requiress.length !== 0 && isError ) {
    const entries = Object.entries( errors );
    // console.log( entries )
    entries.forEach( ( d, i ) => {
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
  const [ clickPopUp, setClickPopUp ] = useState( false );

  const [ valueForm, setValueForm ] = useState<TOrder>( defaultValues )
  const newProduct: TProduct[]      = []
  const newItem: TProduct[]         = []
  valueForm.listOrderan             = newProduct
  valueForm.listItem                = newItem

  const filterJenis = ( o: TProduct, a: string, array: TProduct[] ) => {
    if( o.jenis === a ) {
      const index = array.findIndex( ( item ) => item.id === o.id );
      if( index === -1 ) {
        array.push( o );
      }
      else {
        array[ index ] = o;
      }
    }
  }

  valueForm.semuaProduct.forEach( ( o ) => {
    filterJenis( o, "Orderan", newProduct )
    filterJenis( o, "Item", newItem )
  } );

  const semuaProduct: Omit<TProduct, "img">[] = [ ...valueForm.listOrderan, ...valueForm.listItem ]
  const mergeData                             = Object.assign( { semuaProduct }, valueForm )

  // filter dan hapus list item ada orderan
  if( mergeData.semuaProduct.length > 0 ) {
    for( let i = 0; i < mergeData.semuaProduct.length; i++ ) {
      if( mergeData.semuaProduct[ i ] === undefined ) {
        delete mergeData.semuaProduct[ i ]
      }
    }
  }

  mergeData.semuaProduct.filter( ( element ) => element !== undefined );

  // -----------------------Calculator Product
  const calculateTotal = ( array: TProduct[] ) => {
    return array.reduce( ( acc, item ) => acc + item.harga * item.jumlah, 0 );
  };

  const semuaHargaOrderan = calculateTotal( mergeData.listOrderan )
  const semuaHargaItem    = calculateTotal( mergeData.listItem )
  const semuaHargaProduct = mergeData.semuaProduct.length > 0 ? calculateTotal( mergeData.semuaProduct ) : 0

  const totalHarga             = semuaHargaOrderan + semuaHargaItem + mergeData.ongkir
  const hitung: Thitung        = { semuaHargaOrderan, semuaHargaItem, semuaHargaProduct, totalHarga }
  const dataBaru: TotalOrderan = Object.assign( { hitung, }, mergeData )
  dataBaru.id                  = id || setIdOrderan( dataBaru )
  dataBaru.totalBayar          = dataBaru.hitung.totalHarga
  dataBaru.totalPenjualan      = dataBaru.hitung.semuaHargaOrderan

  const onSubmit: SubmitHandler<TOrder> = ( data ) => {
    console.log( data )
    setValueForm( data )
  };

  const [ searchQuery, setSearchQuery ]     = useState( '' );
  const [ cart, setCart ]                   = useState<TOrder["semuaProduct"]>( fields );
  const [ filteredItems, setFilteredItems ] = useState<TOrder["semuaProduct"]>( fields );
  const [ cariProduct, setCariProduct ]     = useState<boolean>( false )

  const handleSearchChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
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

  const isItemAdded = ( item: TProduct ) => cart.some( ( cartItem ) => cartItem.nama ===
    item.nama )

  const addToCart = ( item: TProduct ) => {
    const isItemInCart = fields.some( ( cartItem ) => cartItem.nama ===
      item.nama );
    if( isItemInCart ) {
      alert( `Item "${ item.nama }" is already in the cart.` );
      setFilteredItems( ( prevItems ) => prevItems.filter( ( listItem ) => listItem.nama !==
        item.nama ) );
      remove( fields.length )
      return;
    }
    setCart( ( prevCart ) => [ ...prevCart, item ] );
    setFilteredItems( ( prevItems ) => prevItems.filter( ( listItem ) => listItem.nama !==
      item.nama ) );
  };

  const removeFromCart = ( item: TProduct ) => {
    setCart( ( prevCart ) => prevCart.filter( ( cartItem ) => cartItem.nama !== item.nama ) );
    setFilteredItems( ( prevItems ) => [ ...prevItems, item ] );

    valueForm.listItem.filter( dataItem => dataItem.nama !== item.nama )
    valueForm.listOrderan.filter( dataItem => dataItem.nama !== item.nama )
  };

  const fomIsi = "bg-white flex-col flex   sm:w-[48%]  md:w-[49%] ml-2 gap-3 rounded p-2  sm:p-5";

  // if( isLoading ) {
  //   return ( <h1>Loading ya ....</h1> )
  // }
  console.log( travel )
  console.log( product )
  return ( < >{/*-----------------------Page-------------   */ }
      <form className="bg-green-100 sm:bg-green-50  w-[98%] lg  "
            onSubmit={ handleSubmit( onSubmit ) }>
        <div className="flex flex-col sm:flex-row  sm:gap-3 mt-5">
          <div className="flex flex-wrap"></div>
          <div className={ fomIsi }>
            <div className={ "flex-col flex gap-3 " }>
              <h2 className={ styleLabelForm }>Nama</h2>
              <hr/>
              <InputForm title={ "Pengirim" } type="text"
                         reg={ register( "pengirim", {
                           required: true,
                           pattern : regExp
                         } ) }
                         defaultValue={ "Kantor Tahu Baxo" }/>

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
              <h2>Tanggal</h2>
              <hr/>
              <InputForm tag={ "input" } title={ "Pesan" } type={ "date" } min="2023-01-01"
                         reg={ register( "pesan", { required: true, } ) }
                // defaultValue={ defaultDate() }
              />
              <InputForm tag={ "input" } title={ "Kirim" } type={ "date" }
                         min="2023-01-01"
                         reg={ register( "kirim", { required: true, } ) }
                // defaultValue={ defaultDate() }
              />
              <InputForm tag={ "input" } title={ "Waktu Kirim" } type={ "time" }
                         reg={ register( "waktuKirim", { required: true, } ) }
                // defaultValue={ getTime() }
              />
              <InputForm tag={ "textarea" } title={ "Keterangan" } type={ "" }
                         reg={ register( "guna", {
                           required: true,
                           pattern : regExp
                         } ) }
              />
            </div>
          </div>
          <div className={ fomIsi }>
            <div className="flex flex-col gap-3">{/*<h1Product Search</h1>*/ }
              <div className=" flex flex-row  gap-1 sm:gap-7 w-[100%] ">

                <button type={ 'button' }
                        className={ `w-1/4 py-2 mb-1  ${ !cariProduct
                                                         ? " bg-red-600 "
                                                         : "  bg-blue-500 " } text-white cursor-pointer rounded ` }
                        onClick={ () => {setCariProduct( !cariProduct )} }>

              <span
                className=" flex flex-row items-center px-4 justify-around ">
                  <span>{
                    !cariProduct
                    ? <AiOutlineCloseCircle
                      className={ " w-[1.5rem]   h-auto " }/> :
                    <AiOutlineSearch
                      className={ " w-[1.5rem]  h-auto " }/> }
                </span>

                <span className=" hidden sm:block sm:mx-2 ">
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
                {/*<SearchItemList items={ filteredItems } addToCart={ addToCart } cart={ cart }/>*/ }
                <ul
                  className={ "p-0.5 sm:p-2 border border-gray-50 rounded  overflow-y-auto relative h-[20rem] " }>
                  { filteredItems.map( ( item: TProduct, ) => ( <li
                      className={ ` ${ isItemAdded( item )
                                       ? " w-0 h-0  hidden "
                                       : "" } p-0.5 sm:p-4 flex flex-row gap-2 border border-gray-200 rounded items-center justify-around bg-white` }
                      style={ {
                        backgroundColor: isItemAdded( item ) ? 'lightgreen' : 'transparent',
                        fontWeight     : isItemAdded( item ) ? 'bold' : 'normal',
                        visibility     : isItemAdded( item ) ? 'hidden' : 'visible',
                      } }
                      key={ item.id }>

                      <Image
                        height={ 100 }
                        width={ 100 }
                        className={ " rounded bg-blue-300 w-[20%] h-auto" }
                        src={ item.img }
                        alt={ item.nama }/>

                      <p className={ "flex flex-col" }>
                    <span
                      className={ "text-sm sm:text-base " +
                        styleLabelForm }>{ item.nama }</span>
                        <span
                          className={ "text-sm sm:text-base" +
                            styleLabelForm }>{ Rupiah( item.harga ) }</span>
                        <span
                          className={ "text-sm sm:text-base" +
                            styleLabelForm }>{ item.jenis }</span>
                        <span
                          className={ "text-sm sm:text-base" +
                            styleLabelForm }>{ item.lokasi }</span>
                      </p>

                      <button type={ "button" } onClick={ () => {
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
                              className={ "bg-blue-600 text-white p-1 sm:p-2 rounded flex flex-row justify-center items-center gap-1" }>
                        <BiAddToQueue/>
                        <span className="invisible sm:visible w-0 sm:w-auto">  Add
                      <span className={ "sm:hidden" }>to Cart</span>
                    </span>
                      </button>
                    </li>
                  ) ) }
                </ul>

              </div>

              {/*----------------------------------------------- -CART LIST-------------------------------------*/ }

              <div className="flex flex-col gap-1"
                   onClick={ () => setCariProduct( true ) }>
                <ul className={ " border-gray-300 border overflow-y-auto relative h-[15rem] bg-gray-50 p-2 rounded" }>

                  {/*--------------------------------------------------------loop-------------------------*/ }
                  { fields.map( ( item: TProduct, index: number ) => {
                    return ( <li
                      className={ "flex flex-row justify-between  items-center gap-2 p-1 sm:p-3 border border-gray-300 bg-white" }
                      key={ item.id }>

                      <Image height={ 100 }
                             width={ 100 }
                             className={ " rounded bg-blue-300 w-20 h-auto" }
                             src={ item.img } alt={ index.toString() }/>
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

                      <div className=" flex flex-col">
                        <p>{ item.nama }</p>
                        <table className={ "border-transparent" }>
                          <tbody className={ "border-transparent" }>
                          <tr>
                            <td className={ " hidden lg:block text-base md:text-sm " }><span>Harga </span></td>
                            <td className={ "text-base md:text-sm  sm:text-xs" }> { Rupiah( item.harga ) }</td>
                          </tr>
                          <tr>
                            <td className={ " hidden lg:block text-base md:text-sm " }><span>Jenis </span></td>
                            <td className={ "text-base md:text-sm sm:text-xs" }>{ item.jenis }</td>
                          </tr>
                          <tr>
                            <td className={ " hidden lg:block text-base md:text-sm " }><span>Lokasi </span></td>
                            <td className={ "text-base md:text-sm sm:text-xs" }>{ item.lokasi }</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="  justify-center flex-col   flex gap-1 ">
                        <label className={ "w-auto" }>
                          <span className={ "hidden sm:block md:text-base sm:text-xs" }>Jumlah</span>
                          <input type={ "number" } min={ 1 } defaultValue={ 1 }
                                 className={ " border-gray-200 border w-[100%]  sm:w-[80%] md:text-base sm:text-xs" }
                                 { ...register( `semuaProduct.${ index }.jumlah`, { valueAsNumber: true } ) }
                          />

                          <button
                            className={ "bg-red-600 text-white p-1 sm:p-2 rounded flex flex-row justify-center" +
                              " items-center gap-1 w-[100%]  sm:w-[80%] " }
                            type={ "button" }
                            onClick={ () => {
                              removeFromCart( item );
                              remove( index )
                            } }>
                            <BiAddToQueue/>
                            <span
                              className="hidden sm:block w-0 sm:w-auto md:text-base sm:text-xs">Hapus</span>
                          </button>
                        </label>
                      </div>

                      {/*<button*/ }
                      {/*  className={ "bg-red-500 p-2" }*/ }
                      {/*  onClick={ () => removeFromCart( item ) }>Remove*/ }
                      {/*</button>*/ }

                    </li> )
                  } ) }
                </ul>
              </div>

              {/*      <option value="Tahu Bakso Rebus">Tahu Bakso Rebus Rp.42.000</option>.*/ }
              {/*      <option value="Tahu Bakso Vakum">Tahu Bakso Vakum Rp.46.000</option>*/ }
              {/*      <option value="Tahu Bakso Specialty">Tahu Bakso Special Rp.50.000</option>*/ }
              {/*      <option value="Tahu Bakso Goreng">Tahu Bakso Goreng Rp.45.000</option>*/ }
              {/*      <option value="Bandeng Presto">Bandeng Presto Rp.60.000</option>*/ }
              {/*      <option value="Otak-Otak Bandeng">Otak-Otak Bandeng Rp.70.000</option>*/ }
              {/*      <option value="Bakso Sapi 20">Bakso Sapi 20 Rp.40.000</option>*/ }
              {/*      <option value="Bakso Sapi 12">Bakso Sapi 12 Rp.25.000</option>*/ }
              {/*      <option value="Bakso Aneka">Bakso Aneka Rp.29.000</option>*/ }
              {/*      <option value="Nugget">Nugget Rp.27.000</option>*/ }
              {/*      <option value="Rolade Tahu">Rolade Tahu Rp.19.000</option>*/ }
              {/*      <option value="Rolade Singkong">Rolade Singkong Rp.19.000</option>*/ }

            </div>
            <hr className={ "m-2" }/>
            <div className={ "flex flex-col gap-3" }>

              {/* combo box  */ }

              <label htmlFor="" className={ styleLabelForm }>Ekspedisi</label>
              <select id="ekspedisi"
                      className='bg-gray-50  border border-gray-300 p-2 rounded-md'{ ...register( "namaPengiriman" ) }>
                { travel.map( t => {
                  return (
                    <option key={ t.namaPengiriman } value={ t.namaPengiriman }>{ t.namaPengiriman }
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
                <option value="Cash">Cash</option>
                <option value="BCA">BCA</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BRI">BRI</option>
              </select>

              <label htmlFor="" className={ styleLabelForm }>Status</label>
              <select id="pembayaran"
                      className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "status" ) }>
                {/*/status/*/ }
                <option className={ Status( "Di Terima" ) } value="Di Terima">Di Terima</option>
                <option className={ Status( "Di Proses" ) } value='Di Proses'>Di Proses</option>
                <option className={ Status( "Di Kirim" ) } value="Di Kirim">Di Kirim</option>
                <option className={ Status( "Selesai" ) } value="Selesai"> Selesai</option>
              </select>
            </div>

            <button type="submit"
                    className="btn btn-success text-white"
            >Add Product
            </button>

            { dataBaru.semuaProduct.length !== 0
              && ( <PopUp
                clickPopUp={ clickPopUp }
                setClickPopUp={ setClickPopUp }
                data={ dataBaru }
                id={ id }
                method={ method }
              /> ) }

            <button className={ "btn btn-error text-white" }
                    onClick={ () => reset( defaultValues ) }
                    type="button"
            >Reset
            </button>
          </div>
        </div>
      </form>
      <OrderanTable data={ dataBaru }/>
      {/*<DevTool control={ control }/>*/ }
    </>
  )
}
