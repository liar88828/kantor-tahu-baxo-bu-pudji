"use client"
// SearchForm.tsx
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

interface SearchCriterion {
  field: string;
  operator: string;
  searchTerm: string;
}

interface FormData {
  searchCriteria: SearchCriterion[];
}

const SearchForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>( {
    defaultValues: {
      searchCriteria: [ { field: '', operator: '', searchTerm: '' } ],
    },
  } );

  const [ externalData, setExternalData ] = useState<SearchCriterion[]>( [] );

  const { fields, append, remove } = useFieldArray<FormData>( {
    control,
    name: 'searchCriteria',
  } );

  // Form submission handler with custom validation
  const onSubmit = ( data: FormData ) => {
    // Perform custom validation
    const uniqueFields = new Set<string>();
    let hasDuplicate = false;

    data.searchCriteria.forEach( ( criterion ) => {
      if( uniqueFields.has( criterion.field ) ) {
        hasDuplicate = true;
      }
      else {
        uniqueFields.add( criterion.field );
        setExternalData( [ ...externalData, ...data.searchCriteria ] );

      }
    } );

    if( hasDuplicate ) {
      // If there are duplicate fields, show an error message
      alert( 'Field values must be different and cannot have the same value.' );
    }
    else {
      // Perform search logic here
      console.log( 'Search Criteria:', data.searchCriteria );
    }
  };
  return (
    <form onSubmit={ handleSubmit( onSubmit ) }>
      <div>
        { fields.map( ( item, index ) => (
          <div key={ item.id }>
            <Controller
              name={ `searchCriteria.${ index }.field` }
              control={ control }
              defaultValue={ item.field || '' }
              rules={ { required: 'Field is required' } }
              render={ ( { field } ) => (
                <input type="text" placeholder="Field" { ...field } />
              ) }
            />
            <Controller
              name={ `searchCriteria.${ index }.operator` }
              control={ control }
              defaultValue={ item.operator || '' }
              rules={ { required: 'Operator is required' } }
              render={ ( { field } ) => (
                <input type="text" placeholder="Operator" { ...field } />
              ) }
            />
            <Controller
              name={ `searchCriteria.${ index }.searchTerm` }
              control={ control }
              defaultValue={ item.searchTerm || '' }
              rules={ { required: 'Search term is required' } }
              render={ ( { field } ) => (
                <input type="text" placeholder="Search Term" { ...field } />
              ) }
            />
            <button type="button" onClick={ () => remove( index ) }>
              Remove
            </button>
            { errors.searchCriteria && errors.searchCriteria[ index ] && (
              <div>
                { errors.searchCriteria[ index ]?.field && (
                  <p>{ errors.searchCriteria[ index ]?.field?.message }</p>
                ) }
                { errors.searchCriteria[ index ]?.operator && (
                  <p>{ errors.searchCriteria[ index ]?.operator?.message }</p>
                ) }
                { errors.searchCriteria[ index ]?.searchTerm && (
                  <p>{ errors.searchCriteria[ index ]?.searchTerm?.message }</p>
                ) }
              </div>
            ) }
          </div>
        ) ) }
      </div>
      <button type="button" onClick={ () => append( { field: '', operator: '', searchTerm: '' } ) }>
        Add Search Criterion
      </button>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
