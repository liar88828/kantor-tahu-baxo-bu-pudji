"use client"
import { Form } from '@/app/components/form/Bank';
import { LinkNavbar } from '@/app/elements/link/LinksNavbar';
import { defaultFormBank } from '@/app/utils/format/bank';

export default function Home() {

  return (
    <LinkNavbar>
      <Form method={ "POST" } data={ defaultFormBank }/>
    </LinkNavbar>

  )
}

