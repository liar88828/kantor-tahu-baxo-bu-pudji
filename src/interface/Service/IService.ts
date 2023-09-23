import { z } from 'zod';

export type ZodSchema<T> = z.ZodType<T, z.ZodTypeDef, T>;

export interface IService {
  // validModel: <T>( valid: SafeParseReturnType<T, T>, data: T ) => ( T );
  // validId: <S>( valid: SafeParseReturnType<S, S>, id: S ) => ( S );

  validIdNew: ( id: string ) => ( string );
  validModelNew: <T>( data: T, Schema: ZodSchema<T> ) => ( T );

}