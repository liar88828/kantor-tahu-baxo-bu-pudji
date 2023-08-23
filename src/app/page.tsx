import React, { Suspense } from 'react';
import { ServerComponent } from '@/app/dashboard/dashboard';

export default function Home() {

  return <div>
    <Suspense fallback={ <div>Loading...</div> }>
      <ServerComponent/>
    </Suspense>
  </div>
}


