import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

// export type TPrisma<T extends TEntity> =
//   T extends "semuaProduct" ? TPSemuaProduct :
//   T extends "bank" ? TPBank :
//   T extends "travel" ? TPTravel :
//   T extends "product" ? TPProduct :
//   T extends "orderan" ? TPOrderan : never

// export type TPSemuaProduct = Prisma.SemuaProductUncheckedCreateInput
// export type TPBank = Prisma.BankCreateInput
// export type TPTravel = Prisma.TravelCreateInput
// export type TPProduct = Prisma.ProductCreateInput
// export type TPOrderan =
//   Omit<Required<Prisma.OrderanCreateInput>, "semuaProduct" | "updated_at" | "created_at">
//   & Pick<TOrderServer, "semuaProduct">
