import { HorizontalCard } from '@/app/components/dashboard/card';
import { Donat } from '@/lib/chart/donat';
import { getData } from '@/app/utils/ress/table';
import { Lines } from '@/lib/chart/line';
import React, { Suspense } from 'react';

export type TDonat = {
  _count: {
    nama: number
  },
  nama: string
}
export type TLine = {
  _count: {
    pesan: number
  },
  pesan: string,
}
export type TStatus = {
  _count: {
    status: number
  },
  status: string,
}

export async function ServerComponent() {
  const r = await getData()
  return ( <>
      <ClientComponent
        line={ r.data[ 0 ] }
        donat={ r.data[ 1 ] }
        status={ r.data[ 2 ] }
      />
    </>
  )
}

const ClientComponent = ( { line, donat, status }: {
        line: TLine[],
        donat: TDonat[],
        status: TStatus[]
      } ) => {

        return (
          <>
            <div className={ " flex gap-2 flex-col p-5" }>
              {/*flex-wrap*/ }
              <div
                className="flex flex-wrap my-5 p-2 md:p-5  gap-2 sm:gap-3 justify-between bg-slate-50  rounded-2xl shadow-xl shadow-slate-200">
                <HorizontalCard datas={ status }/>
              </div>
              <div className="   border border-black bg-white rounded-3xl">
                <Suspense fallback={ <div>Loading...</div> }>
                  <Lines datas={ line }/>
                </Suspense>
              </div>

              <div className="flex flex-row gap-5">
                <div className="w-[50%]  border border-black bg-white rounded-3xl p-2">
                  <Donat datas={ donat }/>
                </div>
                <div className="w-[50%]  border border-black bg-white rounded-3xl  p-2">
                  <Donat datas={ donat }/>

                  {/*<Donat/>*/ }
                </div>
              </div>
            </div>
          </>
        );
      }
;

