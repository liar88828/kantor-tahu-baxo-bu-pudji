import { ReactNode } from 'react';

export const TextBody = ( { children }: { children: ReactNode } ) => {
  return <div className={ "flex flex-col sm:flex-row gap-0 sm:gap-2" }>{ children }</div>
}

export function TextTitle( props: { text: string } ) {
  return <h2 className="card-title text-xs sm:text-sm  md:text-md"> { props.text }</h2>;
}

export const Texts = ( { children }: { children: ReactNode } ) => {
  return <p className={ "text-xs sm:text-sm  md:text-md" }>{ children }</p>
}