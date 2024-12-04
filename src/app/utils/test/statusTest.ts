import { TMethod } from '@/entity/Utils';

export const statusTest = (method: TMethod, models: string) => {
  return {
    msg: `${ method } ${ models } success`,
    success: true,
    code   : 200,
  };
}