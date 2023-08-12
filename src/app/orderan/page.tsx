"use client"
import 'react-toastify/dist/ReactToastify.css'
import React, { Suspense } from 'react';
import { FormOrder } from '@/app/components/form/Orderan';

export default function Page() {
  return (
    <main className="flex p-3 sm:p-6   z-50 bg-green-50 gap-3 flex-col">
      <Suspense fallback={ <div>Loading...</div> }>
        <FormOrder/>
      </Suspense>
    </main>
  )
}
