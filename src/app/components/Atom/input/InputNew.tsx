import { StyleInputForm } from '@/app/style/form';
import { ReactElement } from 'react';
import { InputFormProps } from '@/entity/client/InputForm';

export function InputForm(
  {
    tag: Tag = "input",
    title,
    type,
    reg,
    value,
    min,
    max,
    defaultValue,
    errors
  }
    : InputFormProps ): ReactElement {

  let ress = {
    placeholder: ` Masukan ${ title }....`,
    className  : `${ StyleInputForm( false ) }`,
    id         : title,
  }

  if( type ) ress = Object.assign( ress, { type } );
  if( value ) ress = Object.assign( ress, { value } );
  if( min ) ress = Object.assign( ress, { min } );
  if( max ) ress = Object.assign( ress, { max } );
  if( defaultValue ) ress = Object.assign( ress, { defaultValue } );
  // console.log( type )
  return (
    <div className={ "form-control " }>
      <label className={ "label" } htmlFor={ title }>
        <span className={ "label-text" }>{ title }</span>
      </label>

      { type === "textarea"
        ?
        <textarea
          maxLength={ max ?? 10 }
          minLength={ min ?? 10 }
          id={ title }
          placeholder={ ` Masukan ${ title }....` }
          { ...reg }
          className={ "input input-bordered " }
        />
        :
        <input
          className={ "input input-bordered " }
          placeholder={ ` Masukan ${ title }....` }
          id={ title }
          type={ type }
          max={ max }
          min={ min }
          { ...reg }
        /> }
      { errors[ reg.name ] &&
        <p className={ "text-red-600 text-sm" }>{ errors[ reg.name ]?.message as string }</p> }

    </div>
  )
}