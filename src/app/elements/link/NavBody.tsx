import { ReactNode } from 'react';

export function NavBody( { children }:{
  children:ReactNode
}) {
  return (
    <section className="overflow-x-auto  ">
      <div className={ "flex flex-row gap-5 z-50 m-4" }>
        {children}
      </div>
    </section>
  )
}


