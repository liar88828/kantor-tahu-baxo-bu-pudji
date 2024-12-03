import { Prisma, PrismaClient, } from '../../../prisma/data';
import { IRepoOrderan } from '@/interface/repository/Orderan';
import { TPBank, TPOrderan, TPProduct, TPSemuaProduct, TPTravel } from '@/server/models/prisma/config';
import { IRepoBank } from '@/interface/repository/Bank';
import { IRepoSemuaProduk } from '@/interface/repository/SemuaProduk';
import { IRepoTravel } from '@/interface/repository/Travel';
import { IRepoProduct } from '@/interface/repository/Product';
import TypeMap = Prisma.TypeMap;

export type TEntity = TypeMap["meta"]["modelProps"]

// Define the conditional type
export type GetModel<T extends TEntity> =
  T extends "semuaProduct" ? PrismaClient["semuaProduct"] :
  T extends "bank" ? PrismaClient["bank"] :
  T extends "travel" ? PrismaClient["travel"] :
  T extends "orderan" ? PrismaClient["orderan"] :
  T extends "product" ? PrismaClient["product"] :
  never;

export interface InterfaceAbstractRepository<T extends TEntity, > {
  prisma: GetModel<T>;
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

export type RepositoryAll<T extends TEntity> =
  T extends "semuaProduct" ? IRepoSemuaProduk<TPSemuaProduct> :
  T extends "bank" ? IRepoBank<TPBank> :
  T extends "travel" ? IRepoTravel<TPTravel> :
  T extends "orderan" ? IRepoOrderan<TPOrderan> :
  T extends "product" ? IRepoProduct<TPProduct> :
  never;




