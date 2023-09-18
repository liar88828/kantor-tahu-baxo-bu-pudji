import { ReactNode } from 'react';

export const TextBody = ( { children }: { children: ReactNode } ) => {
  return <div className={ "flex flex-col sm:flex-row gap-0 sm:gap-2" }>{ children }</div>
}

export function TextTitle( props: { text: string } ) {
  return <h2 className="card-title text-xs sm:text-sm  md:text-md font-bold"> { props.text }</h2>;
}

export const Texts = ( { children }: { children: ReactNode } ) => {
  return <p className={ "text-xs sm:text-sm md:text-md" }>{ children }</p>
}

export const TextHidden = ( { title, value }: {
  title: string,
  value: string | number
} ) => {
  return <p className={ "text-xs sm:text-sm md:text-md text-black flex flex-nowrap" }>
    <span className={ "hidden sm:block mr-1" }>{ title }  </span>
    <span>{ value }</span>
  </p>
}

export const TextPopUp = ( { title, value }: { title: string, value: string | number } ) => {

  return <div className={ "flex flex-nowrap gap-1" }>
    <p className={ "text-xs sm:text-sm md:text-md font-bold" }>{ title } </p>
    <p className={ "text-xs sm:text-sm md:text-md" }>{ value }</p>
  </div>
}
