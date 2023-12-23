"use client"
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { TOrder } from '@/entity/client/orderan';
import { ChangeEvent, useState } from 'react';
import { StyleInputForm, styleLabelForm } from '@/app/style/form';
import { InputForm } from '@/app/components/Atom/input/InputNew';
import { Status } from '@/app/style/status';
import { currentMonth, currentYear } from '@/lib/utils/formatDate';
import CardTrolley from '@/app/components/organisme/orderan/cardTrolley';
import CardLists from '@/app/components/organisme/orderan/cardList';
import dynamic from 'next/dynamic';
import { enableCache, Icon } from '@iconify/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { vSchema } from '@/lib/validation/zod/validationSchema';
import { defaultValues } from '../../../../../asset/constants/model/orderan';

enableCache( 'session' );

const PopUp = dynamic( () => import('@/app/components/molecules/popup/orderan') )
export const fomIsi = "bg-white flex-col flex sm:w-[48%]  md:w-[49%] ml-2 gap-3 rounded p-2 sm:p-5";

export default function Orderan( {
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
  product: TProduct[]
  bank: Pick<TBank, "nama">[]
} ) {
  const { control, register, handleSubmit, formState: { errors, isSubmitted }, reset } = useForm<TOrder>( {
    defaultValues: defaultDataOrder,
    mode         : "onChange",
    resolver     : zodResolver( vSchema.OrderanSchema )
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

  return ( <form onSubmit={ handleSubmit( onSubmit ) }>
    <div className="flex flex-col sm:flex-row  sm:gap-3 mt-5">
      <div className={ fomIsi }>
        <div className={ "flex flex-col gap-3 " }>
          <InputForm errors={ errors } title={ "Pengirim" } type="text"
                     reg={ register( "pengirim" ) }
          />
          <InputForm errors={ errors } title={ "Hp Pengirim" } type={ "number" }
                     reg={ register( "hpPengirim" ) }/>
          <InputForm errors={ errors } title={ "Penerima" } type={ "text" }
                     reg={ register( "penerima" ) }/>

          <InputForm errors={ errors } title={ "Alamat Penerima" } type={ "text" }
                     reg={ register( "alamatPenerima" ) }/>

          <InputForm errors={ errors } title={ "Hp Penerima" } type={ "number" }
                     reg={ register( "hpPenerima" ) }/>

          <InputForm errors={ errors } tag={ "input" } title={ "Pesan" } type={ "date" }
                     min={ `${ currentYear }-${ currentMonth }-01` }
                     max={ `${ currentYear }-${ currentMonth + 1 }-31` }
                     reg={ register( "pesan" ) }
          />
          <InputForm errors={ errors } tag={ "input" } title={ "Kirim" } type={ "date" }
                     min={ `${ currentYear }-${ currentMonth }-01` }
                     max={ `${ currentYear }-${ currentMonth + 1 }-31` }
                     reg={ register( "kirim", ) }
          />
          <InputForm errors={ errors } tag={ "input" } title={ "Waktu Kirim" } type={ "time" }
                     reg={ register( "waktuKirim", ) }
          />
          <InputForm errors={ errors } tag={ "textarea" } title={ "Keterangan" } type={ "textarea" }
                     max={ 100 }
                     min={ 20 }
                     reg={ register( "guna" ) }/>
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
                          ? <Icon icon="ic:baseline-close"/>
                          : <Icon icon="ic:sharp-search"/> }</span>

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
              className={ " border-gray-300 border overflow-y-auto  h-[15rem] bg-gray-50 p-2 rounded " }>

              {

                filteredItems.length < 0
                ? ( <div>Data Kosong</div> )
                : filteredItems.map( ( item: TProduct, i: number ) => (
                  <CardLists i={ i } isItemAdded={ isItemAdded } item={ item } key={ `${ item.id + i }` }>
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
                : fields.map( ( item: TProduct, i: number ) => {
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

                          <label htmlFor={ `semuaProduct.${ i }.keterangan` } hidden={ true }>
                            <input type={ 'hidden' } id={ `semuaProduct.${ i }.keterangan` }
                                   value={ item.keterangan }{ ...register( `semuaProduct.${ i }.keterangan`, { required: true } ) }/>
                          </label>

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
                          <label htmlFor={ `semuaProduct.${ i }.jumlah` } className={ " label " }
                          >
                            <input
                              className={ "input input-primary w-full md:input-sm lg:input-md" }
                              type={ "number" }
                              min={ 1 }
                              defaultValue={ 1 }
                              id={ `semuaProduct.${ i }.jumlah` }
                              { ...register( `semuaProduct.${ i }.jumlah`,
                                { valueAsNumber: true } ) }
                            />
                          </label>

                          <button className={ "text-white btn-sm md:btn-sm lg:btn-md btn btn-error w-full" }
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

          {/* combo box  */ }

          <label htmlFor="namaPengiriman" className={ styleLabelForm }>Ekspedisi</label>
          <select
            id={ "namaPengiriman" }
            className='bg-gray-50  border border-gray-300 p-2 rounded-md'{ ...register( "namaPengiriman" ) }>
            { travel.map( ( t, i ) => ( <option key={ `${ t.nama + i }` } value={ t.nama }>{ t.nama }</option> ) ) }
          </select>

          {/* tulis sendiri */ }
          <InputForm errors={ errors } tag={ 'input' } title={ "Harga Ongkir" } type={ "number" }
                     reg={ register( "ongkir", { valueAsNumber: true } ) }/>
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
        /> }

        { isSubmitted && <button className={ "btn btn-error text-white" }
                                 onClick={ () => reset( defaultValues ) }
                                 type="button">Reset</button> }
      </div>
    </div>
  </form> )
}

