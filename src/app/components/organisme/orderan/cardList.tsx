import React, { ReactNode } from 'react';
import { HeaderCard, ImageCards, TextCard } from '@/app/components/moleculs/popup/PopUpComponent';
import { Rupiah } from '@/lib/utils/rupiah';

function CardLists( { children, item, i, isItemAdded, }: {
  children: ReactNode,
  i: number,
  item: TProduct,
  isItemAdded: ( item: TProduct ) => boolean,
} ) {
  return ( <li
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
            { children }
          </div>
        </div>
      </div>
    </li>
  );
}

export default CardLists;