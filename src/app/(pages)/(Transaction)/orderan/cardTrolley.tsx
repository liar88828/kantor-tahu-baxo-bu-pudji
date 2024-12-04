import React, { ReactNode } from 'react';
import { Rupiah } from '@/lib/utils/rupiah';
import { ProductOrderan } from '@/interface/orderan';
import { HeaderCard, ImageCards, TextCard } from '@/app/(pages)/(Transaction)/orderan/PopUpComponent';

function CardTrolley( { values, actions, item }: {
  values: ReactNode,
  actions: ReactNode,
  item: ProductOrderan,
} ) {
  return (
    <li className={ "flex flex-row items-center  gap-2 p-1 sm:p-2 border border-gray-300 bg-white" }>
      { values }
      <ImageCards img={ item.img } nama={ item.nama }/>
      <div className="ml-[2%] w-[60%]">
        <HeaderCard nama={ item.nama }/>
        <div className=" flex flex-row gap-2 justify-between ">
          <div className={ "flex flex-col" }>
            <TextCard text={ Rupiah( item.harga ) }/>
            <TextCard text={ item.jenis }/>
            <TextCard text={ item.lokasi }/>
          </div>
          <div className=" w-[100%] ">
            { actions }
          </div>
        </div>
      </div>
    </li>
  );
}

export default CardTrolley;