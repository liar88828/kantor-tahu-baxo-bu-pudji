import { getDataById } from '@/app/utils/ress/bank';
import { LinkNavbar } from '@/app/elements/link/LinksNavbar';
import { Form } from '@/app/components/form/Bank';

export default async function Home( { params: { id } }: { params: { id: string } } ) {

  const data: Awaited<TBank> = await getDataById( id )

  return (
    <LinkNavbar>
      <Form data={ data } method={ "PUT" }/>
    </LinkNavbar> )
}

