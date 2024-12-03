import { IAbstractPrisma } from '@/servers/data-source/interface/prisma/IAbstract';
import { TStatusParams } from '@/servers/data-source/interface/prisma/SemuaProduk';
import { TPOrderan } from '@/interface/prisma';

type TYPE = TPOrderan;

export interface IOrderanData<T extends TYPE> extends IAbstractPrisma<"orderan"> {
  //set
  setMany( data: T, method: string ): any[];
  //post
  createOne( data: T ): Promise<any>;
  //get
  findDashboard( a: string ): Promise<any>;
  findByStatus( status: TYPE["status"] ): Promise<any>
  //PUT
  updateOne( data: T, id: string ): Promise<any>;
  updateStatus( data: TStatusParams, id: string ): Promise<any>;
  updateMany( data: T, id: string ): Promise<any>;

  //delete
  destroyMany( array: string [] ): Promise<any>;
  destroyOne( array: string ): Promise<any>;
  // findDashboard( a: string ): Promise<any>;
}
