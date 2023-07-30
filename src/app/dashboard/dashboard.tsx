import React from 'react';
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
          <Lines/>
        </div>

        <div className="flex flex-row gap-5">
          <div className="w-[50%]  border border-black bg-white rounded-3xl p-2">
            <Donat/>
          </div>
          <div className="w-[50%]  border border-black bg-white rounded-3xl  p-2">
            <Donat/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
