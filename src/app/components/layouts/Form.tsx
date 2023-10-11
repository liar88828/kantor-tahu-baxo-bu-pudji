import { Cshadow } from '@/app/style/shadow';

import { UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';
import { TEntity } from '@/servers/data-source/interface/prisma/IAbstract';

export type TFrom<T extends TEntity> =
// T extends "semuaProduct" ? TPSemuaProduct :
  T extends "bank" ? TBank :
  T extends "travel" ? TTravel :
  T extends "product" ? TProduct :
    // T extends "orderan" ? TPOrderan :
  never

export function FormLayout<T extends TEntity>( { children, handleSubmit, button, submit, FormInput, formUse }:
  {
    children: ReactNode,
    button: ReactNode,
    submit: ReactNode,
    FormInput: ReactNode,
    handleSubmit: ( data: TFrom<T> ) => Promise<any>,
    formUse: UseFormReturn<TFrom<T>, any, undefined>
  } ) {

  return ( <>
      <form onSubmit={ formUse.handleSubmit( handleSubmit ) }
            className="w-[97%] flex sm:flex-row flex-col gap-5  ">

        <section className={ " bg-white rounded-xl p-5 md:w-1/2 " + Cshadow }>
          { FormInput }

          <div className="mt-2 flex flex-row gap-2">
            { button }
            { submit }
          </div>
        </section>

        <section className={ "md:w-1/2 " }>
          { children }
        </section>
      </form>
    </>
  )
}