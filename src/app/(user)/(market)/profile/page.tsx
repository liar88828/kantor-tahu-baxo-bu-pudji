import React from 'react'
import { repeat } from '@/utils/repeat'
import { BookMarked, LogOut, LucideClock, MoveRight, ShoppingCartIcon, Truck, } from 'lucide-react';
import Link from 'next/link';
export default function page() {
  return (
    <div className="px-5 space-y-5 mb-28">
      <div className="card card-compact bg-base-300">
        <div className="card-body">
          <div className="justify-between flex">

            <h2 className='card-title'>Lorem ipsum dolor sit  </h2>
            <Link href={'/'} className='btn  btn-square btn-sm btn-error'>
              <LogOut />
            </Link>
          </div>

          <p>Lorem@ipsum.dolor.</p>
          <p>123123123123</p>
          <>
            <div className="flex justify-between">
              <div className="indicator">
                <span className="indicator-item badge badge-secondary">99+</span>
                <button className="btn btn-square">
                  <ShoppingCartIcon />
                </button>
              </div>
              {/* for progress */}
              <div className="indicator">
                <span className="indicator-item badge badge-secondary">99+</span>
                <button className="btn btn-square">
                  <LucideClock />
                </button>
              </div>
              <div className="indicator">
                <span className="indicator-item badge badge-secondary">99+</span>
                <button className="btn btn-square">
                  <Truck />
                </button>
              </div>
              {/* for finish / history */}
              <div className="indicator">
                <span className="indicator-item badge badge-secondary">99+</span>
                <button className="btn btn-square">
                  <BookMarked />

                </button>
              </div>
            </div>
          </>

        </div>
      </div>

      <div className="">
        <h2 className='card-title'>History</h2>
        <div className="space-y-1 overflow-y-auto h-[60vh] py-2">
          {repeat(20).map(d => (
            <div
              key={d}
              className="card card-compact bg-base-300">
              <div className="card-body">
                <h2 className="card-title">#12312312312312</h2>
                <div className="flex justify-between">
                  <div className="">
                    <p>Lorem 12312312 </p>
                    <p>{new Date().toISOString()}</p>
                  </div>
                  <button className=' btn btn-square'>
                    <MoveRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
