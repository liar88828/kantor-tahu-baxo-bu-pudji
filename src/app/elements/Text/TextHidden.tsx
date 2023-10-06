import { HTMLAttributes, ReactNode } from 'react';

type TextsProps = HTMLAttributes<HTMLParagraphElement> & {
  title: ReactNode;
  value: ReactNode;
  className1?:string,
  className2?:string
};
export const TextHidden = ( { title, value, className1 = "", className2 = "" }: TextsProps ) => {
  return <p className={ "text-xs sm:text-sm md:text-md text-black flex flex-nowrap" }>
    <span className={ `${ className1 } hidden xl:block mr-1 whitespace-nowrap` }>{ title }  </span>
    <span className={ `${ className2 }` }>{ value }</span>
  </p>
}