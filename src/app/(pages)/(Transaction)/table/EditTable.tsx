"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

function EditTable( { id }: {
  id: string
} ) {
  const router = useRouter()
  return (
    <button
      data-test={ 'button-edit' }
      className=" btn btn-info btn-sm sm:btn-md text-white "
      onClick={ () => router.push( "/orderan/edit?id=" + id, ) }
      type={ "button" }
    >
      EDIT
    </button>
  );
}

export default EditTable;