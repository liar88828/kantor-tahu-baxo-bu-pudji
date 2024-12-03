import { GetModelPrisma, TEntity } from '@/interface/prisma';

export interface IAbstractPrisma<T extends TEntity, > {
  prisma: GetModelPrisma<T>;
  setOne( d: any, id?: string ): any;
  setMany( data: any[] | any, method?: string ): any[];
  paginate( data: { row: number, skip: number } ): Promise<any>;
  //
  findAll(): Promise<any>;
  findOne( id: string ): Promise<any>;
  findById( id: string ): Promise<any>;
  // findByStatus( id: string ): Promise<any>;
  // findDashboard( a: string ): Promise<any>;
  //
  createOne( data: any, id?: string ): Promise<any>;
  //
  updateOne( data: any, id: string ): Promise<any>;
  // updateMany( data: any, id: string ): Promise<any>;
  //
  destroyOne( id: string ): Promise<any>;
  // destroyMany( id: string[] | string ): Promise<any>;

}

//