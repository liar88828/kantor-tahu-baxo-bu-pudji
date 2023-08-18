"use client"
import React, { Suspense } from 'react';
import { FormOrder } from '@/app/components/form/Orderan';
import { defaultValues } from '@/app/utils/format/orderan';

export default function Page() {
  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <Suspense fallback={ <div>Loading...</div> }>
        <FormOrder id={ "" } defaultDataOrder={ {} } method={ "POST" }/>
      </Suspense>
    </main>
  )
}
