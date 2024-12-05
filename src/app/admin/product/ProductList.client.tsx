'use client'
import React from 'react'
import {Pen, Plus, Trash} from 'lucide-react'
import {repeat} from '@/utils/repeat'
import {Rupiah} from '@/utils/rupiah'
import Link from 'next/link'

export default function ProductList() {
	return (
		<div className='p-3'>
			<div className="flex justify-between my-4 gap-3">
				<input type="text" className='input input-bordered w-full' placeholder='search...'/>
				<Link href={'/admin/delivery/create'} className='btn btn-square'>
					<Plus/>
				</Link>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-20 ">
				{repeat(20).map(d => (
					<div
						key={d}
						className="card card-side card-compact bg-base-300 ">
						<figure className={'p-1'}>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="https://picsum.photos/200/300?random=1"
								alt="Movie"
								className='rounded-xl object-cover w-32 h-32 '
							/>
						</figure>
						<div className="card-body">
							<div className="flex justify-between h-full">
								<h2 className='card-title'>Lorem, ipsum dolor.</h2>
							</div>
							<div className="flex justify-between items-end">
								<div className="">
									<p>{Rupiah(20000)}</p>
									<p>Pedas</p>
								</div>
								<div className="flex items-center gap-2">
									<button

										className=' btn btn-square btn-error btn-sm '>
										<Trash/>
									</button>
									<Link href={`/admin/product/update/${d}`}

										  className=' btn btn-square btn-info btn-sm '>
										<Pen/>
									</Link>
								</div>
							</div>
						</div>
					</div>
				))}

			</div>
		</div>
	)
}
