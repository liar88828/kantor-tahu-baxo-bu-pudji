"use client"
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { InputForm } from '@/app/components/Atom/input/InputNew';
import { Status } from '@/app/style/status';
import { enableCache, Icon } from '@iconify/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSchema } from '@/lib/validation/zod/updateZod';
import PopUp from '@/app/(pages)/(Transaction)/orderan/PopUp';
import { styleLabelForm } from '@/app/style/form';
import { currentMonth, currentYear } from '@/lib/utils/formatDate';
import { defaultValues } from '../../../../../asset/constants/model/orderan';
import Horizon from '@/app/element/Horizon';
import { ProductOrderan, TOrder } from '@/interface/orderan';
import { formOrderan } from '../../../../../asset/constants/model/formOrderan';
import CardLists from '@/app/components/organisme/orderan/cardList';
import CardTrolley from '@/app/(pages)/(Transaction)/orderan/cardTrolley';

enableCache( 'session' );
export const fomIsi = "bg-white flex-col flex sm:w-[48%]  md:w-[49%] ml-2 gap-3 rounded p-2 sm:p-5";

// function getSchema( method: "POST" | "PUT" ) {
//   return method === 'POST'
//          ? CreateZod.OrderanSchema
//          : UpdateZod.OrderanSchema;
// }

