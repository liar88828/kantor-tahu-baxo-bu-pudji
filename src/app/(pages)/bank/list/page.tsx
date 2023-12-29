import { Suspense } from 'react';
import { SkeletonCard } from '@/app/components/template/handling/SkeletonCard';
import { ListBank } from '@/app/(pages)/bank/Card';
import DataEmpty from '@/app/components/template/handling/DataEmpty';
import prisma from '@/servers/data-source/prisma/config';
import { SearchParams } from '@/interface/searchParams';
import { UlCard } from '@/app/components/Card';
import Paginate from '@/app/element/Paginate';

export default async function Page( { searchParams }: SearchParams ) {
  const page = Number( searchParams.page )
  const take = Number( searchParams.take )
  // console.log(searchParams)
  // console.log(page,take)
  // const { data } = await Fetch(
  //   {
  //     to    : "bank",
  //     method: "GET",
  //     // id    : "all",
  //     // stores: "noCache",
  //     page: page,
  //     take: take
  //   } )
  // const length =await prisma.bank.count({take:100})

  // console.log( data )
  // const response = await fetch( `http://localhost:3000/api/bank?page=${ page }&take=${ take }` )
  // if(!response.ok){
  //   return <div className={ 'card card-body static border-radius bg-base-200' }>
  //     <h1 className={ 'card-title' }>data is Error</h1>
  //     <pre className={ 'card-action' }>
  //     <Link
  //       className={ 'btn btn-primary ' }
  //       href={ '?page=1&take=10' }>
  //       Back
  //     </Link>
  //     </pre>
  //   </div>
  // }
  // const resData = await response.json()

  // const totalPostsCount = await BankRepo.findCount()
  // const data            = await BankRepo.findPaginate( page, take )

  const [ data, length ] = await Promise.all( [
    prisma.bank.findMany( { skip: ( page - 1 ) * take, take: take } ),
    prisma.bank.count( { take: 100 } )
  ] )
  return <>
    <UlCard name={ "bank" }>
      { data.length === 0 ? (
        <DataEmpty/>
      ) : <>
          <Suspense fallback={ <SkeletonCard/> }>
            { data.map( ( d: TBank ) => ( <ListBank d={ d } key={ d.id }/> ) ) }
          </Suspense>
        </>
      }
    </UlCard>
    <Paginate
      take={ take }
      page={ page }
      length={ length }
    />
  </>
}
