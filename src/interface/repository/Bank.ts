import { GetModel, InterfaceAbstractRepository } from '@/interface/repository/AbstractRepository';
import { TPBank } from '@/server/models/prisma/config';

export interface IRepoBank<T extends TPBank> extends InterfaceAbstractRepository<"bank"> {
  prisma: GetModel<"bank">;
  // get
  // findDashboard( a: string ): Promise<any>;

  //set data
  setOne( d: T ): T;
  setMany( data: T[] ): any[];
  //create data
  createMany( data: T[] ): Promise<any>;
  // delete data
  destroyMany( id: string ): Promise<any>;
  // edit data
  updateMany( data: T[], id: string ): Promise<any>;
}
