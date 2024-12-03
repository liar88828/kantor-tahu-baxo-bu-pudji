import { StyleInputForm } from '@/app/style/form';
import { ReactElement } from 'react';
import { InputFormProps } from '@/interface/InputForm';

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
  // console.log( title )

  const Input = type === "textarea"
                ?
                <textarea
                  data-test={ title }
                  maxLength={ max ?? 10 }
                  minLength={ min ?? 10 }
                  id={ title }
                  placeholder={ ` Masukan ${ title }....` }
                  { ...reg }
                  className={ " textarea-bordered textarea " }
                />
                :
                <input
                  data-test={ title }
                  className={ "input input-bordered input-neural" }
                  placeholder={ ` Masukan ${ title }....` }
                  id={ title }
                  type={ type }
                  max={ max }
                  min={ min }
                  { ...reg }
                />
  return (
    <div className={ "form-control " } data-theme={ 'light' }>
      <label className={ "label" } htmlFor={ title }>
        <span className={ "label-text" }>{ title }</span>
      </label>

      { Input }
      { errors[ reg.name ] &&
        <p className={ "text-red-600 text-sm" }>{ errors[ reg.name ]?.message as string }</p> }

    </div>
  )
}