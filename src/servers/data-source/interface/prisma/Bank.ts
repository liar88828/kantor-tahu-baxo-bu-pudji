import { GetModelPrisma, TPBank } from '@/servers/data-source/prisma/config';
import { IAbstractPrisma } from '@/servers/data-source/interface/prisma/IAbstract';

export interface IBankData<T extends TPBank> extends IAbstractPrisma<"bank"> {
  prisma: GetModelPrisma<"bank">;
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
