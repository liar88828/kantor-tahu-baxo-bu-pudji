// noinspection ES6ConvertVarToLetConst

import { PrismaClient, } from '../../../../prisma/data';

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if( process.env.NODE_ENV !== 'production' ) globalThis.prisma = prisma

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
