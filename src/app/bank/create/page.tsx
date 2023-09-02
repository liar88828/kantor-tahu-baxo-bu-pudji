"use client"
import React from 'react';
import { Form } from '@/app/components/form/Bank';
import { LinkNavbar } from '@/app/elements/link/LinksNavbar';
import { postData } from '@/app/utils/ress/bank';
import { defaultFormBank } from '@/app/utils/format/bank';
import { notifyData } from '@/app/utils/notif/toash';

export default function Home() {
  const method = "POST"

  const sendData = async ( data: TBank, ) => {
    const res = await postData( data )
    notifyData( res.msg )
  }
  const data     = defaultFormBank

  return (
    <LinkNavbar>
      <div className="flex flex-row">
        <Form sendData={ sendData } data={ data } method={ method }/>
      </div>
    </LinkNavbar>

  )
}

