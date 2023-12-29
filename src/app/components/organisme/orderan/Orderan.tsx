import { styleLabelForm } from '@/app/style/form';

export const TextCard   = ( { text }: { text: string | number } ) => {
  return <span className={ "text-xs sm:text-base" + styleLabelForm }>{ text }</span>

}
export const HeaderCard = ( { nama }: { nama: string | number } ) => {
  return <span className={ "text-sm sm:text-base font-bold " + styleLabelForm }>{ nama }</span>

}
export const ImageCard  = ( { img, nama }: { img: string, nama: string } ) => {
  return <figure className={ " h-32 object-cover rounded " }>
    <img src={ img }
           alt={ nama }
           width={ 100 }
           height={ 100 }
           className=" rounded object-cover h-full w-32"
    />
  </figure>
}