export default function FormOrderan( {
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
  travel: Pick<TDelivery, "nama">[],
  product: ProductOrderan[]
  bank: Pick<TBank, "nama">[]
} ) {
  const { control, register, handleSubmit, formState: { errors, isSubmitted }, reset } = useForm<TOrder>( {
    defaultValues: defaultDataOrder,
    mode         : "onChange",
    resolver: zodResolver( getSchema( method, 'ORDERAN' ) )
  } );
  console.log( errors )
  // const [ isError, ] = useState( true )
  // const requires     = Object.keys( errors )
  //
  // if( requires.length !== 0 && isError ) {
  //   const entries = Object.entries( errors );
  //   // console.log(entries)
  //   // entries.forEach( ( d ) => {
  //   notifyData( `fail, ${ entries[ 0 ][ 0 ].toUpperCase() } is ${ entries[ 0 ][ 1 ].type === "pattern"
  //                                                                 ? "symbol is not allow "
  //                                                                 : "value is require" }` )
  //   // }
  //   // )
  // }

  const { fields, append, remove, } = useFieldArray( {
    control,
    name : "semuaProduct",
    rules: { required: "Please append at last 1 ", }
  } );

  const [ valueForm, setValueForm ]     = useState<TOrder>( defaultValues )
  const onSubmit: SubmitHandler<TOrder> = ( data ) => {
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

  const isItemAdded = ( item: ProductOrderan ) => cart.some( ( cartItem: ProductOrderan ) => cartItem.nama ===
    item.nama )

  const addToCart = ( item: ProductOrderan ) => {
    const isItemInCart = fields.some( ( cartItem ) => cartItem.nama ===
      item.nama )
    if( isItemInCart ) {
      alert( `Item "${ item.nama }" is already in the cart.` );
      setFilteredItems( ( prevItems: ProductOrderan[] ) => prevItems.filter( ( listItem ) => listItem.nama !==
        item.nama ) );
      remove( fields.length )
      return;
    }

    setCart( ( prevCart: ProductOrderan[] ) => [ ...prevCart, item ] );
    setFilteredItems( ( prevItems: ProductOrderan[] ) => prevItems
    .filter( ( listItem ) => listItem.nama !==
      item.nama ) );
  };

  const removeFromCart = ( item: ProductOrderan ) => {
    setCart( ( prevCart: ProductOrderan[] ) => prevCart.filter( ( cartItem ) => cartItem.nama !== item.nama ) );
    setFilteredItems( ( prevItems: ProductOrderan[] ) => [ ...prevItems, item ] );
  };

  return ( <form onSubmit={ handleSubmit( onSubmit ) }>
    <div className="flex flex-col sm:flex-row  sm:gap-3 mt-5">
      <div className={ fomIsi }>
        <div className={ "flex flex-col gap-3 " }>


          <>
            <Horizon text={ 'Penerima' }/>
            <InputForm errors={ errors } title={ formOrderan.penerima } type={ "text" } reg={ register( "penerima" ) }/>
            <InputForm errors={ errors } title={ formOrderan.dari } type={ "text" } reg={ register( "dari" ) }/>
            <InputForm errors={ errors } title={ formOrderan.hpPenerima } type={ "tel" }
                       reg={ register( "hpPenerima" ) }/>
            <InputForm errors={ errors } title={ formOrderan.alamatPenerima } type={ "textarea" } tag={ "textarea" }
                       max={ 100 } min={ 0 } reg={ register( "alamatPenerima" ) }/>

            {/*<InputForm errors={ errors } title={ "Alamat Penerima" } type={ "text" }*/ }
            {/*           reg={ register( "alamatPenerima" ) }/>*/ }
          </>


          <>
            <Horizon text={ 'Pengirim' }/>
            <InputForm errors={ errors } title={ formOrderan.pengirim } type="text" reg={ register( "pengirim" ) }/>
            <InputForm errors={ errors } title={ formOrderan.hpPengirim } type={ "number" }
                       reg={ register( "hpPengirim" ) }/></>
          <label htmlFor="namaPengiriman"
                 className={ styleLabelForm }>{ formOrderan.namaPengiriman }</label>
          <select
            id={ "namaPengiriman" }
            data-test={ formOrderan.namaPengiriman }
            className='bg-gray-50  border border-gray-300 p-2 rounded-md'{ ...register( "namaPengiriman" ) }>
            { travel.map( ( t, i ) => ( <option key={ `${ t.nama + i }` } value={ t.nama }>{ t.nama }</option> ) ) }
          </select>

          <InputForm errors={ errors } tag={ 'input' } title={ formOrderan.ongkir } type={ "number" }
                     reg={ register( "ongkir", { valueAsNumber: true } ) }/>
          <label htmlFor="lokasi"
                 className={ styleLabelForm }>{ formOrderan.lokasi }</label>
          <select id={ "lokasi" }
                  data-test={ formOrderan.lokasi }
                  className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "lokasi" ) }>
            <option value="Ungaran">Ungaran</option>
            <option value="Semarang">Semarang</option>
          </select>

          <label htmlFor="typePembayaran"
                 className={ styleLabelForm }>{ formOrderan.typePembayaran }</label>
          <select
            id={ "typePembayaran" }
            data-test={ formOrderan.typePembayaran }
            className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "typePembayaran" ) }>
            { bank.map( ( b: Pick<TBank, "nama">, i ) => (
              <option value={ b.nama } key={ `${ b.nama + i }` }>{ b.nama }</option>
            ) ) }
          </select>


        </div>
      </div>

      <div className={ fomIsi }>
        <div className="flex flex-col gap-3">
          <Horizon text={ 'Produk' }/>

          <div className=" flex flex-row  gap-1 sm:gap-7 w-[100%] ">
            <button
              data-test={ 'close-open-button' }

              type={ 'button' }
              className={ !cariProduct ? " btn btn-error btn-square " : "btn btn-info btn-square " }
              onClick={ () => {setCariProduct( !cariProduct )} }>

              {/*<span className=" flex flex-row items-center px-4 justify-around ">*/ }
              <span>
                    { !cariProduct
                      ? <Icon icon="ic:baseline-close" color={ 'white' } width={ 20 } height={ 20 }/>
                      : <Icon icon="ic:sharp-search" color={ 'white' } width={ 20 } height={ 20 }/> }
                  </span>

              {/*<span className=" sm:hidden md:block sm:mx-2 ">{ !cariProduct ? "Tutup" : "Cari" }</span>*/ }
              {/*</span>*/ }

            </button>
            <label htmlFor={ "cari" } className={ "w-full" }>

              <input
                data-test={ 'search-product' }
                name={ "cari" }
                id={ "cari" }
                className={ 'input input-bordered  w-full' }
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
              className={ " border-gray-300 border overflow-y-auto  h-[15rem] bg-gray-50 p-2 rounded " }>

              {

                filteredItems.length < 0
                ? ( <div>Data Kosong</div> )
                : filteredItems.map( ( item: ProductOrderan, i: number ) => (
                  <CardLists i={ i } isItemAdded={ isItemAdded } item={ item } key={ `${ item.id + i }` }>
                    <button
                      className={ " text-white btn-sm md:btn-md btn btn-info " }
                      type={ "button" }
                      data-test={ `product_${ i }` }
                      onClick={ () => {
                        append(
                          {
                            id    : item.id,
                            nama  : item.nama,
                            harga : item.harga,
                            lokasi: item.lokasi,
                            jumlah: 1,
                            jenis : item.jenis,
                            img   : item.img,
                          }
                        )
                        addToCart( item )
                      } }
                    >
                      <Icon icon="ic:baseline-add"/>
                      <span className={ "ml-1 hidden md:hidden lg:block" }>Add</span>
                    </button>
                  </CardLists>
                ) ) }
            </ul>

          </div>

          {/*----------------------------------------------- -CART LIST-------------------------------------*/ }

          <div className="border border-gray-200 rounded bg-gray-50"
               onClick={ () => setCariProduct( true ) }>
            <ul className={ " border-gray-300 border overflow-y-auto   h-[15rem] bg-gray-50 p-2 rounded " }>
              {/*--------------------------------------------------------loop-------------------------*/ }
              { fields.length < 0
                ? ( <li>
                  <div>Data Kosong</div>
                </li> )
                : fields.map( ( item: ProductOrderan, i: number ) => {
                  return (
                    <CardTrolley
                      key={ `${ item.id + i }` }
                      values={
                        <>
                          <label htmlFor={ `semuaProduct.${ i }.id` } hidden={ true }>
                            <input type={ 'hidden' } id={ `semuaProduct.${ i }.id` }
                                   value={ item.id }{ ...register( `semuaProduct.${ i }.id`, { required: true } ) }/>
                          </label>

                          <label htmlFor={ `semuaProduct.${ i }.nama` } hidden={ true }>
                            <input type={ 'hidden' } id={ `semuaProduct.${ i }.nama` }
                                   value={ item.nama }{ ...register( `semuaProduct.${ i }.nama`, { required: true } ) }/>
                          </label>

                          {/*<label htmlFor={ `semuaProduct.${ i }.keterangan` } hidden={ true }>*/ }
                          {/*  <input type={ 'hidden' } id={ `semuaProduct.${ i }.keterangan` }*/ }
                          {/*         value={ item.keterangan }{ ...register( `semuaProduct.${ i }.keterangan`, { required: true } ) }/>*/ }
                          {/*</label>*/ }

                          <label htmlFor={ `semuaProduct.${ i }.lokasi` } hidden={ true }>
                            <input type={ 'hidden' } id={ `semuaProduct.${ i }.lokasi` }
                                   value={ item.lokasi }{ ...register( `semuaProduct.${ i }.lokasi`, { required: true } ) }/>
                          </label>

                          <label htmlFor={ `semuaProduct.${ i }.jenis` } hidden={ true }>
                            <input type={ 'hidden' } id={ `semuaProduct.${ i }.jenis` }
                                   value={ item.jenis }{ ...register( `semuaProduct.${ i }.jenis`, { required: true } ) }/>
                          </label>

                          <label htmlFor={ `semuaProduct.${ i }.img` } hidden={ true }>
                            <input type={ 'hidden' } id={ `semuaProduct.${ i }.img` }
                                   value={ item.img }{ ...register( `semuaProduct.${ i }.img`, { required: true } ) }/>
                          </label>

                          <label htmlFor={ `semuaProduct.${ i }.harga` } hidden={ true }>
                            <input type={ 'hidden' } id={ `semuaProduct.${ i }.harga` }
                                   value={ item.harga }{ ...register( `semuaProduct.${ i }.harga`, { required: true } ) }/>
                          </label>
                        </>

                      }
                      actions={
                        <>
                          <label htmlFor={ `semuaProduct.${ i }.jumlah` } className={ " label " }>
                            <input
                              data-test={ 'jumlah-product' }
                              className={ "input input-primary w-full md:input-sm lg:input-md" }
                              type={ "number" }
                              min={ 1 }
                              defaultValue={ 1 }
                              id={ `semuaProduct.${ i }.jumlah` }
                              { ...register( `semuaProduct.${ i }.jumlah`,
                                { valueAsNumber: true } ) }
                            />
                          </label>

                          <button
                            data-test={ `trash-product_${ i }` }
                            className={ "text-white btn-sm md:btn-sm lg:btn-md btn btn-error w-full" }
                                  type={ "button" }
                                  onClick={ () => {
                                    removeFromCart( item );
                                    remove( i )
                                  } }>
                            <Icon icon="ic:outline-close"/>
                            <span className="ml-1 hidden md:hidden lg:block">Hapus</span>
                          </button>
                        </>

                      }
                      item={ item }
                    />
                  )
                } ) }
            </ul>
          </div>
        </div>

        <hr className={ "m-2" }/>
        <div className={ "flex flex-col gap-3" }>
          <>
            <Horizon text={ 'Waktu' }/>
            {/*<input type={}/> */ }

            {/*<input type={'date'} /> */ }

            <InputForm errors={ errors } tag={ "input" } title={ formOrderan.pesan } type={ "date" }
                       min={ `${ currentYear }-${ currentMonth }-01` }
                       max={ `${ currentYear }-${ currentMonth + 1 }-31` }
                       reg={ register( "pesan" ) }
            />
            {/*<InputForm errors={ errors } tag={ "input" } title={ "Kirim" } type={ "date" }*/ }
            {/*           min={ `${ currentYear }-${ currentMonth }-01` }*/ }
            {/*           max={ `${ currentYear }-${ currentMonth + 1 }-31` }*/ }
            {/*           reg={ register( "kirim", ) }*/ }
            {/*/>*/ }
            <InputForm errors={ errors } tag={ "input" } title={ formOrderan.waktuKirim } type={ "datetime-local" }
                       reg={ register( "waktuKirim", ) }
            />
            <InputForm errors={ errors } tag={ "textarea" } title={ formOrderan.guna } type={ "textarea" }
                       max={ 100 } min={ 0 } reg={ register( "guna" ) }/></>
          {/* jenis Pembayaran */ }


          <label htmlFor="status"
                 className={ styleLabelForm }>{ formOrderan.status }</label>
          <select id="status" defaultValue={ "Di Terima" }
                  data-test={ formOrderan.status }
                  className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "status" ) }>
            {/*/status/*/ }
            <option className={ Status( "Terima" ) } value="Terima">Di Terima</option>
            <option className={ Status( "Proses" ) } value='Proses'>Di Proses</option>
            <option className={ Status( "Kirim" ) } value="Kirim">Di Kirim</option>
            <option className={ Status( "Selesai" ) } value="Selesai"> Selesai</option>
          </select>
        </div>

        {/*{ isValid && (*/ }
        <button type="submit"
                data-test={ 'button-submit' }
                className={ "btn btn-success text-white w-full" }>
          Add Product
        </button>
        {/*) }*/ }


        { isSubmitted && <PopUp
          key={ 'asdasd' }
          data={ valueForm }
          id={ id }
          method={ method }
        /> }

        { isSubmitted && <button className={ "btn btn-error text-white" }
                                 onClick={ () => reset( defaultValues ) }
                                 type="button">Reset</button> }
      </div>
    </div>
  </form> )
}

