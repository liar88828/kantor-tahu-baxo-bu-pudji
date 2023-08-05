'use client'
import React           from 'react';
import { useParams }   from 'next/navigation';
import { FormEdit }    from '@/app/product/[id]/edit/FormEdit';

export default function Page() {
  const { id } = useParams()
  return ( <FormEdit id={ id }/> )

}

