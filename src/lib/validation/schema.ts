import { z } from 'zod';
import { IValidations } from '@/interface/Service/IValidations';
import ValidationSchema from '@/lib/validation/zod/validationSchema';

export default class Schema extends ValidationSchema implements IValidations {

  zodId( id: string ) {
    return z.string( { required_error: 'ID is required', } ).min( 5 ).safeParse( id )
  }

  zodModel<T>(
    data: T,
    Schema: z.ZodType<T, z.ZodTypeDef, T>
  ) {
    return Schema.safeParse( data )
  }
}


