import ListProduct from '@/app/(pages)/product/Card';
import prisma from '@/servers/data-source/prisma/config';
import { SearchParams } from '@/interface/searchParams';
import Paginate from '@/app/element/Paginate';
import { UlCard } from '@/app/components/Card';

export default async function Home( { searchParams }: SearchParams ) {
  const page = Number( searchParams.page )
  const take = Number( searchParams.take )
  // console.log(page,take)
  // const { data }: TRes<TProduct[]> = await Fetch(
  //   {
  //     method: "GET",
  //     to    : "product",
  //     page  : page,
  //     take  : take
  //   } )
  // const length =await prisma.product.count({take:100})

  const [ data, length ] = await Promise.all( [
    prisma.product.findMany( { skip: ( page - 1 ) * take, take: take } ),
    prisma.product.count( { take: 100 } )
  ] )

  return ( <>
      <UlCard name={ "product" }>
        { data.map( ( d: TProduct ) => ( <ListProduct d={ d } key={ d.id } to={ 'product' }/> ) ) }
      </UlCard>
      <Paginate
        take={ take }
        page={ page }
        length={ length }
      />
    </>
  )
}
