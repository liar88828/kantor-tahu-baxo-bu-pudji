import { TPSemuaProduct } from '@/servers/data-source/prisma/config';
import { IAbstractPrisma } from '@/servers/data-source/interface/prisma/IAbstract';

export type TStatusParams = {
  id: string;
  status: string;
}

// tambahan
export interface IRepoSemuaProduk<T extends TPSemuaProduct> extends IAbstractPrisma<"semuaProduct"> {
  //get
  findDashboard(): Promise<any>;
  paginate( data: { row: number, skip: number } ): Promise<any>;

  //set data
  setOne( d: T, id?: string ): T;
  setMany( data: T[], id?: string ): any[];

  //create
  // createOne<U>( data: U, id: string ): Promise<any>;
  // createMany( data: T[], id: string ): Promise<any>;
  // createText( data: T[], id?: string ): Promise<any>;
  //update data
  updateMany( data: T[], id: string ): Promise<any>;

  // delete data
  destroyMany( id: string ): Promise<any>;
}

