import { TMethod } from '@/interface/Utils';

export const checkObject = (objectName: TMethod) => {
  return Object.keys( objectName ).length === 0
}