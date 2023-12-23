import { TMethod } from '@/entity/Utils';

export const errorEmptyID = ( method: TMethod ) => {
  return {
    msg    : `Error ${ method }`,
    success: false,
    error: "Cannot empty ID / Wrong Id"
  }
}

export const errorEmptyData = ( method: TMethod ) => {
  return {
    msg    : `Error ${ method }`,
    success: false,
    error  : "Cannot empty Data"
  }
}

export const errorData = ( method: TMethod, data: any ) => {
  return {
    data   : data,
    msg    : `Error ${ method }`,
    success: false,
    error  : "Cannot empty Data"
  }
}

export const errorDataZod    = ( data: any, from: "client" | "server" = "server" ) => {
  return {
    data   : data,
    msg    : `${ from } Data not Valid`,
    success: false,
  }
}
export const errorEmptyIDZod = ( id: string[] | string ) => {
  return {
    data   : id,
    msg    : `Id Is not valid`,
    success: false,

  }
}