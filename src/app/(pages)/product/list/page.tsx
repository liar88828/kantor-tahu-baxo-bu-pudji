import { UlCard } from '@/app/components/molecules/card/Card';
import Paginate from '@/app/components/molecules/list/Paginate';
import { TRes } from '@/entity/Utils';
import { Fetch } from '@/lib/ress/SendApi';
import { SearchParams } from '@/_interface/searchParams';
import ListProduct from '@/app/(pages)/product/Card';

export default async function Home( { searchParams }: SearchParams ) {
  const page                       = Number( searchParams.page )
  const take                       = Number( searchParams.take )
  // console.log(page,take)
  const { data }: TRes<TProduct[]> = await Fetch(
    {
      method: "GET",
      to    : "product",
      page  : page,
      take  : take
    } )
  return ( <>
      <UlCard name={ "product" }>
        { data.map( ( d: TProduct ) => ( <ListProduct d={ d } key={ d.id } to={ 'product' }/> ) ) }
      </UlCard>
      <Paginate
        take={ take }
        page={ page }
        length={ 100 }
      />
    </>
  )
}
