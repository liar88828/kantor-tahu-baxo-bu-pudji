import React from 'react';
import { HorizontalCard } from '@/app/dashboard/card';
import { Lines } from '@/app/dashboard/chart/line';
import { Donat } from '@/app/dashboard/chart/donat';

const Dashboard = () => {
  return (
    <>
      <div className={ " " }>
        <div className="flex-row flex gap-2 justify-between bg-red-400 p-5">
          <HorizontalCard/>
        </div>
        <div className="w-[50%]">
          <Lines/>
        </div>
        <div className="w-[50%]  border border-black bg-white">
          <Donat/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
