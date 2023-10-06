import { ReactNode } from 'react';

export const ButtonAction = ( { children }: { children: ReactNode } ) => {
  return ( <div className="card-actions justify-center items-stretch flex flex-row lg:flex-col  ">
    { children }
  </div> )
}