'use client'
import React, { Suspense } from 'react';
import { LinkCreate }      from '@/app/product/Links';
import { useRouter }       from 'next/navigation';
import { CardList }        from '@/app/product/list/card';
import { urlApi }          from '@/app/product/api';

export default function Page() {
  const router = useRouter()


  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <LinkCreate/>
      <Suspense fallback={ <div>Loading...</div> }>
        <CardList router={ router } urlApi={ urlApi }/>
      </Suspense>
    </main>
  )
}

