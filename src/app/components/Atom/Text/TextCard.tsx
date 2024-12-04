import { HTMLAttributes, ReactNode } from 'react';

interface ChildComponentProps extends HTMLAttributes<HTMLParagraphElement> {
}

export const TextBody = ( { children }: { children: ReactNode } ) => {
  return <div className={ "flex flex-col lg:flex-row gap-0 sm:gap-2 w-full" }>{ children }</div>
}

export function TextTitle( props: { text: string } ) {
  return <h2 className="card-title text-sm sm:text-lg  md:text-lg font-bold"> { props.text }</h2>;
}

export const Texts = (
  {
    children, className
  }:
    {
      children: ReactNode,
      className?: string
    }
) => {
  return <p className={ `text-xs sm:text-sm md:text-md   ${ className }` }>{ children }</p>
}

