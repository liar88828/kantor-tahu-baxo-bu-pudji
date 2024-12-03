import { TMethod } from '@/interface/Utils';

export const isObjectEmpty = ( objectName: TMethod ) => {
  return Object.keys( objectName ).length === 0
}