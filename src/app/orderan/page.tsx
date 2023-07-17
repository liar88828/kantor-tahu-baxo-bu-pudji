"use client"
import React, { ReactElement, useState } from 'react'
import { TformProduct } from '@/app/product/page';
import { SubmitHandler, useForm } from "react-hook-form";
import { TOrder } from '../../../components/data';
import { StyleInputForm, styleLabelForm, wrongInput } from '@/app/style/form';
import { BiAddToQueue } from 'react-icons/bi';
import { AiOutlineSearch } from "react-icons/ai";

const product = [
  // { nama: "Tahu Bakso Rebus", harga: 42.000 },
  { nama: "Tahu Bakso Vakum", harga: 46.000 },
  { nama: "Tahu Bakso Special", harga: 50.000 },
  { nama: "Tahu Bakso Goreng", harga: 45.000 },
  { nama: "Bandeng Presto", harga: 60.000 },
  { nama: "Otak-Otak Bandeng", harga: 70.000 },
  { nama: "Bakso Sapi 20", harga: 40.000 },
  { nama: "Bakso Sapi 12", harga: 25.000 },
  { nama: "Bakso Aneka", harga: 29.000 },
  { nama: "Nugget", harga: 27.000 },
  { nama: "Rolade Tahu", harga: 19.000 },
  { nama: "Rolade Singkong", harga: 19.000 },
]
type TOrderKeys = keyof TOrder;

const formInput = {
  pengirim: "Pengirim",
  hpPengirim: "Hp Pengirim",
  penerima: "Penerima",
  tanggal: {
    title: "tanggal",
    opsi: {
      pesan: "Pesan",
      kirim: "Kirim"
    },
  },

  orderan: "Orderan",
  item: "Item",
  total: "Total",
  ekspedisi: "Ekspedisi",
  ongkir: "Ongkir",
  totalPenjualan: "Total Penjualan",
  totalBayar: "Total Bayar",
  pembayaran: "Pembayaran",
  keterangan: "Keterangan",
}

type TsProduct = { id: string } & TformProduct
const sProduct: TsProduct[] = [
  {
    id: "84287272-fa64-486a-9dc8-Rebus",
    nama: "Tahu Bakso Rebus", harga: 42000,
    jenis: "item",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Bakso_mi_bihun.jpg"
  },

  {
    id: "3ba638b4-bf89-470a-b446-eec8d0d143Vakum",
    nama: "Tahu Bakso Vakum",
    harga: 46000,
    jenis: "orderan",
    img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe"
  },

  {
    id: "a803c2ee-c3d8-4b17-8a79-e80b873fe4Goreng",
    nama: "Tahu Bakso Goreng",
    harga: 45000,
    jenis: "item",
    img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe"
  }

  ,
  {
    id: "d2072e14-5cd9-4f54-86fc-dd644e4a59fPresto",
    nama: "Bandeng Presto",
    harga: 60000,
    jenis: "orderan",
    img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe"
  }

]

type Props = {
  tag?: keyof JSX.IntrinsicElements;
} & React.HTMLAttributes<HTMLOrSVGElement>;

