import React, { Suspense } from 'react';
import { HorizontalCard } from '@/app/components/dashboard/card';
import { Lines } from '@/lib/chart/line';
import { Donat } from '@/lib/chart/donat';

const Dashboard = () => {
  return (
    <>
      <div className={ " flex gap-2 flex-col p-5" }>
        {/*flex-wrap*/ }
        <div
          className="flex flex-wrap my-5 p-2 md:p-5  gap-2 sm:gap-3 justify-between bg-slate-50  rounded-2xl shadow-xl shadow-slate-200">
          <HorizontalCard/>
        </div>
        <div className="   border border-black bg-white rounded-3xl">
          <Suspense fallback={ <div>Loading...</div> }>
            <Lines/>
          </Suspense>
        </div>

        <div className="flex flex-row gap-5">
          <div className="w-[50%]  border border-black bg-white rounded-3xl p-2">
            <Suspense fallback={ <div>Loading...</div> }>
              <Donat/>
            </Suspense>
          </div>
          <div className="w-[50%]  border border-black bg-white rounded-3xl  p-2">
            <Suspense fallback={ <div>Loading...</div> }>
              <Donat/>
            </Suspense>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
