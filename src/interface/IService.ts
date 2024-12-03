import { z } from 'zod';

export type ZodSchema<T> = z.ZodType<T, z.ZodTypeDef, T>;

export interface IService {
  validIdNew: ( id: string ) => ( any );
  validModelNew: <T>( data: T, Schema: ZodSchema<T> ) => ( any );

}