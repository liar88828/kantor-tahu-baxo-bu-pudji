import React, { ReactNode } from 'react';
import { Cshadow } from '@/app/style/shadow';
import { styleLabelForm } from '@/app/style/form';

export function LayoutImagePrev( { children, text }: { children: ReactNode, text: string } ) {
  return <div
    data-type={ "image-prev-layout" }
    className={ " bg-white rounded-lg p-5 flex flex-col gap-5 " + Cshadow }>
    <div className={ 'flex flex-col gap-5 ' }>
      <label className={ styleLabelForm + "capitalize" }>Masukan Gambar { text }</label>
      { children }
    </div>
  </div>
}