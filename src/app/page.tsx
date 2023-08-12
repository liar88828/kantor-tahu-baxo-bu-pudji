import React, { Suspense } from 'react';
import Dashboard from '@/app/dashboard/dashboard';

export default async function Home() {

  return <Suspense fallback={ <div>Loading...</div> }>
    <Dashboard/>
  </Suspense>

}


