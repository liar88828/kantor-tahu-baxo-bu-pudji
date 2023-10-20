import { ReactNode } from 'react';

export const UlCard = (
  { children, name = "" }:
    { children: ReactNode, name: string }
) => {
  return <ul
    data-test={ `list-${ name }` }
    className={ " md:flex md:flex-wrap md:gap-2  " }>{ children }</ul>
}
export const LiCard = (
  { children, name = "" }:
    { children: ReactNode, name: string }
) => {
  return <li
    data-test={ "list-" + name }
    className="static card card-side card-compact  bg-gray-100 shadow-xl mb-4 md:w-[48%]  ">
    { children }
  </li>
}

export const CardBody   = ( { children }: { children: ReactNode } ) => {
  return <div className="card-body flex flex-col lg:flex-row justify-between py-4 ">{ children }</div>
}
export const CardButton = ( { children }: { children: ReactNode } ) => {
  return ( <div className="card-actions justify-center items-stretch flex flex-row lg:flex-col  ">
    { children }
  </div> )
}