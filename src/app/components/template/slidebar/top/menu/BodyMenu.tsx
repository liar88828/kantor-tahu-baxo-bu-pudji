import { ReactNode } from 'react';

export function BodyMenu( { children }: {
  children: ReactNode
} ) {
  return ( <div className={ "flex flex-row gap-5 z-50 p-2 justify-between overflow-x-auto " }>
        { children }
      </div>
  )
}


