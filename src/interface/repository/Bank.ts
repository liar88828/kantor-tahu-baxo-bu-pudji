import { TYPE } from '@/server/models/dataAccess/Bank';
import { InterfaceAbstractRepository } from '@/interface/repository/Abstract';

export interface IBankRepository<T extends TYPE> extends InterfaceAbstractRepository<"bank"> {
  //set data
  setOne( d: T ): T;
  setMany( data: T[] ): any[];
  //find data
  paginate( data: { row: number, skip: number } ): Promise<any>;
  //create data
  createMany( data: T[] ): Promise<any>;
  // delete data
  destroy( id: string ): Promise<any>;
  destroyMany( id: string ): Promise<any>;
  // edit data
  updateMany( data: T[], id: string ): Promise<any>;
}
