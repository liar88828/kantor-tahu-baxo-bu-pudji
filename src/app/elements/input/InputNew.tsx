import { StyleInputForm, styleLabelForm } from '@/app/style/form';
import { ReactElement } from 'react';
import { InputFormProps } from '@/entity/client/InputForm';

export function InputForm(
  { tag: Tag = "input", title, type, reg, value, min, max, defaultValue, }
    : InputFormProps ): ReactElement {

  let ress = {
    placeholder: ` Masukan ${ title }....`,
    className  : `${ StyleInputForm( false ) }`
  }

  if( type ) ress = Object.assign( ress, { type } );
  if( value ) ress = Object.assign( ress, { value } );
  if( min ) ress = Object.assign( ress, { min } );
  if( max ) ress = Object.assign( ress, { max } );
  if( defaultValue ) ress = Object.assign( ress, { defaultValue } );

  return (
    <div className="flex flex-col">
      <label className={ styleLabelForm }
             htmlFor="grid-password"> { title } </label>
      <Tag { ...ress }{ ...reg } />
    </div>
  )
}