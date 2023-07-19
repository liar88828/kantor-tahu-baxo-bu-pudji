"use client"
import React, { ReactElement, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { StyleInputForm, styleLabelForm } from '@/app/style/form';
import { BiAddToQueue } from 'react-icons/bi';
import { AiOutlineSearch } from "react-icons/ai";
import { Rupiah } from '../../../lib/rupiah';
import { defaultDate, getDateNow, getLocaleTime, getTime } from '../../../lib/formatDate';
import { TOrder } from '../../../entity/orderan';
import { sProduct, TFormProduct } from '../../../entity/produk';
import { DevTool } from "@hookform/devtools";
import TableOrder from '@/app/orderan/TableOrder';

type TOrderKeys = keyof TOrder['orang']
  | keyof TOrder['tanggal'] |
  keyof TOrder["keterangan"] |
  keyof TOrder["total"] |
  keyof TOrder["travel"]

type Props = { tag?: keyof JSX.IntrinsicElements; } & React.HTMLAttributes<HTMLOrSVGElement>;

interface InputFormProps {
  tag?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  title: string;
  type: string;
  reg: any;
  value?: string
  min?: string
  defaultValue?: string

}

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
    listOrderan: [
      {
        id: "Se/Or/TBVa/42",
        nama: "Tahu Bakso Vakum",
        harga: 46_000,
        jumlah: 1,
        lokasi: "Semarang",
        jenis: "Orderan",
      }
    ],
    listItem: [
      {
        id: "Se/Or/TBVa/42",
        nama: "Tahu Bakso Vakum",
        harga: 46_000,
        jumlah: 1,
        lokasi: "Ungaran",
        jenis: "Item",
      }
    ],
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

  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TOrder>( {
      // defaultValues: defaultValues,
      mode: "onChange",
    }
  );

  const { fields: fieldOrderan, } = useFieldArray( {
    control,
    name: 'listOrderan',
  } );
  const { fields: fieldItem } = useFieldArray( {
    control,
    name: 'listItem',
  } );

  const [ valueForm, setValueForm ] = useState<TOrder>( defaultValues )

  const createOrder = async () => {
    const response = await fetch( "http://localhost:3000/api/orderan", {
      method: "POST",
      body: JSON.stringify( { valueForm } ),
      headers: { "Content-Type": "application/json", }
    } )
    return response.json()
  }

  const onSubmit: SubmitHandler<TOrder> = ( data ) => {
    // console.log( data )
    setValueForm( data )
  };
  const onCreate = async () => {
    if( confirm( "Apakah Data yang di isi sudah Benar ??" ) ) {
      // Save it!
      // console.log( 'Thing was saved to the database.', valueForm );

      // const responseData = await createOrder()
      // console.log( responseData )
    }
    else {
      // Do nothing!
      // console.log( 'Thing was not saved to the database.' );
    }
  }

  // const InputForm: React.FC<Props> = ( {
  //   tag: Tag = 'input', ...props
  // } ) => {
  //   const { title, type, reg } = props as {
  //     title: string,
  //     type: string,
  //     reg: TOrderKeys
  //   }
  //   return (
  //     <div className="flex flex-col ">
  //       <label className={ styleLabelForm }
  //              htmlFor="grid-password"> { title }</label>
  //       <input className={ StyleInputForm( salah ) }
  //              id="grid-first-name"
  //              type={ `${ type }` }
  //              placeholder={ `Nama ${ title }....` }
  //
  //              { ...register( reg ) }
  //       />
  //       { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
  //     </div>
  //   );
  // }
  // type Props = {
  //   tag?: keyof JSX.IntrinsicElements;
  // } & React.HTMLAttributes<HTMLOrSVGElement>;
  // function InputForm( { title, type, reg }: { title: string, type: string, req: any } ) {
  //   return (
  //     <div className="flex flex-col ">
  //       <label className={ styleLabelForm }
  //              htmlFor="grid-password"> { title }</label>
  //       <input className={ StyleInputForm( salah ) }
  //              id="grid-first-name"
  //              type={ type }
  //              placeholder={ `Nama ${ title }....` }
  //              { ...register( reg ) }
  //       />
  //       { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }
  //     </div>
  //   )
  // }
  // const InputForm: React.FC<InputFormProps> = ( {
  //   tag: Tag = 'input',
  //   title,
  //   type,
  //   reg
  // }: InputFormProps ): ReactElement => {
  //   const styleLabelForm = 'your-label-style-class';
  //   const StyleInputForm = 'your-input-style-class';
  //   const wrongInput = 'your-wrong-input-class';
  //   const salah = false; // Replace with the appropriate value
  //
  //   return (
  //     <div className="flex flex-col">
  //       <label className={ styleLabelForm } htmlFor="grid-password">
  //         { title }
  //       </label>
  //       { typeof Tag === 'string' ? (
  //         <input
  //           className={ `${ StyleInputForm } ${ salah ? wrongInput : '' }` }
  //           id="grid-first-name"
  //           type={ type }
  //           placeholder={ `Nama ${ title }....` }
  //           { ...register( reg ) }
  //         />
  //       ) : (
  //         <Tag
  //           className={ `${ StyleInputForm } ${ salah ? wrongInput : '' }` }
  //           id="grid-first-name"
  //           type={ type }
  //           placeholder={ `Nama ${ title }....` }
  //           { ...register( reg ) }
  //         />
  //       ) }
  //       { salah && <p className={ wrongInput }>Please fill out this field.</p> }
  //     </div>
  //   );
  // };

  const InputForm: React.FC<InputFormProps> = (
      { tag: Tag = "input", title, type, reg, value, min, defaultValue }: InputFormProps ): ReactElement => {
      // const ress = {
      //   className : `${ StyleInputForm } ${ salah ? wrongInput : '' }`,
      //   id : "grid-first-name",
      //   type : type ,
      //   placeholder : `Nama ${ title }....`,
      // }
      // const ObjectDate = { value: "2012-3-23" }

      let ress = { className: `${ StyleInputForm( salah ) }`, placeholder: `Nama ${ title }....`, }
      if( type ) ress = Object.assign( ress, { type } );
      if( value ) ress = Object.assign( ress, { value } );
      if( min ) ress = Object.assign( ress, { min } );
      if( defaultValue ) ress = Object.assign( ress, { defaultValue } );

      // if( type == "date" ) {
      //   ress = Object.assign( ObjectDate, normalValue );
      // }

      return (
        <div className="flex flex-col">
          <label className={ styleLabelForm } htmlFor="grid-password">{ title }</label>
          {/*// @ts-ignore*/ }
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
          <InputForm title={ "Hp Pengirim" } type={ "number" } reg={ register( "orang.hpPengirim" ) }/>
          <InputForm title={ "Penerima" } type={ "text" } reg={ register( "orang.penerima" ) }/>
          <InputForm title={ "Alamat Penerima" } type={ "text" } reg={ register( "orang.alamatPenerima" ) }/>
          <InputForm title={ "Hp Penerima" } type={ "number" } reg={ register( "orang.hpPenerima" ) }/>

          {/*<div className="flex flex-col ">*/ }
          {/*  <label className={ styleLabelForm }*/ }
          {/*         htmlFor="grid-password"> Pengiriman</label>*/ }
          {/*  <input className={ StyleInputForm( salah ) } id="grid-first-name" type="text"*/ }
          {/*         placeholder="Nama Pengiriman"*/ }
          {/*         { ...register( "pengirim" ) }*/ }
          {/*  />*/ }
          {/*  { !salah ? "" : <p className={ wrongInput }>Please fill out this field.</p> }*/ }
          {/*</div>*/ }

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

          {/*<div className="flex flex-col">*/ }
          {/*  <label htmlFor="">Keterangan</label>*/ }
          {/*  <textarea placeholder="Masukkan Keterangan ..."*/ }
          {/*            className="border border-gray-300 p-2 rounded-md"*/ }
          {/*            { ...register( "keterangan" ) }*/ }
          {/*  />*/ }
          {/*</div>*/ }

        </div>
      </> )
  }

  function Orderan() {
    const [ searchQuery, setSearchQuery ] = useState( '' );
    const [ cart, setCart ] = useState<TFormProduct[]>( [] );
    const [ filteredItems, setFilteredItems ] = useState<TFormProduct[]>( sProduct );
    const [ cariProduct, setCariProduct ] = useState<boolean>( false )

    // console.log( cart )
    const addToCart = ( item: TFormProduct ) => {
      const isItemInCart = cart.some( ( cartItem ) => cartItem.id === item.id );
      if( isItemInCart ) {
        // Item already exists in the cart

        alert( `Item "${ item.nama }" is already in the cart.` );
        setFilteredItems( ( prevItems ) => prevItems.filter( ( listItem ) => listItem.id !== item.id ) );
        return;
      }

      setCart( ( prevCart ) => [ ...prevCart, item ] );
      setFilteredItems( ( prevItems ) => prevItems.filter( ( listItem ) => listItem.id !== item.id ) );
    };
    const removeFromCart = ( item: TFormProduct ) => {
      setCart( ( prevCart ) => prevCart.filter( ( cartItem ) => cartItem.id !== item.id ) );
      setFilteredItems( ( prevItems ) => [ ...prevItems, item ] );
    };

    const handleSearchChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
      const query = event.target.value;
      setSearchQuery( query );

      const filtered = sProduct.filter( ( item ) => {
        const lowerCaseQuery = query.toLowerCase();
        const lowerCaseName = item.nama.toLowerCase();
        const priceString = item.harga.toString();

        // Check if the item name or price string includes the search query
        return (
          lowerCaseName.includes( lowerCaseQuery ) ||
          priceString.includes( lowerCaseQuery )
        );
      } );

      setFilteredItems( filtered );
    };

    // const handleRemove = ( item: Item ) => {
    //   removeItem( item );
    // };

    const removeItem = ( item: TFormProduct ) => {
      setCart( ( prevCart ) => prevCart.filter( ( cartItem ) => cartItem.id !== item.id ) );
    };

    return (
      <>
        <div className="flex flex-col gap-3">
          <h1>Product Search</h1>
          <div className="flex flex-row  gap-1 sm:gap-7">
            <button type={ 'button' } className={ "py-2 mb-1   bg-blue-500 text-white cursor-pointer rounded" }
                    onClick={ () => {setCariProduct( !cariProduct )} }>
              <span className=" flex flex-row items-center px-2">
                <AiOutlineSearch className={ "w-[100%] md:w-[90%]   h-auto " }/>
              <span className="invisible sm:visible w-0 sm:w-auto">
                      <span className={ "hidden md:hidden lg:block" }> { !cariProduct ? "Close" : "Open" }</span>
              </span>
              </span>
            </button>
            <input className={ StyleInputForm( false ) + "rounded leading-tight w-[80%] " } type="text"
                   value={ searchQuery } placeholder={ " Cari Product" } onChange={ handleSearchChange }/></div>

          <div className={ ` ${ cariProduct ? "hidden" : "" } border  border-gray-200 rounded bg-gray-50` }>
            <ul className={ "p-0.5 sm:p-2 border border-gray-50 rounded  overflow-y-auto relative h-[10rem] " }>
              { filteredItems.map( ( item ) => (

                <li
                  className={ " p-0.5 sm:p-4 flex flex-row gap-2 border border-gray-200 rounded items-center justify-around bg-white" }
                  key={ item.id }>
                  <img className={ " rounded bg-blue-300 w-20 h-20" } src={ item.img } alt={ item.nama }/>
                  <p className={ "flex flex-col" }>
                    <span className={ "text-sm sm:text-base" }>{ item.nama }</span>
                    <span className={ "text-sm sm:text-base" }>{ Rupiah( item.harga ) }</span>
                    <span className={ "text-sm sm:text-base" }>{ item.jenis }</span>
                  </p>

                  <button type={ "button" } onClick={ () => addToCart( item ) }
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

          {/*<h2>Orderan</h2>*/ }
          {/*<hr/>*/ }
          {/*<div className="flex flex-col">*/ }
          {/*  <label>Cari Barang</label>*/ }
          {/*  <input type={ "text" } placeholder={ "Search ...." }*/ }
          {/*         className={ StyleInputForm( salah ) }/>*/ }
          {/*</div>*/ }
          {/*list cart*/ }

          <div className="flex flex-col gap-1">
            <h2>Cart</h2>
            <ul className={ " border-gray-300 border  overflow-y-auto relative h-[10rem] bg-gray-50 p-2 rounded" }>
              { cart.map( ( item: TFormProduct, index: number ) => {
                // console.log( item )
                return ( <li
                  className={ " flex flex-row justify-between  items-center gap-2 p-1 sm:p-3 border border-gray-300 bg-white" }
                  key={ item.id }>
                  <img className={ " rounded bg-blue-300 w-20 h-20" }
                    // w-[20%] h-auto
                       src={ item.img }
                       alt={ item.nama }
                  />

                  <div className=" flex flex-col">
                    <table className={ "border-transparent" }>
                      <tbody className={ "border-transparent" }>
                      <tr>
                        <td className={ "hidden sm:block" }>
                          <span>Nama Produk </span></td>
                        <td className={ "text-sm sm:text-base" }>
                          { item.nama }
                          <input className={ StyleInputForm( false ) } type={ 'hidden' }
                                 value={ item.nama }
                                 { ...register(
                                   item.jenis == "Orderan"
                                     ? `listOrderan.${ index }.nama`
                                     : `listItem.${ index }.nama`
                                 ) }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className={ "hidden sm:block" }>
                          <span>Harga </span></td>
                        <td className={ "text-sm sm:text-base" }> { Rupiah( item.harga ) }
                          <input type={ 'hidden' }
                                 value={ item.harga }{ ...register(
                            item.jenis == "Orderan"
                              ? `listOrderan.${ index }.harga`
                              : `listItem.${ index }.harga`
                          ) }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className={ "hidden sm:block" }>
                          <span>Jenis </span></td>
                        <td className={ "text-sm sm:text-base" }>{ item.jenis }
                          <input type={ 'hidden' }
                                 value={ item.jenis } { ...register(
                            item.jenis == "Orderan"
                              ? `listOrderan.${ index }.jenis`
                              : `listItem.${ index }.jenis`
                          ) }/>
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
                               { ...register(
                                 item.jenis == "Orderan"
                                   ? `listOrderan.${ index }.jumlah`
                                   : `listItem.${ index }.jumlah`
                               ) }
                        />
                      </label>

                      {/*item.jenis === "orderan" ? `orderanList${number}.jumlahOrderan` :*/ }
                      {/*{ required: { value: true, message: "Jumlah Order is Required" }} */ }


                      {/*<button*/ }
                      {/*  type={ "button" }*/ }
                      {/*  onClick={ () => console.log( "add" ) }*/ }
                      {/*  className={ "bg-blue-600 text-white p-1 sm:p-2 rounded flex flex-row justify-center items-center gap-1" }>*/ }
                      {/*  <BiAddToQueue/>*/ }
                      {/*  <span className="invisible sm:visible w-0 sm:w-auto">Tambah</span>*/ }
                      {/*</button>*/ }

                      <button
                        type={ "button" }
                        onClick={ () => removeFromCart( item ) }
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

            {/*{ sProduct.map( ( sP ) => {*/ }
            {/*    console.log( Object.values( sP ).includes( "orderan" ) ? "orderan" : "item" )*/ }
            {/*    const jenis = Object.values( sP ).includes( "orderan" )*/ }
            {/*    return (*/ }
            {/*      */ }
            {/*      */ }
            {/*---------------Loop*/ }
            {/*      // <ul key={ sP.id }*/ }
            {/*      //     className={ " border-gray-300 border" }>*/ }
            {/*      //   <li className={ " flex flex-row justify-between  items-center gap-2 p-2" }>*/ }
            {/*      //     <img className={ "w-[20%] h-auto rounded" } src={ sP.img } alt={ sP.nama }/>*/ }
            {/*      //     <div className={ "justify-between flex-col flex " }>*/ }
            {/*      //*/ }
            {/*      //       <label className={ " uppercase text-gray-900 text-xs sm:text-xl font-bold " }>*/ }
            {/*      //         { sP.nama }</label>*/ }
            {/*      //       <input type={ "hidden" }*/ }
            {/*      //              value={ sP.nama } readOnly*/ }
            {/*      //              { ...register( jenis ? "orderan" : "item" ) }*/ }
            {/*      //       />*/ }
            {/*      //*/ }
            {/*      //       <label className={ " uppercase text-gray-900 text-xs sm:text-xl font-bold  " }>*/ }
            {/*      //         { sP.harga }</label>*/ }
            {/*      //       <input type={ "hidden" }*/ }
            {/*      //*/ }
            {/*      //              className={ "!overflow-hidden" }*/ }
            {/*      //              value={ sP.harga }*/ }
            {/*      //              { ...register( jenis ? "harga_orderan" : "harga_item" ) }*/ }
            {/*      //       />*/ }
            {/*      //       <label className={ "text-xs sm:text-xl " }>{ sP.jenis }</label>*/ }
            {/*      //       <input className={ "hidden w-0 h-0" }*/ }
            {/*      //              type={ 'text' }*/ }
            {/*      //              value={ jenis ? "orderan" : "item" }*/ }
            {/*      //              { ...register( jenis ? "orderan" : "item" ) }*/ }
            {/*      //       />*/ }
            {/*      //*/ }
            {/*      //     </div>*/ }
            {/*      //*/ }
            {/*      //     <div className=" flex-col  flex gap-1 w-[30%]">*/ }
            {/*      //       <input type={ "number" } className={ ` ${ input }` }*/ }
            {/*      //              value={ jenis ? "jumlah_orderan" : "jumlah_item" }*/ }
            {/*      //              { ...register( jenis ? "jumlah_orderan" : "jumlah_item"*/ }
            {/*      //                // , {required: { value: true, message: "Jumlah Order is Required" } }*/ }
            {/*      //              ) }*/ }
            {/*      //       />*/ }
            {/*      //*/ }
            {/*      //       <div className="flex gap-1 justify-center flex-row sm:flex-col">*/ }
            {/*      //         <button*/ }
            {/*      //           onClick={ () => console.log( "add" ) }*/ }
            {/*      //           className={ "bg-blue-600 text-white p-1 sm:p-2 rounded flex flex-row justify-center items-center gap-1" }>*/ }
            {/*      //           <BiAddToQueue/>*/ }
            {/*      //           <span className="invisible sm:visible w-0 sm:w-auto">Tambah</span>*/ }
            {/*      //         </button>*/ }
            {/*      //         <button*/ }
            {/*      //           onClick={ () => console.log( "hapus" ) }*/ }
            {/*      //           className={ "bg-red-600 text-white p-1 sm:p-2 rounded flex flex-row justify-center items-center gap-1" }>*/ }
            {/*      //           <BiAddToQueue/>*/ }
            {/*      //           <span className="invisible sm:visible w-0 sm:w-auto">Hapus</span>*/ }
            {/*      //         </button>*/ }
            {/*      //       </div>*/ }
            {/*      //     </div>*/ }
            {/*      //   </li>*/ }
            {/*      // </ul>*/ }
            {/*    )*/ }
            {/*  } ) }*/ }
          </div>


          {/*  <div className="flex flex-col">*/ }
          {/*    <label htmlFor="">Orderan</label>*/ }
          {/*    <select name="orderan" id="orderan"*/ }
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
          {/*<div className="flex flex-col gap-5">*/ }
          {/*  <h1>Lain Lain</h1>*/ }
          {/*  <hr/>*/ }
          {/*  <label htmlFor="">Item</label>*/ }
          {/*  <input type="number" name="price" placeholder="Masukkan Jumlah Yang Di Pesan ..."*/ }
          {/*         className={ input }*/ }
          {/*  />*/ }
          {/*  /!* Semisal Peroduct lain selain tahu bakso  */ }
          {/*  <label htmlFor="">Total</label>*/ }
          {/*  <input type="number" name="price" placeholder="Total Bayar..."*/ }
          {/*         className={ input }*/ }
          {/*  />*/ }
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

          <InputForm tag={ 'input' } title={ "Ongkir" } type={ "number" } reg={ register( "travel.ongkir" ) }/>

          {/*<label htmlFor="">Ongkir</label>*/ }
          {/*<input type="number" placeholder="Masukkan Harga Ongkir ..."*/ }
          {/*       className="border border-gray-300 p-2 rounded-md"*/ }
          {/*       { ...register( "ongkir" ) }*/ }
          {/*/>*/ }
          {/* total product tanpa ongkir   tapi di isi dengan product yang lain lain*/ }
          {/*<label htmlFor="">Total Penjualan</label>*/ }
          {/*<input type="number" name="price" placeholder="Masukan Total Bayar..."*/ }
          {/*       className="border border-gray-300 p-2 rounded-md"*/ }
          {/*/>*/ }
          {/*<label htmlFor="">Total Bayar</label>*/ }
          {/*<input type="number" name="price" placeholder="Enter Product name..."*/ }
          {/*       className="border border-gray-300 p-2 rounded-md"*/ }
          {/*/>*/ }

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


          <label htmlFor="">Lokasi</label>
          <select id="pembayaran"
                  className='border border-gray-300 p-2 rounded-md'{ ...register( "total.status" ) }>
            {/*/status/*/ }
            <option value="Di terima">Di terima</option>
            <option value='Proses'>Proses</option>
            <option value="Kirim">Kirim</option>
            <option value="Selesai"> Selesai</option>
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
          <div className={ fomIsi }>
            <Nama/>
            <Tanggal/>
          </div>
          <div className={ fomIsi }>
            <Orderan/>
          </div>
        </div>
      </form>
      <TableOrder data={ valueForm }/>

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
