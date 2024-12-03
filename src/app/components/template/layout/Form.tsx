import { Cshadow } from '@/app/style/shadow';
import { PropsWithChildren, } from 'react';

export const FormLayout = ( { children }: PropsWithChildren ) => {
  return <div
    data-test={ "iki div test" }
    id={ "iki div id" }
    className="iki div class   flex sm:flex-row flex-col gap-5 justify-center ">{ children }</div>
}

export const FormBody   = ( { children }: PropsWithChildren ) => {
  return <div className={ " bg-white rounded-xl p-5 md:w-1/2 w-full " + Cshadow }>{ children }</div>
}
export const FormButton = ( { children }: PropsWithChildren ) => {
  return <div className="mt-2 flex flex-row gap-2">{ children }</div>
}
export const FormPrev = ( { children }: PropsWithChildren ) => {
  return <div className="md:w-1/2  ">{ children }</div>
}
