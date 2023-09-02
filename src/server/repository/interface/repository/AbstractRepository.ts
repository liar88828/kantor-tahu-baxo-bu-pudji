import { TYPE } from '@/server/models/dataAccess/Bank';
import { PrismaClient } from '../../../../../prisma/data';

export type TEntity = keyof PrismaClient

// Define the conditional type
export type GetModel<T extends TEntity> =
  T extends "semuaProduct" ? PrismaClient["semuaProduct"] :
  T extends "bank" ? PrismaClient["bank"] :
  T extends "produk" ? PrismaClient["produk"] :
  never;

export interface IModelPrisma {
  bank: string;
  semuaProduct: string;
  produk: string;
}

export interface InterfaceAbstractRepository<T extends TEntity> {
  prisma: GetModel<T>;
  setOne( d: any ): any;
  setMany( data: any[] ): any[];
  findAll(): Promise<any>;
  findOne( id: string ): Promise<any>;
  findById( id: string ): Promise<any>;
  destroyOne( id: string ): Promise<any>;
  createOne( data: TYPE ): Promise<any>;
  updateOne( data: TYPE, id: string ): Promise<any>;
}
