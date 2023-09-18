import { Suspense } from 'react';
import { TRes } from '@/entity/Utils';
import { FormBank } from '@/app/components/form/FormBank';
import { GateWay } from '@/app/utils/ress/GateWay';

export const dynamic    = 'auto'
export const revalidate = 0
export const fetchCache = 'auto'
export const runtime    = 'nodejs'
export default async function Home( { params: { id } }: { params: { id: string } } ) {

  const data: Awaited<TRes<TBank>> = await GateWay( "GET", "bank", id, )

  return (
    <FormBank
      method={ 'PUT' }
      defaultData={ data.data }
      id={ id }
      to={ 'bank' }/>

  )
}

