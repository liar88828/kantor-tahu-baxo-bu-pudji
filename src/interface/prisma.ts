// Interface for the product
import { IRepoSemuaProduk } from '@/servers/data-source/interface/prisma/SemuaProduk';
import { IBankData } from '@/servers/data-source/interface/prisma/Bank';
import { IOrderanData } from '@/servers/data-source/interface/prisma/Orderan';
import { IProductData } from '@/servers/data-source/interface/prisma/Product';
import { Prisma, PrismaClient } from '../../prisma/data';
import { TOrderServer } from '@/interface/orderan';
import TypeMap = Prisma.TypeMap;

interface Product {
  id: number;
  name: string;
  price: number;
}

// Interface for the shopping cart item
interface CartItem<T> {
  product: T;
  quantity: number;
}

// Interface for the shopping cart
interface ShoppingCart<T extends Product> {
  items: CartItem<T>[];
  addItem( item: CartItem<T> ): void;
  removeItem( id: number ): void;
  getTotal(): number;
}

export type TPrisma<T extends TEntity> =
// T extends "semuaProduct" ? TPSemuaProduct :
  T extends "bank" ? TPBank :
  T extends "travel" ? TPTravel :
  T extends "product" ? TPProduct :
  T extends "orderan" ? TPOrderan : never

export type IDataAll<T extends TEntity> =
  T extends "semuaProduct" ? IRepoSemuaProduk<TPSemuaProduct> :
  T extends "bank" ? IBankData<TPBank> :
    // T extends "travel" ? ITravelData<TPTravel> :
  T extends "orderan" ? IOrderanData<TPOrderan> :
  T extends "product" ? IProductData<TPProduct> :
  never;
//
// export type IRepositoryAll<T extends TEntity> =
// // T extends "semuaProduct" ? IProductRepo :
//   T extends "bank" ? IBankRepo :
//   T extends "travel" ? IDeliveryRepo :
//   T extends "orderan" ? IOrderanRepo :
//   T extends "product" ? IProductRepo :
//   never;

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
  T extends "travel" ? PrismaClient["delivery"] :
  T extends "orderan" ? PrismaClient["orderan"] :
  T extends "product" ? PrismaClient["product"] :
  never;

export type TPSemuaProduct = Prisma.SemuaProductUncheckedCreateInput
export type TPBank = Prisma.BankCreateInput
export type TPTravel = Prisma.DeliveryCreateInput
export type TPProduct = Prisma.ProductCreateInput
export type TPOrderan =
  Omit<Prisma.OrderanCreateInput, "semuaProduct" | "updated_at" | "created_at">
  & Pick<TOrderServer, "semuaProduct">

export type SemuaProductCreateInput = Prisma.SemuaProductCreateManyInput

export type TListDashboard = ( Prisma.PickEnumerable<Prisma.OrderanGroupByOutputType, "status"[]> & {
  _count: { status: number }
} );
export type DonatChart = ( Prisma.PickEnumerable<Prisma.SemuaProductGroupByOutputType, "nama"[]> & {} );
