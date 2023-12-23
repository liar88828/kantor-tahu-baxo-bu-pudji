import { ReactNode } from 'react';

export function BodyMenu( { children }: {
  children: ReactNode
} ) {
  return (
    <section className="overflow-x-auto mb-2  ">
      <div className={ "flex flex-row gap-5 z-50 p-4" }>
        { children }
      </div>
    </section>
  )
}


