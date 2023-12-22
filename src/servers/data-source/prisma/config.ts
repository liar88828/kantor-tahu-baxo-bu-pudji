import { Prisma, PrismaClient, } from '../../../../prisma/data';
import { IRepoSemuaProduk } from '../interface/prisma/SemuaProduk';
import { IBankData } from '../interface/prisma/Bank';
import { ITravelData } from '../interface/prisma/Travel';
import { IOrderanData } from '../interface/prisma/Orderan';
import { IProductData } from '../interface/prisma/Product';
import { IBankRepo } from '../interface/repository/IBankRepo';
import { IDeliveryRepo } from '../interface/repository/IDeliveryRepo';
import { IOrderanRepo } from '../interface/repository/IOrderanRepo';
import { IProductRepo } from '../interface/repository/IProductRepo';
import TypeMap = Prisma.TypeMap;

export const prisma = new PrismaClient()

export type TPrisma<T extends TEntity> =
// T extends "semuaProduct" ? TPSemuaProduct :
  T extends "bank" ? TPBank :
  T extends "travel" ? TPTravel :
  T extends "product" ? TPProduct :
  T extends "orderan" ? TPOrderan : never

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

export type IModelAll<T extends TEntity> =
// T extends "semuaProduct" ? IRepoSemuaProduk<TPSemuaProduct> :
  T extends "bank" ? TPBank :
  T extends "travel" ? TPTravel :
  T extends "orderan" ? TPOrderan :
  T extends "product" ? TPProduct :
  never;

export type TEntity = TypeMap["meta"]["modelProps"]

// Define the conditional type
export type GetModelPrisma<T extends TEntity> =
  T extends "semuaProduct" ? PrismaClient["semuaProduct"] :
  T extends "bank" ? PrismaClient["bank"] :
  T extends "travel" ? PrismaClient["travel"] :
  T extends "orderan" ? PrismaClient["orderan"] :
  T extends "product" ? PrismaClient["product"] :
  never;

export type TPSemuaProduct = Prisma.SemuaProductUncheckedCreateInput
export type TPBank = Prisma.BankCreateInput
export type TPTravel = Prisma.TravelCreateInput
export type TPProduct = Prisma.ProductCreateInput
export type TPOrderan =
  Omit<Required<Prisma.OrderanCreateInput>, "semuaProduct" | "updated_at" | "created_at">
  & Pick<TOrderServer, "semuaProduct">

// export type IEntityAll<T extends TEntity> =
// // T extends "semuaProduct" ? IProductRepo :
//   T extends "bank" ? IBankRepo :
//   T extends "travel" ? IDeliveryRepo :
//   T extends "orderan" ? IOrderanRepo :
//   T extends "product" ? IProductRepo :
//   never;
//
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
