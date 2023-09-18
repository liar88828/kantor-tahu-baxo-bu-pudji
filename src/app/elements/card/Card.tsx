import { ReactNode } from 'react';

export const UlCard   = ( { children }: { children: ReactNode } ) => {
  return <ul className={ " md:flex md:flex-wrap md:gap-2  " }>{ children }</ul>
}
export const LiCard   = ( { children }: { children: ReactNode } ) => {
  return <li className="card card-side bg-gray-100 shadow-xl mb-4 md:w-[48%]  ">{ children }</li>
}
export const CardBody = ( { children }: { children: ReactNode } ) => {
  return <div className="card-body flex flex-row justify-between py-4 sm:px-4 md:px-4 pl-2 pr-4">{ children }</div>
}