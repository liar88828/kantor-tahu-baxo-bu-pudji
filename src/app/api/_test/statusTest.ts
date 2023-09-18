import { TMethod } from '@/entity/Utils';

export const statusTest = ( method: TMethod ) => {
  return {
    msg    : `Success ${ method }`,
    success: true,
    code   : 200,
  };
}