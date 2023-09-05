import { Prisma, PrismaClient, } from '../../../prisma/data';
import TypeMap = Prisma.TypeMap;

export type TEntity = TypeMap["meta"]["modelProps"]

// Define the conditional type
export type GetModel<T extends TEntity> =
  T extends "semuaProduct" ? PrismaClient["semuaProduct"] :
  T extends "bank" ? PrismaClient["bank"] :
  T extends "produk" ? PrismaClient["produk"] :
  never;

export interface InterfaceAbstractRepository<T extends TEntity> {
  prisma: GetModel<T>;
  setOne( d: any, id?: string ): any;
  setMany( data: any[], id?: string ): any[];
  //
  findAll(): Promise<any>;
  findOne( id: string ): Promise<any>;
  findById( id: string ): Promise<any>;
  //
  destroyOne( id: string ): Promise<any>;
  createOne<U>( data: U, id?: string ): Promise<any>;
  updateOne<U>( data: U, id: string ): Promise<any>;
}

