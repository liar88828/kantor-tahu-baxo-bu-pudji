import { TMethod } from '@/interface/Utils';

export function successResponse( data: any, method: TMethod ) {
  return {
    msg    : `Success ${ method }`,
    success: true,
    code   : 200,
    data   : data
  };
}