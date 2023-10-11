import { z } from 'zod';
import { IValidationSchema } from '@/lib/validation/zod/validationSchema';

export type ZodSchema<T> = z.ZodType<T, z.ZodTypeDef, T>;

export interface IService extends IValidationSchema {

  validIdNew: ( id: string ) => ( any );
  validModelNew: <T>( data: T, Schema: ZodSchema<T> ) => ( any );

}