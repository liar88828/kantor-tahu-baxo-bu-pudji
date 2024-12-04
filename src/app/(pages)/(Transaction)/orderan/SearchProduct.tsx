'use client'
import { ProductOrderan, TOrder } from '@/interface/orderan';
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';
import { UseFieldArrayAppend, UseFormRegister } from 'react-hook-form';
import Horizon from '@/app/element/Horizon';
import { Icon } from '@iconify/react';
import CardLists from '@/app/components/organisme/orderan/cardList';
import CardTrolley from '@/app/(pages)/(Transaction)/orderan/cardTrolley';
import { remove } from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/file-protocol';

export function SearchProduct( {
  cariProduct,
  searchQuery,
  filteredItems,
  fields,
  setCariProduct,
  handleSearchChange,
  isItemAdded,
  addToCart,
  append,
  register,
  removeFromCart
}: {
  cariProduct: boolean,
  isItemAdded: ( item: ProductOrderan ) => boolean,
  setCariProduct: Dispatch<SetStateAction<boolean>>,
  searchQuery: string,
  handleSearchChange: ( event: ChangeEvent<HTMLInputElement> ) => void,
  filteredItems: ProductOrderan[],
  addToCart: ( item: ProductOrderan ) => void,
  append: UseFieldArrayAppend<TOrder, "semuaProduct">,
  fields: any[],
  register: UseFormRegister<TOrder>,
  removeFromCart: ( item: ProductOrderan ) => void
} ): ReactNode {
  return <div className="flex flex-col gap-3">
    <Horizon text={ 'Produk' }/>

    <div className=" flex flex-row  gap-1 sm:gap-7 w-[100%] ">
      <button
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

}