export default function FormOrder() {
  const [ salah, setSalah ] = useState( false );
  const [ count, setCount ] = useState<number>( 1 );
  const defaultValues: TOrder = {
    alamat_penerima: '',
    ekspedisi: '',
    hp_penerima: '',
    hp_pengirim: '',
    ongkir: 0,
    penerima: '',
    pengirim: '',
    kirim: new Date( "12/12/1999" ),
    pesan: new Date( "12/12/2023" ),
    lokasi: "",
    item: "",
    harga_item: 0,
    jumlah_item: 0,
    orderan: '',
    harga_orderan: 0,
    jumlah_orderan: 0,
    pembayaran: "",
    keterangan: ""
  }
  const { register, handleSubmit } = useForm<TOrder>(
    // {
    //   defaultValues: defaultValues
    // }
  );
  const [ valueForm, setValueForm ] = useState<TOrder>( defaultValues )

  let Rupiah = ( n: number ): string => {
    return new Intl.NumberFormat( "id-ID", {
      style: "currency",
      currency: "IDR"
    } ).format( n );
  }

  function formatDate( date: Date | string ) {
    var d = new Date( date ),
      month = '' + ( d.getMonth() + 1 ),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if( month.length < 2 )
      month = '0' + month;
    if( day.length < 2 )
      day = '0' + day;

    return [ day, month, year ].join( '-' );
  }

  const onSubmit: SubmitHandler<TOrder> = ( data ) => {
    setValueForm( data )
    console.log( data )
  };

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

  interface InputFormProps {
    tag: keyof JSX.IntrinsicElements | React.ComponentType<any>;
    title: string;
    type: string;
    reg: TOrderKeys;
    value?: string
  }

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
      { tag: Tag = 'input', title, type, reg, value }
        : InputFormProps ): ReactElement => {

      // const ress = {
      //   className : `${ StyleInputForm } ${ salah ? wrongInput : '' }`,
      //   id : "grid-first-name",
      //   type : type ,
      //   placeholder : `Nama ${ title }....`,
      // }

      // const ObjectDate = { value: "2012-3-23" }

      const normalValue = {
        className: `${ StyleInputForm( salah ) }`,
        type: type,
        placeholder: `Nama ${ title }....`,
      };
      let ress = {
        ...normalValue
      }
      //
      // if( type == "date" ) {
      //   ress = Object.assign( ObjectDate, normalValue );
      // }

      return (
        <div className="flex flex-col">
          <label className={ styleLabelForm } htmlFor="grid-password">
            { title }
          </label>
          <Tag{ ...ress }{ ...register( reg ) }
          />
          { salah && <p className={ wrongInput }>Please fill out this field.</p> }
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
          <InputForm tag={ 'input' } title={ "Pengiriman" } type="text" reg={ "pengirim" }/>
          <InputForm tag={ 'input' } title={ "Hp Pengirim" } type={ "number" } reg={ "hp_pengirim" }/>
          <InputForm tag={ 'input' } title={ "Penerima" } type={ "text" } reg={ "penerima" }/>
          <InputForm tag={ 'input' } title={ "Alamat Penerima" } type={ "text" } reg={ "alamat_penerima" }/>
          <InputForm tag={ 'input' } title={ "Hp Penerima" } type={ "number" } reg={ "hp_penerima" }/>
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

          <InputForm tag={ "input" } title={ "Pesan" } type={ "date" } reg={ "pesan" }/>
          <InputForm tag={ "input" } title={ "Kirim" } type={ "date" } reg={ "kirim" }/>
          <InputForm tag={ "textarea" } title={ "Keterangan" } type={ "" } reg={ "keterangan" }/>

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
    const [ cart, setCart ] = useState<TsProduct[]>( [] );
    const [ filteredItems, setFilteredItems ] = useState<TsProduct[]>( sProduct );
    const [ cariProduct, setCariProduct ] = useState<boolean>( false )
    console.log( cart )
    const addToCart = ( item: TsProduct ) => {
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
    const removeFromCart = ( item: TsProduct ) => {
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

    const removeItem = ( item: TsProduct ) => {
      setCart( ( prevCart ) => prevCart.filter( ( cartItem ) => cartItem.id !== item.id ) );
    };

    return (
      <>
        <div className="flex flex-col gap-3">
          <h1>Product Search</h1>

          <div className="flex flex-row  gap-1 sm:gap-7">
            <button
              type={ 'button' }
              className={ "py-2 mb-1   bg-blue-500 text-white cursor-pointer rounded" }
              onClick={ () => {
                setCariProduct( !cariProduct )
                // console.log( "click", cariProduct )
              } }>
              <span className=" flex flex-row items-center px-2">
                <AiOutlineSearch className={ "w-[100%] md:w-[90%]   h-auto " }/>
              <span className="invisible sm:visible w-0 sm:w-auto">
                      <span className={ "hidden md:hidden lg:block" }> { !cariProduct ? ( "Open" ) : "Close" }</span>
              </span>
              </span>
            </button>


            <input
              className={ StyleInputForm( false ) + "rounded leading-tight w-[80%] " }
              type="text"
              value={ searchQuery }
              placeholder={ "Cari Product" }
              onChange={ handleSearchChange }/>
          </div>
          <div className={ ` ${ cariProduct ? "hidden" : "" } border  border-gray-200 rounded bg-gray-50` }>

            <ul className={ "p-0.5 sm:p-2 border border-gray-50 rounded  overflow-y-auto relative h-[10rem] " }>
              { filteredItems.map( ( item ) => (

                <li
                  className={ " p-0.5 sm:p-4 flex flex-row gap-2 border border-gray-200 rounded items-center justify-around bg-white" }
                  key={ item.id }>
                  <img className={ " rounded bg-blue-300 w-20 h-20" }
                    // w-[20%] h-auto
                       src={ item.img }
                       alt={ item.nama }
                  />

                  <p className={ "flex flex-col" }>
                    <span className={ "text-sm sm:text-base" }>{ item.nama }</span>
                    <span className={ "text-sm sm:text-base" }>{ Rupiah( item.harga ) }</span>
                    <span className={ "text-sm sm:text-base" }>{ item.jenis }</span>
                  </p>

                  <button
                    type={ "button" }
                    onClick={ () => addToCart( item ) }
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
              { cart.map( ( item ) => {
                  console.log( item )
                  return (
                    <li
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
                              <input className={ StyleInputForm( false ) }
                                     value={ item.nama } { ...register( item.jenis === "orderan" ? "orderan" : "item" ) }/>
                            </td>
                          </tr>
                          <tr>
                            <td className={ "hidden sm:block" }>
                              <span>Harga </span></td>
                            <td className={ "text-sm sm:text-base" }> { Rupiah( item.harga ) }
                              <input type={ "number" }
                                     value={ item.harga }{ ...register( item.jenis === "orderan" ? "harga_orderan" : "harga_item" ) }/>
                            </td>
                          </tr>
                          <tr>
                            <td className={ "hidden sm:block" }>
                              <span>Jenis </span></td>
                            <td className={ "text-sm sm:text-base" }>{ item.jenis }
                              <input className={ " " }
                                     type={ 'text' }
                                     value={ item.jenis } { ...register( item.jenis === "orderan" ? "orderan" : "item" ) }/>
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
                              // cha={ item.jenis ? "jumlah_orderan" : "jumlah_item" }
                                   { ...register( item.jenis === "orderan" ? "jumlah_orderan" : "jumlah_item"
                                     // , {required: { value: true, message: "Jumlah Order is Required" } }
                                   ) }
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
          <select id="ekspedisi" className='border border-gray-300 p-2 rounded-md'{ ...register( "ekspedisi" ) }>
            <option value="Paxel">Paxel</option>
            <option value="JNE">JNE</option>
            <option value="Travel Omega">Travel Omega</option>
            <option value="Travel Serasi">Travel Serasi</option>
            <option value="Go Send">Go Send</option>
            <option value="Maxim">Maxim</option>
            <option value="Delivery">Delivery</option>
          </select>

          {/* tulis sendiri */ }

          <InputForm tag={ 'input' } title={ "Ongkir" } type={ "number" } reg={ "ongkir" }/>

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

          <label htmlFor="">Pembayaran</label>
          <select id="lokasi"
                  className='border border-gray-300 p-2 rounded-md'
                  { ...register( "lokasi" ) }
          >
            <option value="Ungaran">Ungaran</option>
            <option value="Semarang">Semarang</option>
          </select>

          {/* jenis Pembayaran */ }
          <label htmlFor="">Pembayaran</label>
          <select id="pembayaran"
                  className='border border-gray-300 p-2 rounded-md'
                  { ...register( "pembayaran" ) }
          >
            <option value="Cash">Cash</option>
            <option value="BCA">BCA</option>
            <option value="Mandiri">Mandiri</option>
            <option value="BRI">BRI</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-md text-white">
          Add Product
        </button>


      </>
    )
  }

  // const formCard = ( wide: number ) => `border  flex flex-col gap-5 p-5 bg-white rounded w-[${ wide }%]`;

  const inputType = ( a: number = 0, b: string = "" ) => `border border-gray-300 p-${ a } rounded-md w-${ ( b = "" ) ? "" : b }`;
  const input = inputType()
  const fomIsi = "bg-white flex-col flex w-[50%]  sm:w-[44%]  md:w-[45%]   lg:w-[47%]  ml-2  gap-3 rounded p-2  sm:p-5";

  let totalItem = valueForm.item ? Number( valueForm.jumlah_item ) * Number( valueForm.harga_item ) : 0
  let totalOrderan = valueForm.orderan ? Number( valueForm.jumlah_orderan ) * Number( valueForm.harga_orderan ) : 0

  return (
    <>
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
      <div className=" ml-2  relative overflow-x-auto shadow-md rounded-lg bg-white p-2 mt-1 ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded table-auto">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 rounded">
          <tr>
            <th scope="col" className="px-4 py-3">No.</th>
            <th scope="col" className="px-4 py-3 bg-green-400">Pesan</th>
            <th scope="col" className="px-4 py-3 bg-red-500 dark:bg-gray-800">Kirim</th>
            <th scope="col" className="px-4 py-3 bg-gray-50 dark:bg-gray-800">pengirim</th>
            <th scope="col" className="px-4 py-3">Telpon Pengirim</th>
            <th scope="col" className="px-4 py-3 bg-gray-50 dark:bg-gray-800">Penerima</th>
            <th scope="col" className="px-4 py-3 bg-yellow-100">Orderan</th>
            <th scope="col" className="px-4 py-3 bg-yellow-300 dark:bg-gray-800">Harga Order</th>
            <th scope="col" className="px-4 py-3 bg-yellow-100">Jumlah Order</th>
            <th scope="col" className="px-4 py-3 bg-red-500 dark:bg-gray-800">Item</th>
            <th scope="col" className="px-4 py-3 bg-red-300">Harga Item</th>
            <th scope="col" className="px-4 py-3 bg-red-500 dark:bg-gray-800">Jumlah Item</th>
            <th scope="col" className="px-4 py-3">Lokasi</th>
            <th scope="col" className="px-4 py-3 bg-blue-400 dark:bg-gray-800">Ekspedisi</th>
            <th scope="col" className="px-4 py-3 bg-green-300">Ongkir</th>
            <th scope="col" className="px-4 py-3 bg-green-200 dark:bg-gray-800">Total Penjualan</th>
            <th scope="col" className="px-4 py-3 bg-green-300">Total Bayar</th>
            <th scope="col" className="px-4 py-3 bg-yellow-100 dark:bg-gray-800">pembayaran</th>
            <th scope="col" className="px-4 py-3  w-3/4">Keterangan</th>
            <th scope="col" className="px-4 py-3  w-3/4">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th scope="row" className="border border-slate-300 px-4 py-4 whitespace-nowrap">1.</th>
            <td scope="row" className="border border-slate-300 px-4 py-4 whitespace-nowrap">
              <time>{ formatDate( valueForm?.pesan.toString() ) }</time>
            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap ">
              <time>{ formatDate( valueForm?.kirim.toString() ) }</time>
            </td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">{ valueForm?.pengirim }</td>
            <td scope="row" className="border border-slate-300 px-4 py-4">{ valueForm.hp_pengirim }</td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800 whitespace-nowrap">{ valueForm?.penerima }</td>
            <td scope="row" className="border border-slate-300 px-4 py-4">{ valueForm.orderan }</td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">{ valueForm.harga_orderan ? Rupiah( valueForm.harga_orderan ) : 0 }</td>
            <td scope="row" className="border border-slate-300 px-4 py-4">{ valueForm?.jumlah_orderan }</td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">{ valueForm.item }</td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4">{ valueForm.harga_item ? Rupiah( valueForm.harga_item ) : 0 }</td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">{ valueForm.jumlah_item }</td>
            <td scope="row" className="border border-slate-300 px-4 py-4">{ valueForm?.lokasi }</td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">{ valueForm.ekspedisi }</td>
            <td scope="row" className="border border-slate-300 px-4 py-4">{ Rupiah( valueForm?.ongkir ) }</td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4 bg-gray-50 dark:bg-gray-800">{ Rupiah( totalOrderan )
              /*  + valueForm.harga_item * valueForm.harga_item */
            }</td>
            <td scope="row"
                className="border border-slate-300 px-4 py-4">{

              Rupiah( totalItem + totalOrderan + Number( valueForm?.ongkir )
              ) }
            </td>
            <td scope="row" className="border border-slate-300 px-4 py-4">{ valueForm?.pembayaran }</td>
            <td scope="row"
                className="border border-slate-300  py-4  px-4  break-all w-3/4 "
              //break-all whitespace-normal style={ {
              //   inlineSize: "150px",
              //   overflowWrap: "break-word"
              // } }
            >
              <div className="w-[10rem]">
                <div className="line-clamp-3">{ valueForm.keterangan }</div>
              </div>
            </td>

            <td scope="row" className="border border-slate-300 px-4 py-4">
              <button
                onClick={ () => console.log( "create" ) }
                className="bg-green-500 p-2 rounded-md text-white">
                Create
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
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
