'use client'
import React from 'react'
import {Minus, Plus, Trash} from 'lucide-react'
import {Rupiah} from '@/utils/rupiah'
import {useDispatch, useSelector} from "react-redux";
import {decrementById, incrementById, initState} from "@/store/trolley";
import {RootState} from "@/store/store";
import {exampleOrderProductCreate} from "@/assets/ExampleOrder";

export default function Page() {
	const trolleys = useSelector((state: RootState) => state.trolley.trolleys)
	const dispatch = useDispatch()
	React.useEffect(() => {
		console.log(trolleys)
		if (trolleys.length === 0) {
			dispatch(initState(exampleOrderProductCreate));
		}
	}, [dispatch]);


	return (
		<div className='p-3'>
			<div className="space-y-2">
				{trolleys.map(d => (
					<div
						key={d.id}
						className="card card-side card-compact bg-base-300 ">
						<figure>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="https://picsum.photos/200/300?random=1"
								alt="Movie"
								className='rounded-xl object-cover w-32 h-32 '
							/>
						</figure>
						<div className="card-body">
							<div className="flex justify-between">
								<h2 className='card-title'>Lorem, ipsum dolor.</h2>
								<button className=' btn btn-square btn-error btn-sm '>
									<Trash/>
								</button>
							</div>
							<div className="flex justify-between items-end">
								<div className="">
									<p>{Rupiah(20000)}</p>
									<p>Pedas</p>
								</div>
								<div className="flex items-center gap-2">
									<button
										onClick={() => dispatch(incrementById(d.id))}

										className="btn btn-square btn-sm">
										<Plus/>
									</button>
									<h2>{d.qty}</h2>
									<button onClick={() => dispatch(decrementById(d.id))}
											className="btn btn-square  btn-sm">
										<Minus/>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}

			</div>
		</div>
	)
}
