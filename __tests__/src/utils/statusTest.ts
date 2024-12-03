import { TMethod } from '../../../src/entity/Utils';

export const statusTest = ( method: TMethod ) => {
  return {
    msg    : `Success ${ method }`,
    success: true,
    code   : 200,
  };
}