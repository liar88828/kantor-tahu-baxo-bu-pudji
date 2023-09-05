import { InterfaceAbstractRepository } from '@/interface/repository/Abstract';
import { TYPE } from '@/server/models/dataAccess/semuaProduk';

export type TStatusParams = {
  id: string;
  status: string;
}

export interface IRepoSemuaProduk<T extends TYPE> extends InterfaceAbstractRepository<"semuaProduct"> {
  //find
  findDashboard(): Promise<any>;

  //set data
  setOne( d: T, id?: string ): T;
  setMany( data: T[], id?: string
  ): any[];
  //find
  paginate( data: { row: number, skip: number } ): Promise<any>;
  //create
  // createOne<U>( data: U, id: string ): Promise<any>;
  // createMany( data: T[], id: string ): Promise<any>;
  // createText( data: T[], id?: string ): Promise<any>;
  //update data
  updateMany( data: T[], id: string ): Promise<any>;

  // delete data
  destroyMany( id: string ): Promise<any>;
}

