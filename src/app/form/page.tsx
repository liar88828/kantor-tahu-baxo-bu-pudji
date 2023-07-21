"use client"
// UserForm.tsx
import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

interface FormData {
  users: User[];
}

interface User {
  name: string;
  age: number;
}

const initialData: User[] = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];

const UserForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>( {
    defaultValues: { users: initialData },
  } );

  const { fields, append, remove } = useFieldArray<FormData>( {
    control,
    name: 'users',
  } );

  // Form submission handler
  const onSubmit = ( data: FormData ) => {
    // Perform form submission logic here
    console.log( 'Form submitted with data:', data );
  };

  return (
    <form onSubmit={ handleSubmit( onSubmit ) }>
      <div>
        { fields.map( ( item, index ) => (
          <div key={ item.id }>
            <Controller
              name={ `users.${ index }.name` }
              control={ control }
              defaultValue={ item.name || '' }
              rules={ { required: 'Name is required' } }
              render={ ( { field } ) => (
                <input type="text" { ...field } />
              ) }
            />
            <Controller
              name={ `users.${ index }.age` }
              control={ control }
              defaultValue={ item.age || 0 }
              rules={ { required: 'Age is required', min: 0 } }
              render={ ( { field } ) => (
                <input type="number" { ...field } />
              ) }
            />
            <button type="button" onClick={ () => remove( index ) }>
              Remove
            </button>
            { errors.users && errors.users[ index ] && (
              <div>
                { errors.users[ index ]?.name && (
                  <p>{ errors.users[ index ]?.name?.message }</p>
                ) }
                { errors.users[ index ]?.age && (
                  <p>{ errors.users[ index ]?.age?.message }</p>
                ) }
              </div>
            ) }
          </div>
        ) ) }
      </div>
      <button type="button" onClick={ () => append( { name: '', age: 0 } ) }>
        Add User
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
