
import React from 'react'
import { repeat } from '../../../utils/repeat'
import { ShoppingCart } from 'lucide-react';
export default function page() {
  return (
    <div className='grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid xl:grid-cols-6 gap-2 p-2'>
      {repeat(10).map(d => (<div
        key={d}
        className="card card-compact card-bordered bg-base-300" >
        <figure className=''>
          <img className='rounded object-cover w-full h-44 '
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm btn-square ">
              <ShoppingCart className='' />
            </button>
          </div>
        </div>
      </div>
      ))}
    </div>
  )
}
