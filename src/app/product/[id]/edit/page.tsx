'use client'
import React           from 'react';
import { useParams }   from 'next/navigation';
import { getDataById } from '@/app/product/api';
import { FormEdit }    from '@/app/product/[id]/edit/FormEdit';

export default function Page() {
  const { id } = useParams()
  return ( <GetEditData id={ id }/> )
}

async function GetEditData( { id }: { id: string } ) {
  const data = await getDataById( id )
  return ( <FormEdit data={ data }/>

  )
}

