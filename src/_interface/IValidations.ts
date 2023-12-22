import { z } from 'zod';
import { TPBank, TPProduct, TPSemuaProduct, TPTravel } from '@/servers/data-source/prisma/config';
import { SafeParseReturnType } from 'zod/lib/types';

export interface IValidations {
  //schema
  BankSchema: z.ZodType<TPBank>;
  ProductSchema: z.ZodType<TPProduct>;
  TravelSchema: z.ZodType<TPTravel>;
  semuaProdukSchema: z.ZodType<TPSemuaProduct>;
  OrderanSchema: z.ZodType<TOrderServer>;
  ZIdMany: z.ZodType<string[]>;
//method
//   Produk(): any;
  zodId( id: string ): SafeParseReturnType<string, string>
  zodModel<T>(
    data: T,
    Schema: z.ZodType<T, z.ZodTypeDef, T>
  ): SafeParseReturnType<T, T>
}

//only Object
export type ObjectSchemaKeys = {
  [K in keyof IValidations]: IValidations[K] extends ( ...args: any[] ) => any ? never : K;
}[keyof IValidations];

// const data: ObjectSchemaKeys = "BankSchema"

//only Method
type MethodSchemaKeys = {
  [K in keyof IValidations]: IValidations[K] extends ( ...args: any[] ) => any ? K : never;
}[keyof IValidations];
// const methodSchemaKeys: MethodSchemaKeys = "Produk";

// all key
export type AllKeys = {
  [K in keyof IValidations]: K;
}[keyof IValidations];

// const allKey: AllKeys = "BankSchema"