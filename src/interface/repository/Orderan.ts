import { TPOrderan, } from '@/server/models/prisma/config';
import { InterfaceAbstractRepository } from '@/interface/repository/AbstractRepository';

export interface IRepoOrderan<T extends TPOrderan> extends InterfaceAbstractRepository<"orderan"> {
  setMany( data: T, method: string ): any[];
  createOne( data: T ): Promise<any>;
  updateOne( data: T, id: string ): Promise<any>;
  findDashboard( a: string ): Promise<any>;
  updateMany( data: T, id: string ): Promise<any>;
  destroyMany( array: string [] ): Promise<any>;

  // findDashboard( a: string ): Promise<any>;
}
