"use client"
import React, { ReactElement, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { StyleInputForm, styleLabelForm } from '@/app/style/form';
import { BiAddToQueue } from 'react-icons/bi';
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { Rupiah } from '../../../lib/rupiah';
import { defaultDate, getDateNow, getLocaleTime, getTime } from '../../../lib/formatDate';
import { InputFormProps, Thitung, TOrder, TotalOrderan } from '../../../entity/orderan';
import { sProduct, TFormProduct } from '../../../entity/produk';
import { DevTool } from "@hookform/devtools";
import { SDiTerima, SKirim, SProcess, SSelesai } from '@/app/style/status';
import TableOrder from '@/app/orderan/TableOrder';
import { createOrder } from '@/app/orderan/ress';

type TOrderKeys = keyof TOrder['orang']
  | keyof TOrder['tanggal'] |
  keyof TOrder["keterangan"] |
  keyof TOrder["total"] |
  keyof TOrder["travel"]

type Props = { tag?: keyof JSX.IntrinsicElements; } & React.HTMLAttributes<HTMLOrSVGElement>;

export default function FormOrder() {
  const [ salah, setSalah ] = useState( false );
  const [ count, setCount ] = useState<number>( 1 );

  const defaultValues: TOrder = {
    //data orang
    orang: {
      pengirim: 'Kantor Tahu Baxo',
      hpPengirim: '',
      penerima: '',
      alamatPenerima: '',
      hpPenerima: '',
    },

    // waktu
    //toLocaleString === harus di isi parameternya
    tanggal: {
      pesan: getDateNow(),
      kirim: getDateNow(),
      waktuKirim: getLocaleTime()
    }
    ,
    // product
    listOrderan: [],
    listItem: [],
    semuaProduct: [],
    keterangan: {
      guna: "",
      lokasi: "",
    },
    travel: {
      namaPengiriman: "Kantor Tahu Baxo ",
      ekspedisi: '',
      ongkir: 0,
    },

    //transaksi
    total: {
      no: "",
      pembayaran: "",
      total: 0,
      totalBayar: 0,
      totalPenjualan: 0,
      status: 'Di terima',
    }
  }

  const { control, register, setValue, watch, handleSubmit, formState: { errors }, } = useForm<TOrder>( {/* defaultValues: defaultValues, */
    mode: "onChange",
  } );

  const { fields, append, remove } = useFieldArray( {
    control,
    name: "semuaProduct",
    rules: {
      required: "Please appent at last 1 ",
    }
  } );

  const [ valueForm, setValueForm ] = useState<TOrder>( defaultValues )

  const newProduct: TFormProduct[] = []
  const newItem: TFormProduct[] = []
  valueForm.listOrderan = newProduct
  valueForm.listItem = newItem

  const filterJenis = ( o: TFormProduct, a: string, array: TFormProduct[] ) => {
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

  const semuaProduct: TFormProduct[] = [ ...valueForm.listOrderan, ...valueForm.listItem ]
  const mergeData = Object.assign( { semuaProduct }, valueForm )
// success merge
// console.log( mergeData )

  // const dataProduct: TFormProduct[] = Object.assign( valueForm.listItem, valueForm.listOrderan )
  // const { listItem, ...newValue } = valueForm

  // filter dan hapus list item ada orderan
  if( mergeData.semuaProduct.length > 0 ) {
    for( let i = 0; i < mergeData.semuaProduct.length; i++ ) {
      if( mergeData.semuaProduct[ i ] === undefined ) {
        delete mergeData.semuaProduct[ i ]
      }
    }
  }

  // console.log(valueForm)
  // const data = Object.assign( { dataProduct: dataProduct }, valueForm )
  // console.log( filterItem, "filter item" )
  // console.log( dataProduct, "Gabung Product" )
  // console.log( listItem, "item" )
  // console.log( valueForm.listOrderan, "orderan" )
  // console.log( valueForm.listOrderan, "Item" )
  // const mergeProduct = Object.assign( listItem, valueForm.listOrderan )

  mergeData.semuaProduct.filter( ( element ) => element !== undefined );

  // -----------------------Calculator Product
  const semuaHargaOrderan = mergeData.listOrderan.reduce( ( acc, item ) => acc + item.harga * item.jumlah, 0 )
  const semuaHargaItem = mergeData.listItem.reduce( ( acc, item ) => acc + item.harga * item.jumlah, 0 )
  const semuaHargaProduct = mergeData.semuaProduct.length > 0 && mergeData.semuaProduct.reduce( ( acc, item ) => acc + item.harga * item.jumlah, 0 )
  const totalHarga = Number( semuaHargaOrderan ) + Number( semuaHargaItem ) + Number( mergeData.travel.ongkir )
//

  const hitung: Thitung = {
    semuaHargaOrderan,
    semuaHargaItem,
    semuaHargaProduct,
    totalHarga
  }
// //data yang sudah di process
  const dataBaru: TotalOrderan = Object.assign( { hitung }, mergeData )
  const data = dataBaru
  console.log( data )

  // console.log( semuaHargaOrderan, "harga orderan" )
  // console.log( semuaHargaItem, "harga Item" )
  // console.log( semuaHargaProduct, "semua harga Product" )
  // console.log( totalHarga, "total termasuk ongkir" )

  // console.log(valueForm)
  // const dataBaru = { ...newData, ...{ listItemBaru: item } }
  // console.log( dataBaru, "dataBaruku" )
// console.log(data,"oooooo")

  // const combineObject: TFormProduct[] = Object.assign( valueForm.listItem, valueForm.listOrderan )
  // const mergeObject = Object.assign( { dataProduct: combineObject }, valueForm )
  // const cloneObject = structuredClone( mergeObject )

  const onSubmit: SubmitHandler<TOrder> = ( data ) => setValueForm( data );

  const onCreate = async () => {
    if( confirm( "Apakah Data yang di isi sudah Benar ??" ) ) {
      // Save it!
      console.log( 'Thing was saved to the database.', valueForm );

      const responseData = await createOrder( valueForm )
      console.log( responseData )
    }
    else {
      // Do nothing!
      // console.log( 'Thing was not saved to the database.' );
    }
  }

  const InputForm: React.FC<InputFormProps> = (
      { tag: Tag = "input", title, type, reg, value, min, defaultValue }: InputFormProps ): ReactElement => {
      let ress = { className: `${ StyleInputForm( salah ) }`, placeholder: `Nama ${ title }....`, }
      if( type ) ress = Object.assign( ress, { type } );
      if( value ) ress = Object.assign( ress, { value } );
      if( min ) ress = Object.assign( ress, { min } );
      if( defaultValue ) ress = Object.assign( ress, { defaultValue } );

      return (
        <div className="flex flex-col">
          <label className={ styleLabelForm } htmlFor="grid-password">{ title }</label>
          <Tag { ...ress }{ ...reg }/>
          {/*<p>{ errors. }</p>*/ }
        </div>
      )
        ;
    }
  ;

  function Nama() {
    return (
      <>
        <div className={ "flex-col flex gap-3 " }><h2>Nama</h2>
          <hr/>
          <InputForm title={ "Pengirim" } type="text" reg={ register( "orang.pengirim" ) }
                     defaultValue={ "Kantor Tahu Baxo" }/>
          <InputForm title={ "Hp Pengirim" } type={ "number" }
                     reg={ register( "orang.hpPengirim", { valueAsNumber: true } ) }/>
          <InputForm title={ "Penerima" } type={ "text" } reg={ register( "orang.penerima" ) }/>
          <InputForm title={ "Alamat Penerima" } type={ "text" } reg={ register( "orang.alamatPenerima" ) }/>
          <InputForm title={ "Hp Penerima" } type={ "number" }
                     reg={ register( "orang.hpPenerima", { valueAsNumber: true } ) }/>
        </div>
      </>
    );
  }

  function Tanggal() {
    return (
      <>
        <div className={ " flex-col flex gap-3 " }>
          <h2>Tanggal</h2>
          <hr/>
          <InputForm tag={ "input" } title={ "Pesan" } type={ "date" } reg={ register( "tanggal.pesan" ) }
                     min="2023-01-01"
                     defaultValue={ defaultDate() }/>
          <InputForm tag={ "input" } title={ "Kirim" } type={ "date" } reg={ register( "tanggal.kirim" ) }
                     defaultValue={ defaultDate() }/>
          <InputForm tag={ "input" } title={ "Waktu Kirim" } type={ "time" } reg={ register( "tanggal.waktuKirim" ) }
                     defaultValue={ getTime() }/>
          <InputForm tag={ "textarea" } title={ "Keterangan" } type={ "" } reg={ register( "keterangan.guna" ) }/>
        </div>
      </> )
  }

  function Orderan() {
    const [ searchQuery, setSearchQuery ] = useState( '' );
    const [ cart, setCart ] = useState<TFormProduct[]>( fields );
    const [ filteredItems, setFilteredItems ] = useState<TFormProduct[]>( sProduct );
    const [ cariProduct, setCariProduct ] = useState<boolean>( false )

    const addToCart = ( item: TFormProduct ) => {
      const isItemInCart = cart.some( ( cartItem ) => cartItem.id === item.id );
      if( isItemInCart ) {
        alert( `Item "${ item.nama }" is already in the cart.` );
        setFilteredItems( ( prevItems ) => prevItems.filter( ( listItem ) => listItem.id !== item.id ) );
        return;
      }
      setCart( ( prevCart ) => [ ...prevCart, item ] );
      setFilteredItems( ( prevItems ) => prevItems.filter( ( listItem ) => listItem.id !== item.id ) );
    };

    const removeItem = ( item: TFormProduct ) => {
      setCart( ( prevCart ) => prevCart.filter( ( cartItem ) => cartItem.id !== item.id ) );
    };

    const removeFromCart = ( item: TFormProduct ) => {
      removeItem( item )
      setCart( ( prevCart ) => prevCart.filter( ( cartItem ) => cartItem.id !== item.id ) );
      setFilteredItems( ( prevItems ) => [ ...prevItems, item ] );
    };

    const handleSearchChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
      setSearchQuery( event.target.value );

      const filtered = sProduct.filter(
        ( item ) => {
          return (
            item.nama.toLowerCase().includes( searchQuery.toLowerCase() ) ||
            item.harga.toString().includes( searchQuery.toLowerCase() ) )
        }
      );
      setFilteredItems( filtered );
    };

    function SearchItemList( { items, addToCart, cart }: {
      items: TFormProduct[], addToCart: any, cart: TFormProduct[]
    } ) {
      const isItemAdded = ( item: TFormProduct ) => {
        return cart.some( ( cartItem ) => cartItem.id === item.id );
      };

      return (
        <ul className={ "p-0.5 sm:p-2 border border-gray-50 rounded  overflow-y-auto relative h-[20rem] " }>
          { items.map( ( item: TFormProduct, index: number ) => ( <li
              className={ " p-0.5 sm:p-4 flex flex-row gap-2 border border-gray-200 rounded items-center justify-around bg-white" }
              style={ {
                backgroundColor: isItemAdded( item ) ? 'lightgreen' : 'transparent',
                fontWeight: isItemAdded( item ) ? 'bold' : 'normal',
              } }
              key={ item.id }>
              <img className={ " rounded bg-blue-300 w-20 h-20" } src={ item.img } alt={ item.nama }/>
              <p className={ "flex flex-col" }>
                <span className={ "text-sm sm:text-base" }>{ item.nama }</span>
                <span className={ "text-sm sm:text-base" }>{ Rupiah( item.harga ) }</span>
                <span className={ "text-sm sm:text-base" }>{ item.jenis }</span>
              </p>

              <button type={ "button" } onClick={ () => {
                append(
                  {
                    id: item.id,
                    nama: item.nama,
                    harga: item.harga,
                    lokasi: item.lokasi,
                    jumlah: 1,
                    jenis: item.jenis,
                    img: item.img,
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
      )
    }

    return (
      <>
        <div className="flex flex-col gap-3">
          {/*<h1>Product Search</h1>*/ }
          <div className="flex flex-row  gap-1 sm:gap-7">

            <button type={ 'button' }
                    className={ `py-2 mb-1  ${ !cariProduct ? "bg-red-600" : " bg-blue-500" } text-white cursor-pointer rounded` }
                    onClick={ () => {setCariProduct( !cariProduct )} }>

              <span className=" flex flex-row items-center px-2">
                {/*<AiOutlineSearch className={ "w-[100%] md:w-[90%]   h-auto " }/>*/ }

                <span className="invisible sm:visible w-0 sm:w-auto">
                      <span className={ "hidden md:hidden lg:block" }>
                        { !cariProduct
                          ? <AiOutlineCloseCircle/>
                          : <AiOutlineSearch/> }
                      </span>
              </span>
              </span>
            </button>

            <input className={ StyleInputForm( false ) + "rounded leading-tight w-[80%] " }
                   type="text"
                   value={ searchQuery }
                   placeholder={ " Cari Product" }
                   onChange={ handleSearchChange }/>

          </div>
          {/*!-------------------------------------------------cariProduct----------------------------*/ }


          <div
            className={ ` ${ cariProduct || searchQuery.length < 1 ? "hidden" : "" } border  border-gray-200 rounded bg-gray-50` }>
            <SearchItemList items={ filteredItems } addToCart={ addToCart } cart={ cart }/>
          </div>

          {/*----------------------------------------------- -CART LIST----------------------*/ }

          <div className="flex flex-col gap-1" onClick={ () => setCariProduct( true ) }>
            {/*<h2>Cart</h2>*/ }
            <ul className={ " border-gray-300 border overflow-y-auto relative h-[15rem] bg-gray-50 p-2 rounded" }>
              { fields.map( ( item: TFormProduct, index: number ) => {
                return ( <li
                  className={ " flex flex-row justify-between  items-center gap-2 p-1 sm:p-3 border border-gray-300 bg-white" }
                  key={ item.id }>
                  <img className={ " rounded bg-blue-300 w-20 h-20" } src={ item.img } alt={ item.nama }
                    // w-[20%] h-auto
                  />
                  <div className=" flex flex-col">

                    <table className={ "border-transparent" }>
                      <tbody className={ "border-transparent" }>
                      <tr>


                        <input className={ StyleInputForm( false ) } type={ 'hidden' }
                               value={ item.id }
                               { ...register( `semuaProduct.${ index }.id` ) }
                        />
                        <td className={ "hidden sm:block" }>
                          <span>Nama Produk </span></td>
                        <td className={ "text-sm sm:text-base" }>
                          { item.nama }
                          <input className={ StyleInputForm( false ) } type={ 'hidden' }
                                 value={ item.nama }
                                 { ...register( `semuaProduct.${ index }.nama` ) }

                          />

                          <input className={ StyleInputForm( false ) } type={ 'hidden' }
                                 value={ item.img }
                                 { ...register( `semuaProduct.${ index }.img` ) }

                          />
                        </td>
                      </tr>
                      <tr>
                        <td className={ "hidden sm:block" }>
                          <span>Harga </span></td>
                        <td className={ "text-sm sm:text-base" }> { Rupiah( item.harga ) }
                          <input type={ 'hidden' }
                                 value={ item.harga }
                                 { ...register( `semuaProduct.${ index }.harga` ) }

                          />
                        </td>
                      </tr>

                      <tr>
                        <td className={ "hidden sm:block" }>
                          <span>Jenis </span></td>
                        <td className={ "text-sm sm:text-base" }>{ item.jenis }
                          <input type={ 'hidden' }
                                 value={ item.jenis }
                                 { ...register( `semuaProduct.${ index }.jenis` ) }
                          />
                        </td>

                      </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className=" flex-col  flex gap-1 w-[30%]">
                    <div className="flex gap-1 justify-center flex-col">

                      <label>
                        <span className={ "hidden sm:block" }>Jumlah</span>
                        <input type={ "number" } className={ " border-gray-200 border w-[100%]  sm:w-[80%]" }
                               min={ 1 }
                               defaultValue={ 1 }
                               { ...register( `semuaProduct.${ index }.jumlah`, { valueAsNumber: true } ) }

                        />
                      </label>


                      {/*<button*/ }
                      {/*  type={ "button" }*/ }
                      {/*  onClick={ () => console.log( "add" ) }*/ }
                      {/*  className={ "bg-blue-600 text-white p-1 sm:p-2 rounded flex flex-row justify-center items-center gap-1" }>*/ }
                      {/*  <BiAddToQueue/>*/ }
                      {/*  <span className="invisible sm:visible w-0 sm:w-auto">Tambah</span>*/ }
                      {/*</button>*/ }

                      <button
                        type={ "button" }
                        onClick={ () => {
                          removeFromCart( item )
                          remove( index )
                        } }
                        className={ "bg-red-600 text-white p-1 sm:p-2 rounded flex flex-row justify-center items-center gap-1" }>
                        <BiAddToQueue/>
                        <span className="hidden sm:block w-0 sm:w-auto">Hapus</span>
                      </button>

                    </div>
                  </div>

                  {/*<button*/ }
                  {/*  className={ "bg-red-500 p-2" }*/ }
                  {/*  onClick={ () => removeFromCart( item ) }>Remove*/ }
                  {/*</button>*/ }

                </li> )
                }
              )
              }
            </ul>


          </div>


          {/*            className='border border-gray-300 p-2 rounded-md'>*/ }
          {/*      <option value="Tahu Bakso Rebus">Tahu Bakso Rebus Rp.42.000</option>*/ }
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
          {/*    </select>*/ }
          {/*  </div>*/ }
          {/*</div>*/ }

          {/* Total Keseluruhan dari Item lain-lain */ }

        </div>

        <hr className={ "m-2" }/>
        <div className={ "flex flex-col gap-3" }>

          {/* combo box  */ }
          <label htmlFor="">Ekspedisi</label>
          <select id="ekspedisi" className='border border-gray-300 p-2 rounded-md'{ ...register( "travel.ekspedisi" ) }>
            <option value="Paxel">Paxel</option>
            <option value="JNE">JNE</option>
            <option value="Travel Omega">Travel Omega</option>
            <option value="Travel Serasi">Travel Serasi</option>
            <option value="Go Send">Go Send</option>
            <option value="Maxim">Maxim</option>
            <option value="Delivery">Delivery</option>
          </select>


          {/* tulis sendiri */ }

          <InputForm tag={ 'input' } title={ "Ongkir" } type={ "number" }
                     reg={ register( "travel.ongkir", { valueAsNumber: true } ) }/>

          <label htmlFor="">Lokasi</label>
          <select id="lokasi" className='border border-gray-300 p-2 rounded-md'{ ...register( "keterangan.lokasi" )//lokasi
          }>
            <option value="Ungaran">Ungaran</option>
            <option value="Semarang">Semarang</option>
          </select>

          {/* jenis Pembayaran */ }
          <label htmlFor="">Pembayaran</label>
          <select id="pembayaran"
                  className='border border-gray-300 p-2 rounded-md'{ ...register( "total.pembayaran" ) }>
            <option value="Cash">Cash</option>
            <option value="BCA">BCA</option>
            <option value="Mandiri">Mandiri</option>
            <option value="BRI">BRI</option>
          </select>


          <label htmlFor="">Status</label>
          <select id="pembayaran"
                  className='border border-gray-300 p-2 rounded-md'{ ...register( "total.status" ) }>
            {/*/status/*/ }
            <option className={ SDiTerima } value="Di Terima">Di Terima</option>
            <option className={ SProcess } value='Proses'>Proses</option>
            <option className={ SKirim } value="Kirim">Kirim</option>
            <option className={ SSelesai } value="Selesai"> Selesai</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 p-2 rounded-md text-white">Add Product</button>


      </>
    )
  }

// const formCard = ( wide: number ) => `border  flex flex-col gap-5 p-5 bg-white rounded w-[${ wide }%]`;

  const inputType = ( a: number = 0, b: string = "" ) => `border border-gray-300 p-${ a } rounded-md w-${ ( b = "" ) ? "" : b }`;
  const input = inputType()
  const fomIsi = "bg-white flex-col flex w-[50%]  sm:w-[44%]  md:w-[45%]   lg:w-[47%]  ml-2  gap-3 rounded p-2  sm:p-5";

// let totalItem = valueForm.item ? Number( valueForm.jumlah_item ) * Number( valueForm.harga_item ) : 0
// let totalOrderan = valueForm.orderan ? Number( valueForm.jumlah_orderan ) * Number( valueForm.harga_orderan ) : 0

  return (
    <>
      <DevTool control={ control }/>
      {/*<h1 className="text-3xl font-bold text-center"> Orderan Form </h1>*/ }
      <form className="bg-green-100 sm:bg-green-50 " onSubmit={ handleSubmit( onSubmit ) }>
        <div className="flex flex-row gap-1 sm:gap-3 mt-5">
          <div className={ fomIsi }>f
            <Nama/>
            <Tanggal/>
          </div>
          <div className={ fomIsi }>
            <Orderan/>
          </div>
        </div>
      </form>
      <p>{ errors.semuaProduct?.root?.message }</p>
      <TableOrder data={ data } onCreate={ onCreate }/>

    </>
  )
}
// {/* <label htmlFor="">Pembayaran</label>
//  <input
//  type="text"
//  name="price"
//  placeholder="Metode Pembayaran..."
//  className="border border-gray-300 p-2 rounded-md"
//  />
//  </div> */ }
// {/* <input type="image" formAction={ submitImage } /> */ }
// <h2 className="font-bold p-5">List og Product</h2>
// <div className="">
//   {/*<Tables lg gap={ 2 } css={ { mt: '$10' } } />*/ }
// </div>
//
// <div className="flex flex-wrap gap-5">
//   {/* { !products ? <h1>salah</h1> : products.map( ( p: any ) =>
//    {
//    if ( p == undefined || !p ) return <h1>Hot found</h1>;
//    else
//    {
//    return (
//    <div className="p-5 shadow" key={ p.id }>
//    <p>{ p.product }</p>
//    <p>Rp.{ p.price }</p>
//    </div>
//    );
//    }
//    } ) } */ }
// </div>
