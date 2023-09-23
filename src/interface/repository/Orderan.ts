import { TPOrderan, } from '@/server/models/prisma/config';
import { InterfaceAbstractRepository } from '@/interface/repository/AbstractRepository';
import { TStatusParams } from '@/interface/repository/SemuaProduk';

export interface IRepoOrderan<T extends TPOrderan> extends InterfaceAbstractRepository<"orderan"> {
  //set
  setMany( data: T, method: string ): any[];
  //post
  createOne( data: T ): Promise<any>;
  //get
  findDashboard( a: string ): Promise<any>;
  findByStatus( status: TPOrderan["status"] ): Promise<any>
  //PUT
  updateOne( data: T, id: string ): Promise<any>;
  updateStatus( data: TStatusParams, id: string ): Promise<any>;
  updateMany( data: T, id: string ): Promise<any>;

  //delete
  destroyMany( array: string [] ): Promise<any>;
  destroyOne( array: string ): Promise<any>;
  // findDashboard( a: string ): Promise<any>;
}
