import { UseFormRegisterReturn }          from 'react-hook-form';
import { StyleInputForm, styleLabelForm } from '@/app/style/form';
import {
  defaultFormProduct, formProduct
} from '@/app/utils/format/product';
import React, { ReactElement }            from 'react';
import { InputFormProps }                 from '@/entity/client/InputForm';

export function InputNew( props: { register: UseFormRegisterReturn<string> } ) {
  return <div className="flex flex-col">
    <label className={ styleLabelForm }
           htmlFor="grid-password"> { formProduct.lokasi } </label>
    <input
      placeholder={ ` Masukan  ${ formProduct.lokasi }....` }
      className={ `${ StyleInputForm( false ) }` }
      defaultValue={ defaultFormProduct.lokasi }
      { ...props.register }
    />
  </div>;
}

export function InputForm(
  {

    tag: Tag = "input", title, type, reg, value, min, defaultValue
  }
    : InputFormProps ): ReactElement {

  let ress = {
    placeholder: ` Masukan ${ title }....`,
    className  : `${ StyleInputForm( false ) }`
  }
  if( type ) ress = Object.assign( ress, { type } );
  if( value ) ress = Object.assign( ress, { value } );
  if( min ) ress = Object.assign( ress, { min } );
  if( defaultValue ) ress = Object.assign( ress, { defaultValue } );

  return (
    <div className="flex flex-col">
      <label className={ styleLabelForm }
             htmlFor="grid-password"> { title } </label>
      <Tag{ ...ress }{ ...reg }/>
    </div>
  )
}