import { SafeParseReturnType } from 'zod';

export interface IService {
  validModel: <T>( valid: SafeParseReturnType<T, T>, data: T ) => ( T );
  validId: <S>( valid: SafeParseReturnType<S, S>, id: S ) => ( S );
}