import { ReactNode } from 'react';

export const UlCard   = ( { children }: { children: ReactNode } ) => {
  return <ul className={ "px-1 sm:px-4 md:px-6 " }>{ children }</ul>
}
export const LiCard   = ( { children }: { children: ReactNode } ) => {
  return <li className="card card-side bg-gray-100 shadow-xl my-3 ">{ children }</li>
}
export const CardBody = ( { children }: { children: ReactNode } ) => {
  return <div className="card-body flex flex-row justify-between py-4 sm:px-6 md:px-4 ">{ children }</div>
}