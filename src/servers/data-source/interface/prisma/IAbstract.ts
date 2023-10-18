import { Prisma, PrismaClient, } from '../../../../../prisma/data';
import { TPBank, TPOrderan, TPProduct, TPSemuaProduct, TPTravel } from '@/servers/data-source/prisma/config';
import TypeMap = Prisma.TypeMap;
import { IRepoSemuaProduk } from '@/servers/data-source/interface/prisma/SemuaProduk';
import { IBankData } from '@/servers/data-source/interface/prisma/Bank';
import { ITravelData } from '@/servers/data-source/interface/prisma/Travel';
import { IOrderanData } from '@/servers/data-source/interface/prisma/Orderan';
import { IProductData } from '@/servers/data-source/interface/prisma/Product';
import { IBankRepo } from '@/servers/interface/repository/IBankRepo';
import { IDeliveryRepo } from '@/servers/interface/repository/IDeliveryRepo';
import { IProductRepo } from '@/servers/interface/repository/IProductRepo';
import { IOrderanRepo } from '@/servers/interface/repository/IOrderanRepo';

export type TEntity = TypeMap["meta"]["modelProps"]

// Define the conditional type
export type GetModel<T extends TEntity> =
  T extends "semuaProduct" ? PrismaClient["semuaProduct"] :
  T extends "bank" ? PrismaClient["bank"] :
  T extends "travel" ? PrismaClient["travel"] :
  T extends "orderan" ? PrismaClient["orderan"] :
  T extends "product" ? PrismaClient["product"] :
  never;

export interface IAbstractPrisma<T extends TEntity, > {
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

export type IDataAll<T extends TEntity> =
  T extends "semuaProduct" ? IRepoSemuaProduk<TPSemuaProduct> :
  T extends "bank" ? IBankData<TPBank> :
  T extends "travel" ? ITravelData<TPTravel> :
  T extends "orderan" ? IOrderanData<TPOrderan> :
  T extends "product" ? IProductData<TPProduct> :
  never;

export type IRepositoryAll<T extends TEntity> =
// T extends "semuaProduct" ? IProductRepo :
  T extends "bank" ? IBankRepo :
  T extends "travel" ? IDeliveryRepo :
  T extends "orderan" ? IOrderanRepo :
  T extends "product" ? IProductRepo :
  never;

//
//
// export type RepositoryAll<T extends TEntity> =
//   T extends "semuaProduct" ? IRepoSemuaProduk<TPSemuaProduct> :
//   T extends "bank" ? IBankData<TPBank> :
//   T extends "travel" ? ITravelData<TPTravel> :
//   T extends "orderan" ? IOrderanData<TPOrderan> :
//   T extends "product" ? IProductData<TPProduct> :
//   never;
//
//
