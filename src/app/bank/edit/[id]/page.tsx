import { CComponent } from '@/app/bank/edit/[id]/CComponent';

export default function Home( { params: { id } }: { params: { id: string } } ) {
  console.log( id )
  return (
    <CComponent/> )
}



