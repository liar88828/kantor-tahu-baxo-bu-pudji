"use client"
import React from 'react';

import { notify } from '@/app/utils/notif/notif/notif';

export default function Page() {

  return (
    <div>
      <button onClick={ notify }>Notify!</button>
    </div>
  );
}