import { Users } from "@prisma/client";
import { prisma } from "@/config/prisma";
import { MoveRight } from "lucide-react";
import React from "react";

export async function ProfileServer({ user }: { user: Users }) {
    const orderHistory = await prisma.orders.findMany(
        {
            where: { id_customer: user.id, },
            include: { Customers: true },
        }
    );
    return (
        <div className="">
            <h2 className='card-title'>History</h2>
            <div className="space-y-1 overflow-y-auto h-[60vh] py-2">
                { orderHistory.map(d => (
                    <div
                        key={ d.id }
                        className="card card-compact bg-base-300">
                        <div className="card-body">
                            <h2 className="card-title">#12312312312312</h2>
                            <div className="flex justify-between">
                                <div className="">
                                    <p>Lorem 12312312 </p>
                                    <p>{ new Date().toISOString() }</p>
                                </div>
                                <button className=' btn btn-square'>
                                    <MoveRight/>
                                </button>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </div>

    );
}