import { TMethod } from '@/entity/Utils';

export const statusTest = ( method: TMethod ) => {
  return {
    msg    : `${ method } payment success`,
    success: true,
    code   : 200,
  };
}