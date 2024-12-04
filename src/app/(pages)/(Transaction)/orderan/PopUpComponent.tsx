import { ReactNode } from 'react';
import { Texts } from '@/app/components/Atom/Text/TextCard';
import { ImageCard } from '@/app/components/organisme/orderan/Orderan';
import { TextPopUp } from '@/app/components/Atom/Text/TextPopUp';
import { Rupiah } from '@/lib/utils/rupiah';
import { styleLabelForm } from '@/app/style/form';

export const FooterPopUp = ( { text }: { text: ReactNode } ) => {
  return <>
    <div className="shadow shadow-slate-300 p-2 rounded ">
      <Texts>Keterangan</Texts>
      <br/>
      <Texts>{ text }</Texts>
    </div>
  </>
}
export const CardBody    = ( { title, text }: { title: ReactNode, text: ReactNode } ) => {
  return <>
    <div className="card-body rounded p-1 sm:p-2 ">
      { title }
      { text }
    </div>
  </>
}

export const CardMaster = ( { children }: { children: ReactNode, } ) => {
  return <ul className="  relative overflow-x-auto rounded-lg bg-white p-2 mt-1 gap-2 flex shadow shadow-slate-300">
    { children }
  </ul>
}

export const Card = ( { children }: { children: ReactNode, } ) => {
  return <div className={ "card flex-nowrap flex" }>
    <div className="w-[10rem] rounded shadow shadow-gray-500 p-1 sm:p-2">
      { children }
    </div>
  </div>
}

export const CardPopUp = ( { semuaProduct }: { semuaProduct: TProduct[] } ) => {
  return <CardMaster>
    { semuaProduct.map( ( item: TProduct, ) => {
      return (
        <Card key={ item.id + item.nama }>
          <ImageCard img={ item.img } nama={ item.nama }/>
          <CardBody
            title={
              <h1 className=" text-xs sm:text-lg font-bold mb-2">{ item.nama }</h1>
            }
            text={ <>
              <TextPopUp title={ "Harga" } value={ Rupiah( item.harga ) }/>
              <TextPopUp title={ "Jumlah" } value={ item.jumlah }/>
              <TextPopUp title={ "Jenis" } value={ item.jenis }/>
            </> }
          />
        </Card>
      )
    } ) }
  </CardMaster>
}

export const PopUpCard = ( { children }: { children: ReactNode } ) => {
  return <div className=" border border-gray-200 rounded p-2 gap-4 flex flex-col w-full sm:w-[50%]">{ children }</div>
}
export const TextCard  = ( { text }: { text: string | number } ) => {
  return <span className={ "text-xs sm:text-base" + styleLabelForm }>{ text }</span>
}

export const HeaderCard = ( { nama }: { nama: string | number } ) => {
  return <span className={ "text-sm sm:text-base font-bold " + styleLabelForm }>{ nama }</span>

}
export const ImageCards = ( { img, nama }: { img: string, nama: string } ) => {
  return <figure className={ " h-32 object-cover rounded " }>
    <img src={ img }
         alt={ nama }
         width={ 100 }
         height={ 100 }
         className=" rounded object-cover h-full w-32"
    />
  </figure>

}